import { boot } from "quasar/wrappers"

export default boot(async () =>
  FirebaseAnalytics.initializeFirebase(
    JSON.parse(import.meta.env.FIREBASE_CONFIG || process.env.FIREBASE_CONFIG)
  )
)
