<template>
	<div class="slidev-layout cover">
		<div class="cover-copy">
			<slot />
		</div>

		<div class="cover-balloon">
			<Balloon />
		</div>
	</div>
</template>

<style scoped>
.cover {
	display: grid;
	grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
	align-items: center;
	gap: 3.5rem;
	height: 100%;
	padding: 3rem 4rem;
}

.cover-balloon {
	justify-self: center;
	width: 100%;
	max-width: 12rem;
}

.cover-copy :deep(h1) {
	display: flex;
	flex-direction: column;
	margin: 0;
	font-size: 4.25rem;
	line-height: 0.88;
	letter-spacing: -0.05em;
}

.cover-copy :deep(h1 .text-ember) {
	font-size: 1.2em;
	letter-spacing: -0.07em;
}

.cover-copy :deep(h1 + p) {
	margin-top: 1.25rem;
	color: var(--glow);
	font-size: 1.5rem;
	font-weight: 600;
	letter-spacing: -0.03em;
	line-height: 1.2;
}

.cover-copy :deep(.chip) {
	margin-top: 1rem;
}
</style>
