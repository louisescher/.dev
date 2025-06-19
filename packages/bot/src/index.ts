import 'dotenv/config';
import { Activity, Client, Events, GatewayIntentBits } from 'discord.js';
import { db, statusTable } from './db';
import { deepStrictEqual } from 'assert';

const TOKEN = process.env.TOKEN!;
const GUILD_ID = process.env.GUILD_ID!;
const USER_ID = process.env.USER_ID!;

const client = new Client({ intents: [GatewayIntentBits.GuildPresences] });
const MUSIC_SERVICE_NAME = ("YouTube Music").toLowerCase();

interface ListeningStatus {
  song: string;
  artists: string;
  albumCover: string | null;
  shouldRefetch: boolean;
}

interface Status {
  listening: ListeningStatus | null;
  status: 'online' | 'offline';
}

let currentStatus: Status = {
  listening: null,
  status: 'offline'
};

function deepEqual(a: any, b: any): boolean {
  try {
    deepStrictEqual(a, b);
    return true;
  } catch {
    return false;
  }
}

async function updateStatus(newStatus: Status) {
  if (deepEqual(newStatus, currentStatus)) return;
  currentStatus = newStatus;

  let tableReadyStatus: typeof statusTable.$inferInsert = {
    id: 'status',
    online: newStatus.status === 'online',
    listening: false,
  };

  if (newStatus.listening) {
    tableReadyStatus = {
      ...tableReadyStatus,
      song: newStatus.listening.song,
      artists: newStatus.listening.artists,
      image: newStatus.listening.albumCover || null,
      listening: true,
      timestamp: Date.now()
    };
  }

  await db(process.env.TURSO_DATABASE_URL!, process.env.TURSO_AUTH_TOKEN!)
    .insert(statusTable)
    .values(tableReadyStatus)
    .onConflictDoUpdate({ target: statusTable.id, set: tableReadyStatus });

  logCurrentStatus();
}

async function computeImageFromURL(url: string): Promise<string> {
  const buffer = await (await fetch(url)).arrayBuffer();
  return `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
}

function logCurrentStatus() {
  const { listening, status } = currentStatus;

  if (listening) {
    console.log(`[${new Date().toLocaleTimeString()}] (${listening.song} - ${listening.artists}) / ${status}`);
  } else {
    console.log(`[${new Date().toLocaleTimeString()}] Not listening / ${status}`);
  }
}

async function computeAndUpdateStatus(status: string, activities: Activity[]) {
  let listening: ListeningStatus | null = null;

  for (const activity of activities) {
    if(activity.name.toLowerCase() === MUSIC_SERVICE_NAME) {
      const imageURL = activity.assets?.largeImageURL({
        "size": 128
      });

      listening = {
        song: activity.details ?? "Unknown",
        artists: activity.state?.replace("by ", "") ?? "Unknown",
        albumCover: imageURL ? await computeImageFromURL(imageURL) : null,
        shouldRefetch: !activity.assets?.smallImage,
      };
    }
  }

  if (listening?.shouldRefetch) {
    console.warn("Unable to load status correctly. Retrying in 1 second...")
    setTimeout(() => {
      fetchUserStatusManually();
    }, 1000);
  } else {
    await updateStatus({
      listening,
      status: status === 'online' ? 'online' : 'offline'
    });
  }
}

async function fetchUserStatusManually() {
  const guild = await client.guilds.fetch(GUILD_ID);
  const member = await guild.members.fetch({ user: USER_ID, withPresences: true });

  if (!member.presence) return;

  const { status, activities } = member.presence;

  computeAndUpdateStatus(status, activities);
}

client.once(Events.ClientReady, async (client) => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
  fetchUserStatusManually();
});

client.on(Events.PresenceUpdate, async (_, newPresence) => {
  const { userId, status, activities } = newPresence;

  if (userId !== USER_ID) return;

  computeAndUpdateStatus(status, activities);
});

client.login(TOKEN);

process.on('exit', async () => {
  await updateStatus({
    listening: null,
    status: 'offline'
  });

  console.log("Exiting...");
});