import Pages from "@tachibana-shin/vite-plugin-pages"
import { unheadVueComposablesImports } from "@unhead/vue"
import UnoCSS from "@unocss/vite"
import { OnuResolver } from "onu-ui"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import DefineOptions from "unplugin-vue-define-options/vite"
import { ViteImageOptimizer as ImageOptimizer } from "vite-plugin-image-optimizer"
import imagePresets, { widthPreset } from "vite-plugin-image-presets"
import RemoveConsole from "vite-plugin-remove-console"
import Layouts from "vite-plugin-vue-layouts"

import vitePluginBuildRaw from "./modules/vite-plugin-build-raw"
import vitePluginI18nLangs from "./modules/vite-plugin-i18n-langs"

export const vitePlugins: [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (conf: object | undefined) => any,
  object | undefined
][] = [
  // [VueRouter, {}],
  [vitePluginI18nLangs, {}],
  [
    Pages,
    {
      routeStyle: "nuxt3",
      importMode: () => "async"
    }
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [RemoveConsole as unknown as any, {}],
  [
    Layouts,
    {
      defaultLayout: "MainLayout"
    }
  ],
  [
    UnoCSS,
    {
      configFile: "./uno.config.ts"
    }
  ],
  [
    AutoImport,
    {
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
          "@vueuse/router": ["useRouteQuery"],
          quasar: ["useQuasar"],
          "vue-request": ["useRequest"],
          "vue-i18n": ["useI18n"],
          "@capacitor-community/firebase-analytics": ["FirebaseAnalytics"]
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
    }
  ],
  [
    Components,
    {
      resolvers: [IconsResolver(), OnuResolver()]
    }
  ],
  [DefineOptions, {}],
  [vitePluginBuildRaw, {}],
  [Icons, {}],
  [ImageOptimizer, {}],
  [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imagePresets as unknown as any,
    {
      thumbnail: widthPreset({
        widths: [48, 96],
        formats: {
          webp: { quality: 100 },
          jpg: { quality: 100 }
        }
      })
    }
  ]
]
