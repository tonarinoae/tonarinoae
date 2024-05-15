import transformerVariantGroup from "@unocss/transformer-variant-group"
import { presetOnu } from "onu-ui"
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWind
} from "unocss"
import { presetScrollbar } from "unocss-preset-scrollbar"

export default defineConfig({
  presets: [
    presetWind(),
    presetUno(),
    presetOnu(),
    presetAttributify({
      prefix: "un-",
      prefixedOnly: true // <--
    }),
    presetTypography(),
    presetScrollbar()
  ],
  rules: [
    [/^size-\[?([^[\]]+)\]?/, ([, value]) => ({ width: value, height: value })],
    [/^font-family-(.+)/, ([, value]) => ({ "font-family": value })],
    [/^font-size-(.+)/, ([, value]) => ({ "font-size": value })],
    [/^grid-area-(.+)/, ([, value]) => ({ "grid-area": value })]
  ],
  transformers: [transformerVariantGroup()],
  theme: {
    breakpoints: {
      sm: "600px",
      md: "1024px",
      lg: "1440px",
      xl: "1920px"
    },
    colors: {
      sakura: "#f27fb5",
      sakura2: "#f3d3e2",
      sakura3: "#f8c1d5",
      sakura4: "#fbe0ef"
    }
  }
})
