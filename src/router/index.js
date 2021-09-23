import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior: () => ({x: 0, y: 0}),
  routes,
  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
});

router.beforeEach((to, from, next) => {
  let user = store.getters.authorization, isApp = store.getters.isApp;
  console.log(user);
  if (!to.meta || !to.meta.restrict || (user && user.id) || isApp) {
    next();
  } else {
    store.dispatch("updateData", {
      ref: 'target',
      entity: to
    });
    next({
      name: 'login'
    });
  }
});

export default router;

