# Vue 3 + TypeScript + Vite

## 1. 依赖安装

### `npm install`

### `yarn install`

## 2. 本地开发

### `开发环境：npm dev`

### `测试环境：npm test`

## 3. 项目结构说明

```js
├── public    静态资源文件夹
│
├── src       项目源码
│   ├── api                   接口请求相关
│       ├── request.ts        axios封装
│   ├── assets                资源文件夹
│   ├── components            公共组件
│   ├── constant              定义全局常量
│       └── index.tsx
│   ├── hooks                 公共的业务逻辑
│   ├── views                 包含全部的业务页面
│       ├── error             异常信息页面（404等）
│       ├── home              主页面
│       ├── login             登录页面
│   ├── router                路由
│   ├── store                 全局数据（pinia）
│       ├── modules           pinia 模块拆分
│       ├── index.ts          pinia 初始化
│   ├── style                 全局样式文件
│   ├── utils                 公共工具函数
│   ├── App.vue               App组件
│   └── main.ts               入口文件
├──  types                    项目开发ts文档
├── .env.development          开发环境的环境变量
├── .env.production           生产环境的环境变量
├── .env.test                 测试环境的环境变量
├── .gitignore
├── .prettierignore           配置 prettier 不需要格式化的文件夹
├── .stylelintignore          配置 stylelint 不需要格式化的文件夹
├── .eslintrc.cjs             eslint 配置文件
├── .prettierrc.js            prettier 配置文件
├── .stylelintrc.js           stylelint 配置文件
├── commitlint.config.js      commitlint 配置文件
├── package-lock.json         第三方依赖版本锁定
├── package.json
├── README.md
├── tsconfig.json             ts配置文件
├── vite.config.ts            vite 配置文件
└── yarn.lock                 第三方依赖版本锁定
```

## 4. 开发规范

推荐使用 vue3 script setup 语法

```js
<script setup lang="ts">
  // TODO...
</script>

<template></template>

<style lang="scss" scoped></style>
```

## 5. 根据权限动态生成路由菜单配置规范

```js
// ！！！需要跟后端约定好菜单数据

const mockMenuList = [
  {
    path: '/home',
    name: 'Home',
    component: '/home/index', // 重要：需要跟views目录下的文件对应
    meta: {
      icon: 'HomeFilled',
      title: '首页',
    },
  },
  {
    path: '/test',
    name: 'Test',
    redirect: '/test/child',
    meta: {
      icon: 'Setting',
      title: '测试菜单',
    },
    children: [
      {
        path: '/test/child',
        name: 'TestChild',
        component: '/test/child',
        meta: {
          icon: 'HomeFilled',
          title: '测试子页面',
        },
      },
    ],
  },
]
```

## 6. commit 提交规范

使用 commitlint， 推荐使用 config-conventional 配置去写 commit

### `提交格式：`

```js
git commit -m '<type>: <description>'

// type: 改动的类型
// description: commit 主体内容，描述此次所提交的改动的内容
```

## 其他：stylelint 搭配 less

依赖说明

1.  stylelint: css 样式 lint 工具
2.  postcss: 转换 css 代码工具
3.  postcss-less: 识别 less 语法
4.  postcss-html: 识别 html/vue 中的 style 标签中的样式
5.  stylelint-config-standard: Stylelint 的标准可共享配置规则
6.  stylelint-config-prettier: 处理与 Prettier 冲突的规则
7.  stylelint-config-recommended-less: less 的推荐可共享配置规则
8.  stylelint-config-standard-vue: lint.vue 文件的样式配置
9.  stylelint-less: stylelint-config-recommended-less 的依赖，less 的 stylelint 规则集合
10. stylelint-order: 指定样式书写的顺序，在.stylelintrc.js 中 order/properties-order 指定顺序

```js
/** .stylelintrc.js 配置文件 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended-less',
    'stylelint-config-standard-vue',
  ],
  plugins: ['stylelint-order'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md', '**/*.yaml'],
  rules: {
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
    ],
  },
}
```
