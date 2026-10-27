import { PubLeafletComment } from "@atcute/leaflet";
import type { Did } from "@atcute/lexicons";
import { parseCanonicalResourceUri } from "@atcute/lexicons/syntax";
import { is } from "@atcute/lexicons/validations";
import { commentCollection, constellationUrl, slingshotUrl } from "./config";

export interface Author {
	did: Did;
	handle: string;
	pds: string;
	displayName?: string;
	avatar?: string;
}

export interface Comment {
	uri: string;
	rkey: string;
	record: PubLeafletComment.Main;
	author: Author;
}

interface MiniDoc {
	did: Did;
	handle: string;
	pds: string;
}

interface ProfileRecord {
	displayName?: string;
	avatar?: { ref?: { $link?: string } };
}

interface BacklinkPage {
	linking_records: { did: Did; collection: string; rkey: string }[];
	cursor: string | null;
}

const authors = new Map<string, Promise<Author>>();

async function getJson<T>(url: string): Promise<T> {
	const res = await fetch(url, { headers: { accept: "application/json" } });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res.json();
}

async function getRecordValue<T>(
	service: string,
	repo: string,
	collection: string,
	rkey: string,
): Promise<T> {
	const params = new URLSearchParams({ repo, collection, rkey });
	const { value } = await getJson<{ value: T }>(
		`${service}/xrpc/com.atproto.repo.getRecord?${params}`,
	);
	return value;
}

export async function resolveIdentity(identifier: string): Promise<MiniDoc> {
	const params = new URLSearchParams({ identifier });
	return getJson<MiniDoc>(
		`${slingshotUrl}/xrpc/com.bad-example.identity.resolveMiniDoc?${params}`,
	);
}

async function loadAuthor(did: Did): Promise<Author> {
	const identity = await resolveIdentity(did);

	const profile = await getRecordValue<ProfileRecord>(
		identity.pds,
		did,
		"app.bsky.actor.profile",
		"self",
	).catch(() => null);

	const avatarCid = profile?.avatar?.ref?.$link;
	const avatarParams =
		avatarCid && new URLSearchParams({ did, cid: avatarCid });

	return {
		...identity,
		displayName: profile?.displayName || undefined,
		avatar: avatarParams
			? `${identity.pds}/xrpc/com.atproto.sync.getBlob?${avatarParams}`
			: undefined,
	};
}

export function getAuthor(did: Did): Promise<Author> {
	let author = authors.get(did);

	if (!author) {
		author = loadAuthor(did);
		authors.set(did, author);
	}

	return author;
}

async function listCommentUris(subject: string): Promise<string[]> {
	const uris: string[] = [];
	let cursor: string | null = null;

	do {
		const params = new URLSearchParams({
			target: subject,
			collection: commentCollection,
			path: ".subject",
			limit: "100",
		});
		if (cursor) params.set("cursor", cursor);

		const page: BacklinkPage = await getJson(
			`${constellationUrl}/links?${params}`,
		);

		for (const link of page.linking_records) {
			uris.push(`at://${link.did}/${link.collection}/${link.rkey}`);
		}

		cursor = page.cursor;
	} while (cursor);

	return uris;
}

async function loadComment(
	uri: string,
	subject: string,
): Promise<Comment | null> {
	const { repo, rkey } = parseCanonicalResourceUri(uri);

	const record = await getRecordValue<unknown>(
		slingshotUrl,
		repo,
		commentCollection,
		rkey,
	);

	if (!is(PubLeafletComment.mainSchema, record) || record.subject !== subject) {
		return null;
	}

	return { uri, rkey, record, author: await getAuthor(repo) };
}

export async function loadComments(
	subject: string,
	blockedDids: Set<string>,
): Promise<Comment[]> {
	const uris = await listCommentUris(subject);

	const results = await Promise.allSettled(
		uris
			.filter((uri) => !blockedDids.has(parseCanonicalResourceUri(uri).repo))
			.map((uri) => loadComment(uri, subject)),
	);

	return results.flatMap((result) =>
		result.status === "fulfilled" && result.value ? [result.value] : [],
	);
}
