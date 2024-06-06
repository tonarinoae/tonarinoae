
import { boot } from "quasar/wrappers"

export default boot(async () =>  FirebaseAnalytics.initializeFirebase(
  JSON.parse(process.env.FIREBASE_CONFIG)
)
)
