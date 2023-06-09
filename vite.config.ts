/* eslint-disable prettier/prettier */
import { resolve } from 'node:path'

// import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import Icons from 'unplugin-icons/vite'
// import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { type ConfigEnv, loadEnv, type UserConfig } from 'vite'
import checker from 'vite-plugin-checker'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, CWD)
  console.log(env, command)
  return {
    base: './',
    plugins: [
      vue(),
      VueSetupExtend(),
      vueJsx(),
      // legacy({
      // 	targets: [
      // 		'defaults',
      // 		'not IE 11',
      // 		'chrome 79',
      // 		'maintained node versions'
      // 	],
      // 	additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // 	modernPolyfills: ['es.promise.finally']
      // }),
      createSvgIconsPlugin({
        iconDirs: [resolve(CWD, 'src/assets/svg')],
        symbolId: 'svg-icon-[dir]-[name]',
      }),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"',
        },
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
      }),
      // ElementPlus({
      // 	useSource: true,
      // }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: 8066,
      proxy: {
        '/dsmhtest': {
          target: 'http://10.100.616.40:9701',
          changeOrigin: true,
        },
        '/dsmhpro': {
          target: 'http://10.100.616.40:9701',
          changeOrigin: true,
        },
      },
    },
    build: {
      minify: 'esbuild',
      cssTarget: 'chrome79',
      chunkSizeWarningLimit: 2000,
    },
  }
}
