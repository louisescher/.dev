# bot

This Discord bot powers the social features on my site. To get it running, first create a Discord bot via the [Discord Developer Portal](https://discord.com/developers). Afterwards, rename the `.env.example` file to `.env` and input the values accordingly.

This bot operates on the assumption that it is on a Discord server that you are on as well. A private server is perfect for this. Use Discord's developer mode to find out the IDs and put them into the `.env` file.

Last but not least - all data is stored in a Turso database. You can either sign up for your own or change the provider, even a self-hosted database works, as long as it's libSQL-compatible. 
