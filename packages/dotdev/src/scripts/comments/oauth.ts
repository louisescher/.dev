import { Client } from "@atcute/client";
import {
	CompositeDidDocumentResolver,
	LocalActorResolver,
	PlcDidDocumentResolver,
	WebDidDocumentResolver,
	XrpcHandleResolver,
} from "@atcute/identity-resolver";
import type { ActorIdentifier } from "@atcute/lexicons";
import {
	configureOAuth,
	createAuthorizationUrl,
	deleteStoredSession,
	finalizeAuthorization,
	getSession,
	listStoredSessions,
	OAuthUserAgent,
} from "@atcute/oauth-browser-client";
import { clientId, oauthScope, redirectUri, slingshotUrl } from "./config";

const returnToKey = "lou-comments:return-to";

configureOAuth({
	metadata: {
		client_id: clientId,
		redirect_uri: redirectUri,
	},
	identityResolver: new LocalActorResolver({
		handleResolver: new XrpcHandleResolver({ serviceUrl: slingshotUrl }),
		didDocumentResolver: new CompositeDidDocumentResolver({
			methods: {
				plc: new PlcDidDocumentResolver(),
				web: new WebDidDocumentResolver(),
			},
		}),
	}),
	storageName: "lou-comments",
});

export interface SignedInUser {
	agent: OAuthUserAgent;
	rpc: Client;
}

function toUser(agent: OAuthUserAgent): SignedInUser {
	return { agent, rpc: new Client({ handler: agent }) };
}

export async function signIn(identifier: string) {
	localStorage.setItem(returnToKey, location.href);

	const url = await createAuthorizationUrl({
		target: {
			type: "account",
			identifier: identifier.trim().replace(/^@/, "") as ActorIdentifier,
		},
		scope: oauthScope,
	});

	await new Promise((resolve) => setTimeout(resolve, 200));
	location.assign(url);
}

export async function finishSignIn(): Promise<string> {
	const params = new URLSearchParams(location.hash.slice(1));
	history.replaceState(null, "", location.pathname + location.search);

	await finalizeAuthorization(params);

	const returnTo = localStorage.getItem(returnToKey) ?? "/blog";
	localStorage.removeItem(returnToKey);
	return returnTo;
}

export async function restoreUser(): Promise<SignedInUser | null> {
	const [did] = listStoredSessions();
	if (!did) return null;

	try {
		const session = await getSession(did, { allowStale: true });
		return toUser(new OAuthUserAgent(session));
	} catch {
		deleteStoredSession(did);
		return null;
	}
}

export async function signOut(user: SignedInUser) {
	const did = user.agent.sub;

	try {
		await user.agent.signOut();
	} catch {
		deleteStoredSession(did);
	}
}
