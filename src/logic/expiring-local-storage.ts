export class ExpiringLocalStorage {
  constructor(
    private readonly storage: Storage,
    private readonly expiryInMinutes: number
  ) {}

  set(key: string, value: unknown) {
    const now = new Date()

    const item = {
      value: value,
      expiry: now.getTime() + this.expiryInMinutes * 60 * 1000
    }
    this.storage.setItem(key, JSON.stringify(item))
  }

  get(key: string) {
    const itemStr = this.storage.getItem(key)

    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
      this.storage.removeItem(key)
      return null
    }
    return item.value
  }
}
