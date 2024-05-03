export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(value, min))
}
