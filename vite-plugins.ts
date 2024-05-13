import Pages from "@tachibana-shin/vite-plugin-pages"
import { unheadVueComposablesImports } from "@unhead/vue"
import { OnuResolver } from "onu-ui"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import DefineOptions from "unplugin-vue-define-options/vite"
import type { Plugin } from "vite"
// import { VueRouterAutoImports } from "unplugin-vue-router"
// import VueRouter from "unplugin-vue-router/vite"
import RemoveConsole from "vite-plugin-remove-console"
import Layouts from "vite-plugin-vue-layouts"

import vitePluginBuildRaw from "./modules/vite-plugin-build-raw"
import vitePluginI18nLangs from "./modules/vite-plugin-i18n-langs"

export const vitePlugins: Plugin[] = [
  // [VueRouter, {}],
  vitePluginI18nLangs(),
  Pages({
    routeStyle: "nuxt3",
    importMode: () => "async"
  }),
  RemoveConsole(),

  Layouts({
    defaultLayout: "MainLayout"
  }),

  UnoCSS({
    configFile: "./uno.config.ts"
  }),

  AutoImport({
    resolvers: [OnuResolver()],
    include: [/\.tsx?$/, /\.vue$/, /\.vue\?vue/],
    imports: [
      "vue",
      "vue-router",
      // VueRouterAutoImports,
      {
        "@vueuse/core": [
          "computedAsync",
          "watchImmediate",
          "useStorage",
          "useEventListener"
        ],
        quasar: ["useQuasar"],
        "vue-request": ["useRequest"],
        "vue-i18n": ["useI18n"]
      },
      unheadVueComposablesImports
    ],
    dirs: [
      "src/logic/**/*.ts",
      "src/logic/**/*.tsx",
      "src/stores/**/*.ts",
      "src/composables/*.ts",
      "src/boot/*.ts",
      "src/*.ts"
    ],
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
      globalsPropValue: true
    }
  }),

  Components({
    resolvers: [IconsResolver(), OnuResolver()]
  }),
  DefineOptions(),
  vitePluginBuildRaw(),
  Icons()
]
