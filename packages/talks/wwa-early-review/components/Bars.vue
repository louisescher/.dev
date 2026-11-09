<script setup lang="ts">
import { computed } from "vue";

type Bar = {
	label: string;
	share: number;
	tone?: "ember" | "glow" | "cyan" | "rise" | "fall" | "dim";
};

const props = defineProps<{
	items: Bar[];
	max?: number;
	more?: number | string;
}>();

const scale = computed(() => {
	return props.max ?? Math.max(...props.items.map((item) => item.share));
});

const moreLabel = computed(() => {
	return typeof props.more === "number" ? `+ ${props.more} more` : props.more;
});
</script>

<template>
	<ul class="bars">
		<li v-for="item in items" :key="item.label" class="bars-row">
			<span class="bars-label">{{ item.label }}</span>
			<span class="bars-track">
				<span
					class="bars-fill"
					:class="`tone-${item.tone ?? 'ember'}`"
					:style="{ width: `${(item.share / scale) * 100}%` }"
				/>
			</span>
			<span class="bars-value tiny-mono">{{ item.share.toFixed(1) }}%</span>
		</li>
		<li v-if="moreLabel" class="bars-more tiny-mono">{{ moreLabel }}</li>
	</ul>
</template>

<style scoped>
.bars {
	display: grid;
	gap: 0.55rem;
	margin: 0;
	padding: 0;
	list-style: none;
}

.bars-row {
	display: grid;
	grid-template-columns: 12rem 1fr 4.5rem;
	align-items: center;
	gap: 1rem;
	margin: 0;
	line-height: 1.2;
}

.bars-row::marker {
	content: none;
}

.bars-more {
	margin: 0;
	color: var(--ink-dim);
	line-height: 1.2;
}

.bars-more::marker {
	content: none;
}

.bars-label {
	font-weight: 600;
}

.bars-track {
	height: 0.85rem;
	border-radius: 999px;
	background: color-mix(in oklab, var(--deck-2) 70%, var(--line-soft));
	overflow: hidden;
}

.bars-fill {
	display: block;
	height: 100%;
	border-radius: inherit;
	transform-origin: left center;
	transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1) 120ms;
}

.bars-value {
	color: var(--ink-dim);
	text-align: right;
}

.tone-ember {
	background: var(--ember);
}

.tone-glow {
	background: var(--glow);
}

.tone-cyan {
	background: var(--cyan);
}

.tone-rise {
	background: var(--rise);
}

.tone-fall {
	background: var(--fall);
}

.tone-dim {
	background: var(--ink-dim);
}

@media (prefers-reduced-motion: reduce) {
	.bars-fill {
		transition: none;
	}
}
</style>

<style>
.slidev-vclick-hidden .bars-fill {
	transform: scaleX(0);
}
</style>
