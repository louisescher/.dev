<script setup lang="ts">
import { useIsSlideActive, useSlideContext } from "@slidev/client";
import {
	Comment,
	Fragment,
	Text,
	computed,
	onBeforeUnmount,
	onMounted,
	ref,
	useSlots,
	type VNode,
} from "vue";

defineProps<{ kicker?: string }>();

const flatten = (nodes: VNode[]): VNode[] => {
	return nodes.flatMap((node) => {
		if (node.type === Fragment && Array.isArray(node.children)) {
			return flatten(node.children as VNode[]);
		}

		return [node];
	});
};

const slots = useSlots();
const { $clicksContext } = useSlideContext();
const isActive = useIsSlideActive();
const stack = ref<HTMLElement>();
const shift = ref(0);
const clickKey = Symbol("section-reveal");

const hasBody = flatten(slots.default?.() ?? []).some((node) => {
	return node.type !== Comment && node.type !== Text && node.type !== "h1";
});

const steps = $clicksContext.calculateSince("+1", hasBody ? 2 : 1)!;

$clicksContext.register(clickKey, steps);

const shown = computed(() => {
	return isActive.value && steps.currentOffset.value >= 0;
});

const revealed = computed(() => {
	return !hasBody || steps.currentOffset.value >= 1;
});

const measure = () => {
	const heading = stack.value?.querySelector("h1");

	if (!stack.value || !heading) {
		return;
	}

	const headingBottom = heading.offsetTop + heading.offsetHeight;

	shift.value = hasBody ? (stack.value.offsetHeight - headingBottom) / 2 : 0;
};

const observer = new ResizeObserver(measure);

onMounted(() => {
	if (stack.value) {
		observer.observe(stack.value);
	}

	measure();
});

onBeforeUnmount(() => {
	observer.disconnect();
	$clicksContext.unregister(clickKey);
});
</script>

<template>
	<div
		class="slidev-layout section"
		:class="{ 'is-shown': shown, 'is-revealed': revealed }"
		:style="{ '--body-shift': `${shift}px` }"
	>
		<div ref="stack" class="section-stack">
			<p v-if="kicker" class="section-kicker tiny-mono">{{ kicker }}</p>
			<slot />
		</div>
	</div>
</template>

<style scoped>
.section {
	--ease: cubic-bezier(0.22, 1, 0.36, 1);

	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	padding: 3rem 4rem;
	container-type: size;
}

.section-stack {
	position: relative;
	opacity: 0;
	transform: translateY(calc(var(--body-shift) + 60cqh));
	transition:
		transform 650ms var(--ease),
		opacity 400ms ease;
}

.is-shown .section-stack {
	opacity: 1;
	transform: translateY(var(--body-shift));
}

.is-shown.is-revealed .section-stack {
	transform: translateY(0);
}

.section-stack > :deep(h1 ~ *) {
	opacity: 0;
	transform: translateY(1.5rem);
	transition:
		opacity 300ms ease,
		transform 450ms var(--ease);
}

.is-revealed .section-stack > :deep(h1 ~ *) {
	opacity: 1;
	transform: translateY(0);
	transition-delay: 80ms;
}

.section-kicker {
	margin: 0 0 1rem;
	color: var(--glow);
	font-size: 1rem;
}

.section :deep(h1) {
	margin: 0;
	font-size: 4.5rem;
	line-height: 0.9;
	letter-spacing: -0.05em;
}

.section :deep(h1 + p) {
	max-width: 40ch;
	margin-top: 1.25rem;
	font-size: 1.35rem;
}

@media (prefers-reduced-motion: reduce) {
	.section-stack,
	.section-stack > :deep(h1 ~ *) {
		transition: none;
	}
}
</style>
