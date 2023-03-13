<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const radio = ref('1')
const value = ref(true)
</script>

<template>
	<div>
		<el-button>Default</el-button>
		<el-button type="primary">Primary</el-button>
		<el-button type="success">Success</el-button>
	</div>
	<div style="margin-top: 10px">
		<el-input v-model="input" placeholder="Please input" />
	</div>
	<div style="margin-top: 10px">
		<el-switch v-model="value" />
	</div>
	<div style="margin-top: 10px">
		<el-radio-group v-model="radio" class="ml-4">
			<el-radio label="1" size="large">Option 1</el-radio>
			<el-radio label="2" size="large">Option 2</el-radio>
		</el-radio-group>
	</div>
</template>

<style lang="scss" scoped>
.logo {
	padding: 1.5em;
	height: 6em;
	transition: filter 300ms;
	will-change: filter;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
