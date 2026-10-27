import type { PubLeafletRichtextFacet } from "@atcute/leaflet";
import type { Did } from "@atcute/lexicons";
import { resolveIdentity } from "./records";

const urlPattern = /https?:\/\/[^\s<>"']*[^\s<>"'.,;:!?)\]]/g;
const mentionPattern = /(^|[\s(])@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)/g;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function byteIndex(text: string, charIndex: number) {
	return encoder.encode(text.slice(0, charIndex)).length;
}

function slice(text: string, start: number, end: number) {
	return {
		byteStart: byteIndex(text, start),
		byteEnd: byteIndex(text, end),
	};
}

export async function detectFacets(
	text: string,
): Promise<PubLeafletRichtextFacet.Main[]> {
	const facets: PubLeafletRichtextFacet.Main[] = [];

	for (const match of text.matchAll(urlPattern)) {
		facets.push({
			index: slice(text, match.index, match.index + match[0].length),
			features: [{ $type: "pub.leaflet.richtext.facet#link", uri: match[0] }],
		});
	}

	const mentions = [...text.matchAll(mentionPattern)].map(async (match) => {
		const start = match.index + match[1].length;
		const end = start + 1 + match[2].length;

		try {
			const { did } = await resolveIdentity(match[2]);
			return {
				index: slice(text, start, end),
				features: [
					{ $type: "pub.leaflet.richtext.facet#didMention" as const, did },
				],
			};
		} catch {
			return null;
		}
	});

	for (const mention of await Promise.all(mentions)) {
		if (mention) facets.push(mention);
	}

	return facets.sort((a, b) => a.index.byteStart - b.index.byteStart);
}

function isSafeUrl(uri: string) {
	try {
		const { protocol } = new URL(uri);
		return protocol === "https:" || protocol === "http:";
	} catch {
		return false;
	}
}

function renderSegment(
	text: string,
	facet: PubLeafletRichtextFacet.Main,
): Node {
	for (const feature of facet.features) {
		if (
			feature.$type === "pub.leaflet.richtext.facet#link" &&
			isSafeUrl(feature.uri)
		) {
			const link = document.createElement("a");
			link.href = feature.uri;
			link.rel = "nofollow noopener ugc";
			link.target = "_blank";
			link.textContent = text;
			return link;
		}

		if (feature.$type === "pub.leaflet.richtext.facet#didMention") {
			const mention = document.createElement("span");
			mention.className = "comment-mention";
			mention.dataset.did = feature.did as Did;
			mention.textContent = text;
			return mention;
		}
	}

	return document.createTextNode(text);
}

export function renderRichText(
	text: string,
	facets: PubLeafletRichtextFacet.Main[] = [],
): DocumentFragment {
	const bytes = encoder.encode(text);
	const fragment = document.createDocumentFragment();
	let cursor = 0;

	const ordered = [...facets].sort(
		(a, b) => a.index.byteStart - b.index.byteStart,
	);

	for (const facet of ordered) {
		const { byteStart, byteEnd } = facet.index;
		if (byteStart < cursor || byteEnd > bytes.length || byteEnd <= byteStart) {
			continue;
		}

		if (byteStart > cursor) {
			fragment.append(decoder.decode(bytes.slice(cursor, byteStart)));
		}

		fragment.append(
			renderSegment(decoder.decode(bytes.slice(byteStart, byteEnd)), facet),
		);
		cursor = byteEnd;
	}

	if (cursor < bytes.length) {
		fragment.append(decoder.decode(bytes.slice(cursor)));
	}

	return fragment;
}
