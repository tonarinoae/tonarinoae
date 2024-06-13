export const API_URL = "https://ihentai.cam/api"

export const WARN = console.warn.bind(console)
export const playbacks = [
  { name: "2x", value: 2.0 },
  { name: "1.7x", value: 1.7 },
  { name: "1.25x", value: 1.25 },
  { name: "1x", value: 1.0 },
  { name: "0.75x", value: 0.75 },
  { name: "0.5x", value: 0.5 }
]
export const NOOP = () => {}
export const EMPTY_ARR = Object.freeze([])
export function createEmptyArray<T>() {
  return EMPTY_ARR as unknown as T[]
}
