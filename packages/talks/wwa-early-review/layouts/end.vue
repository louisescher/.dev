<template>
	<div class="slidev-layout end">
		<div class="end-balloon">
			<Balloon />
		</div>

		<div class="end-copy">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.end {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
	height: 100%;
	padding: 2.5rem 4rem;
	text-align: center;
}

.end-balloon {
	width: 7rem;
}

.end-copy :deep(h1) {
	margin: 0;
	font-size: 4rem;
	letter-spacing: -0.05em;
}

.end-copy :deep(h1 + p) {
	margin-top: 0.75rem;
	color: var(--glow);
	font-size: 1.35rem;
	font-weight: 600;
}

.end-copy :deep(.end-links) {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.75rem;
	margin-top: 1.5rem;
}
</style>
