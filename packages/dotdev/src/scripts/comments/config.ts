import metadata from "../../../public/oauth-client-metadata.json";

const devRedirectUri = "http://127.0.0.1:4321/oauth/callback";

export const oauthScope = metadata.scope;

export const clientId = import.meta.env.DEV
	? `http://localhost?redirect_uri=${encodeURIComponent(devRedirectUri)}&scope=${encodeURIComponent(oauthScope)}`
	: metadata.client_id;

export const redirectUri = import.meta.env.DEV
	? devRedirectUri
	: metadata.redirect_uris[0];

export const constellationUrl = "https://constellation.microcosm.blue";
export const slingshotUrl = "https://slingshot.microcosm.blue";

export const commentCollection = "pub.leaflet.comment";
export const maxLength = 3000;
export const maxDepth = 4;
