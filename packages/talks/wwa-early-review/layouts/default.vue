<template>
	<div class="slidev-layout default">
		<div class="default-panel frosted">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.default {
	height: 100%;
	padding: 2rem 2.5rem;
}

.default-panel {
	height: 100%;
	padding: 2.25rem 2.75rem;
	border-radius: var(--radius-card);
	overflow: hidden;
}
</style>
