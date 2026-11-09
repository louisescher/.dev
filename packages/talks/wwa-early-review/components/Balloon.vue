<script setup lang="ts">
import { useId } from "vue";

const gradientId = `latex-${useId()}`;
</script>

<template>
	<svg
		class="balloon"
		viewBox="0 -12 200 336"
		role="img"
		aria-label="A weather balloon carrying a radiosonde, drifting upward"
	>
		<defs>
			<radialGradient :id="gradientId" cx="36%" cy="30%" r="72%">
				<stop offset="0%" stop-color="var(--glow)" stop-opacity="0.95" />
				<stop offset="45%" stop-color="var(--ember)" stop-opacity="0.9" />
				<stop offset="100%" stop-color="var(--ember)" stop-opacity="0.55" />
			</radialGradient>
		</defs>

		<g class="animate-sway" style="transform-origin: 100px 40px">
			<path
				d="M100 178 C 96 212, 104 226, 100 250"
				fill="none"
				stroke="var(--ink)"
				stroke-width="2.5"
				stroke-linecap="round"
				opacity="0.55"
			/>

			<g class="animate-breathe" style="transform-origin: 100px 100px">
				<path
					d="M100 12 C 152 12, 182 56, 182 98 C 182 140, 148 172, 108 178 L 92 178 C 52 172, 18 140, 18 98 C 18 56, 48 12, 100 12 Z"
					:fill="`url(#${gradientId})`"
				/>
				<path
					d="M62 44 C 44 60, 36 84, 40 106"
					fill="none"
					stroke="#fff"
					stroke-opacity="0.65"
					stroke-width="9"
					stroke-linecap="round"
				/>
				<path d="M92 178 L 108 178 L 104 194 L 96 194 Z" fill="var(--ember)" />
			</g>

			<g class="animate-dangle" style="transform-origin: 100px 250px">
				<rect
					x="72"
					y="250"
					width="56"
					height="44"
					rx="9"
					fill="var(--deck-2)"
					stroke="var(--ink)"
					stroke-width="2.5"
				/>
				<rect x="82" y="261" width="24" height="15" rx="4" fill="var(--cyan)" />
				<circle
					class="animate-blink"
					cx="118"
					cy="268"
					r="4.5"
					fill="var(--glow)"
				/>
				<path
					d="M100 250 L 100 236 M 100 238 L 91 231 M 100 238 L 109 231"
					fill="none"
					stroke="var(--ink)"
					stroke-width="2.5"
					stroke-linecap="round"
				/>
				<path
					d="M82 294 L 82 306 M 118 294 L 118 306"
					stroke="var(--ink)"
					stroke-width="2.5"
					stroke-linecap="round"
					opacity="0.5"
				/>
			</g>
		</g>
	</svg>
</template>

<style scoped>
.balloon {
	display: block;
	width: 100%;
	height: auto;
}
</style>
