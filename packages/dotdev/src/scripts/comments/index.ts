import type {} from "@atcute/atproto";
import { ok } from "@atcute/client";
import type { PubLeafletComment } from "@atcute/leaflet";
import hidden from "../../comments/hidden.json";
import { strings } from "../../comments/strings";
import { commentCollection, maxDepth, maxLength } from "./config";
import { detectFacets, renderRichText } from "./facets";
import { restoreUser, type SignedInUser, signIn, signOut } from "./oauth";
import { type Author, type Comment, getAuthor, loadComments } from "./records";
import { buildTree, type CommentNode } from "./tree";

const root = document.querySelector<HTMLElement>("[data-comments]");

if (root) {
	const subject = root.dataset.subject as string;
	const hiddenUris = new Set<string>(hidden.comments);
	const blockedDids = new Set<string>(hidden.dids);

	const signInForm = root.querySelector("[data-signin]") as HTMLFormElement;
	const signInError = root.querySelector("[data-signin-error]") as HTMLElement;
	const session = root.querySelector("[data-session]") as HTMLElement;
	const sessionLabel = root.querySelector(
		"[data-session-label]",
	) as HTMLElement;
	const signOutButton = root.querySelector(
		"[data-signout]",
	) as HTMLButtonElement;
	const composeSlot = root.querySelector("[data-compose-slot]") as HTMLElement;
	const status = root.querySelector("[data-status]") as HTMLElement;
	const list = root.querySelector("[data-list]") as HTMLOListElement;

	let comments: Comment[] = [];
	let user: SignedInUser | null = null;
	let currentAuthor: Author | null = null;
	let openReply: HTMLFormElement | null = null;

	function element<K extends keyof HTMLElementTagNameMap>(
		tag: K,
		className?: string,
		text?: string,
	) {
		const el = document.createElement(tag);
		if (className) el.className = className;
		if (text !== undefined) el.textContent = text;
		return el;
	}

	function button(text: string, className = "comments-button") {
		const el = element("button", className, text);
		el.type = "button";
		return el;
	}

	function createComposeForm(options: {
		parent?: string;
		onCancel?: () => void;
	}): HTMLFormElement {
		const form = element("form", "comments-compose");
		const textarea = element("textarea");
		textarea.name = "text";
		textarea.rows = 4;
		textarea.maxLength = maxLength;
		textarea.placeholder = strings.composePlaceholder;
		textarea.required = true;

		const error = element("p", "comments-error");
		error.setAttribute("role", "alert");

		const row = element("div", "comments-row");
		const counter = element(
			"span",
			"comments-counter",
			strings.charactersLeft(maxLength),
		);
		const actions = element("div", "comments-row");
		const submit = element(
			"button",
			"comments-button primary",
			strings.submitButton,
		);
		submit.type = "submit";

		if (options.onCancel) {
			const cancel = button(strings.cancelReply);
			cancel.addEventListener("click", options.onCancel);
			actions.append(cancel);
		}

		actions.append(submit);
		row.append(counter, actions);
		form.append(textarea, row, error);

		textarea.addEventListener("input", () => {
			counter.textContent = strings.charactersLeft(
				maxLength - textarea.value.length,
			);
		});

		form.addEventListener("submit", async (event) => {
			event.preventDefault();
			const text = textarea.value.trim();
			if (!text || !user) return;

			submit.disabled = true;
			submit.textContent = strings.submitting;
			error.textContent = "";

			try {
				await createComment(text, options.parent);
				textarea.value = "";
				counter.textContent = strings.charactersLeft(maxLength);
				options.onCancel?.();
			} catch {
				error.textContent = strings.submitError;
			} finally {
				submit.disabled = false;
				submit.textContent = strings.submitButton;
			}
		});

		return form;
	}

	async function createComment(text: string, parent?: string) {
		if (!user || !currentAuthor) return;

		const record: PubLeafletComment.Main = {
			$type: "pub.leaflet.comment",
			subject: subject as PubLeafletComment.Main["subject"],
			plaintext: text,
			facets: await detectFacets(text),
			createdAt: new Date().toISOString(),
			...(parent && {
				reply: { parent: parent as PubLeafletComment.Main["subject"] },
			}),
		};

		const { uri } = await ok(
			user.rpc.post("com.atproto.repo.createRecord", {
				input: {
					repo: user.agent.sub,
					collection: commentCollection,
					record,
				},
			}),
		);

		comments = [
			...comments,
			{
				uri,
				rkey: uri.split("/").pop() as string,
				record,
				author: currentAuthor,
			},
		];
		render();
	}

	async function deleteComment(comment: Comment, error: HTMLElement) {
		if (!user || !confirm(strings.deleteConfirm)) return;
		error.textContent = "";

		try {
			await ok(
				user.rpc.post("com.atproto.repo.deleteRecord", {
					input: {
						repo: user.agent.sub,
						collection: commentCollection,
						rkey: comment.rkey,
					},
				}),
			);
			comments = comments.filter((c) => c.uri !== comment.uri);
			render();
		} catch {
			error.textContent = strings.deleteError;
		}
	}

	function renderAuthor(author: Author) {
		const header = element("div", "comment-header");
		const avatar = element("img", "comment-avatar");
		avatar.alt = "";
		avatar.loading = "lazy";
		avatar.width = 32;
		avatar.height = 32;
		if (author.avatar) avatar.src = author.avatar;

		header.append(avatar);
		if (author.displayName) {
			header.append(element("span", "comment-name", author.displayName));
		}
		header.append(element("span", "comment-handle", `@${author.handle}`));
		return header;
	}

	function renderNode(node: CommentNode, depth: number): HTMLLIElement {
		const { comment } = node;
		const item = element("li", "comment");
		item.id = `comment-${comment.author.did}-${comment.rkey}`;

		const header = renderAuthor(comment.author);
		const date = element("time", "comment-date");
		const createdAt = new Date(comment.record.createdAt);
		date.dateTime = createdAt.toISOString();
		date.textContent = strings.postedAt(createdAt);
		header.append(date);

		const body = element("p", "comment-body");
		body.append(
			renderRichText(comment.record.plaintext, comment.record.facets),
		);

		item.append(header, body);

		if (user) {
			const actions = element("div", "comment-actions");
			const reply = button(strings.replyButton);
			reply.addEventListener("click", () => {
				openReply?.remove();
				const form = createComposeForm({
					parent: comment.uri,
					onCancel: () => {
						form.remove();
						openReply = null;
					},
				});
				form.classList.add("comment-reply-form");
				body.after(form);
				openReply = form;
				form.querySelector("textarea")?.focus();
			});
			actions.append(reply);

			const error = element("p", "comments-error");
			error.setAttribute("role", "alert");

			if (comment.author.did === user.agent.sub) {
				const remove = button(strings.deleteButton);
				remove.addEventListener("click", () => deleteComment(comment, error));
				actions.append(remove);
			}

			item.append(actions, error);
		}

		if (node.children.length > 0) {
			const childDepth = depth + 1;
			const replies = element("ol", "comment-replies");
			replies.classList.toggle("flat", childDepth > maxDepth);

			for (const child of node.children) {
				replies.append(renderNode(child, childDepth));
			}

			if (childDepth === maxDepth) {
				replies.hidden = true;
				const more = button(strings.showMoreReplies);
				more.addEventListener("click", () => {
					replies.hidden = false;
					more.remove();
				});
				item.append(more);
			}

			item.append(replies);
		}

		return item;
	}

	function render() {
		openReply = null;
		const tree = buildTree(comments, hiddenUris);
		list.replaceChildren(...tree.map((node) => renderNode(node, 0)));
		status.textContent = tree.length === 0 ? strings.empty : "";
	}

	function renderSession() {
		signInForm.hidden = user !== null;
		session.hidden = user === null;
		composeSlot.replaceChildren();

		if (user && currentAuthor) {
			sessionLabel.textContent = strings.signedInAs(currentAuthor.handle);
			composeSlot.append(createComposeForm({}));
		}
	}

	signInForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		const handle = new FormData(signInForm).get("handle");
		if (typeof handle !== "string" || !handle.trim()) return;

		const submit = signInForm.querySelector("button") as HTMLButtonElement;
		submit.disabled = true;
		signInError.textContent = "";

		try {
			await signIn(handle);
		} catch {
			submit.disabled = false;
			signInError.textContent = strings.signInError;
		}
	});

	signOutButton.addEventListener("click", async () => {
		if (!user) return;
		await signOut(user);
		user = null;
		currentAuthor = null;
		renderSession();
		render();
	});

	async function load() {
		user = await restoreUser();
		currentAuthor = user ? await getAuthor(user.agent.sub) : null;
		renderSession();

		try {
			comments = await loadComments(subject, blockedDids);
			render();
		} catch {
			status.textContent = strings.loadError;
		}
	}

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				observer.disconnect();
				load();
			}
		},
		{ rootMargin: "400px" },
	);

	observer.observe(root);
}
