module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended',

		/**
		 * 配合 eslint-config-prettier eslint-plugin-prettier
		 * 解决eslint与prettier的冲突
		 */
		'plugin:prettier/recommended'
	],
	overrides: [],
	parser: 'vue-eslint-parser', // 用来解析.vue后缀文件
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser', // 用来解析vue文件中<script>标签中的代码
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint', 'simple-import-sort'],
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error'
	}
}
