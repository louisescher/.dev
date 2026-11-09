<template>
	<div class="slidev-layout two-cols">
		<div class="two-cols-header">
			<slot />
		</div>

		<div class="two-cols-grid">
			<div class="two-cols-panel frosted">
				<slot name="left" />
			</div>

			<div class="two-cols-panel frosted">
				<slot name="right" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.two-cols {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 2.5rem 3rem;
}

.two-cols-header :deep(h1) {
	margin-bottom: 1.5rem;
}

.two-cols-grid {
	display: grid;
	flex: 1;
	grid-template-columns: 1fr 1fr;
	gap: 1.5rem;
	min-height: 0;
}

.two-cols-panel {
	padding: 1.75rem 2rem;
	border-radius: var(--radius-card);
	overflow: hidden;
}

.two-cols-panel :deep(h2),
.two-cols-panel :deep(h3) {
	margin-bottom: 0.75rem;
}
</style>
