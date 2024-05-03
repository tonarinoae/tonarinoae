export function convertNumber(number: number): string {
  if (number >= 1000000000) {
    return `${Math.floor(number / 1000000000)}T`
  }

  if (number >= 1000000) {
    return `${Math.floor(number / 1000000)}Tr`
  }

  if (number >= 1000) {
    return `${Math.floor(number / 1000)}N`
  }

  return number.toString()
}
