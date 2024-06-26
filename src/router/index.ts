import { route } from "quasar/wrappers"
import { setupLayouts } from "virtual:generated-layouts"
import generatedRoutes from "virtual:generated-pages"
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "vue-router"

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const routes = setupLayouts(generatedRoutes)

export default route((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition || { left: 0, top: 0 })
        }, 500)
      })
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.afterEach((to) => {
    FirebaseAnalytics.setScreenName({
      screenName: to.name?.toString() ?? to.fullPath,
      nameOverride: to.name?.toString()
    })
  })

  return Router
})
