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
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.vue'],
			rules: {
				'no-undef': 'off'
			}
		}
	],
	parser: 'vue-eslint-parser', // 用来解析.vue后缀文件
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser', // 用来解析vue文件中<script>标签中的代码
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint', 'prettier', 'simple-import-sort'],
	rules: {
		// ts
		'@typescript-eslint/no-redeclare': 'error',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

		// vue
		'vue/no-v-html': 'off',
		'vue/require-default-prop': 'off',
		'vue/require-explicit-emits': 'off',
		'vue/multi-word-component-names': 'off',

		// prettier
		'prettier/prettier': 'error',

		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error'
	}
}
