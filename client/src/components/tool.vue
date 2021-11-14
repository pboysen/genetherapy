<script>
export default {
	props: {
		toolName: {
			type: String,
			required: true
		}
	},
	computed: {
		toolFile() {
			return () => import(`@/components/${this.toolName}.vue`);
		}
	}
}
</script>
<template>
	<div class="tool">
		<component v-bind:is="toolFile"></component>
	</div>
</template>
<style lang="scss">
.tool {
//...
}
</style>
