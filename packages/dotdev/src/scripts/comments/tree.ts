import type { Comment } from "./records";

export interface CommentNode {
	comment: Comment;
	children: CommentNode[];
}

function byCreatedAt(a: CommentNode, b: CommentNode) {
	return (
		Date.parse(a.comment.record.createdAt) -
		Date.parse(b.comment.record.createdAt)
	);
}

function sortTree(nodes: CommentNode[]) {
	nodes.sort(byCreatedAt);
	for (const node of nodes) sortTree(node.children);
	return nodes;
}

export function buildTree(
	comments: Comment[],
	hiddenUris: Set<string>,
): CommentNode[] {
	const nodes = new Map<string, CommentNode>();

	for (const comment of comments) {
		nodes.set(comment.uri, { comment, children: [] });
	}

	const roots: CommentNode[] = [];

	for (const node of nodes.values()) {
		const parent = node.comment.record.reply?.parent;
		const parentNode = parent ? nodes.get(parent) : undefined;

		if (parentNode) {
			parentNode.children.push(node);
		} else {
			roots.push(node);
		}
	}

	const prune = (list: CommentNode[]): CommentNode[] =>
		list
			.filter((node) => !hiddenUris.has(node.comment.uri))
			.map((node) => ({ ...node, children: prune(node.children) }));

	return sortTree(prune(roots));
}
