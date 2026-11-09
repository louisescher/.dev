<script setup lang="ts">
const seeded = (seed: number) => {
	let state = seed;

	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;

		return state / 4294967296;
	};
};

const rand = seeded(20261114);
const starBand = 46;
const starGroups = 4;

const stars = Array.from({ length: 70 }, () => ({
	x: rand() * 100,
	y: rand() * starBand,
	size: 1 + rand() * 1.6,
	group: Math.floor(rand() * starGroups),
	bright: 0.35 + rand() * 0.65,
}));

const twinkles = Array.from({ length: starGroups }, (_, group) => ({
	delay: (group * 7) / starGroups,
	stars: stars.filter((star) => star.group === group),
}));

const depths = [
	{ blur: 6.4, tone: 0.75 },
	{ blur: 2.7, tone: 1 },
	{ blur: 0.9, tone: 0.85 },
];

const cloudSources = depths.map(({ blur }) => {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -30 220 140"><filter id="b" filterUnits="userSpaceOnUse" x="-30" y="-30" width="220" height="140"><feGaussianBlur stdDeviation="${blur}"/></filter><g fill="white" filter="url(#b)"><ellipse cx="80" cy="62" rx="72" ry="17"/><circle cx="48" cy="46" r="21"/><circle cx="82" cy="34" r="29"/><circle cx="116" cy="48" r="19"/></g></svg>`;

	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
});

const clouds = Array.from({ length: 9 }, (_, index) => ({
	y: 8 + rand() * 78,
	x: rand() * 110 - 5,
	scale: 0.5 + rand() * 1.5,
	duration: 90 + rand() * 170,
	delay: -rand() * 260,
	depth: index % 3,
}));
</script>

<template>
	<div class="sky" aria-hidden="true">
		<div class="sky-gradient" />

		<div class="sky-stars" :style="{ height: `${starBand}%` }">
			<div
				v-for="twinkle in twinkles"
				:key="twinkle.delay"
				class="sky-twinkle animate-twinkle"
				:style="{ animationDelay: `${twinkle.delay}s`, '--b': 1 }"
			>
				<span
					v-for="(star, index) in twinkle.stars"
					:key="index"
					class="sky-star"
					:style="{
						left: `${star.x}%`,
						top: `${(star.y / starBand) * 100}%`,
						width: `${star.size}px`,
						height: `${star.size}px`,
						opacity: star.bright,
					}"
				/>
			</div>
		</div>

		<img
			v-for="(cloud, index) in clouds"
			:key="index"
			:src="cloudSources[cloud.depth]"
			alt=""
			class="sky-cloud animate-drift"
			:style="{
				top: `${cloud.y}%`,
				'--x': `${cloud.x}cqw`,
				'--scale': cloud.scale,
				animationDuration: `${cloud.duration}s`,
				animationDelay: `${cloud.delay}s`,
				opacity: `calc(var(--cloud-alpha) * ${depths[cloud.depth].tone})`,
			}"
		/>

		<div class="sky-horizon" />
	</div>
</template>

<style scoped>
.sky {
	position: absolute;
	inset: 0;
	overflow: hidden;
	pointer-events: none;
	container-type: size;
}

.sky-gradient {
	position: absolute;
	inset: 0;
	background: linear-gradient(
		to bottom,
		var(--sky-1) 0%,
		var(--sky-2) var(--sky-stop-2),
		var(--sky-3) var(--sky-stop-3),
		var(--sky-4) var(--sky-stop-4),
		var(--sky-5) 100%
	);
}

.sky-stars {
	position: absolute;
	inset-inline: 0;
	top: 0;
}

.sky-twinkle {
	position: absolute;
	inset: 0;
	will-change: opacity;
}

.sky-star {
	position: absolute;
	border-radius: 999px;
	background: white;
}

.sky-cloud {
	position: absolute;
	left: 0;
	width: 18rem;
	height: 11.5rem;
	max-width: none;
	margin-top: -2.5rem;
	margin-left: -2.5rem;
	transform-origin: 2.5rem 5.75rem;
	will-change: transform;
}

.sky-horizon {
	position: absolute;
	inset-inline: 0;
	bottom: 0;
	height: var(--horizon-height);
	opacity: var(--horizon-alpha);
	background: linear-gradient(to top, var(--sky-5), transparent);
}
</style>
