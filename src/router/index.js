/**
 * 路由配置
 * 注意：
 *  1. 所有异步路由组件都需要配置 webpackChunkName 原因: route level code-splitting this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
 *     
 */
import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        name: "unitDetail",
        path: "/detail/:unitid(\\d+)",
        alias: "/detail/:unitid(\\d+).htm",
        component: () =>
          import(/* webpackChunkName: "unit-detail" */ "../views/unitDetail/index.vue")
      },
      {
        name: "unitList",
        path: "/unitlist",
        component: () =>
          import(/* webpackChunkName: "unit-list" */ "../views/unitList/index.vue")
      },
    ]
  });
}
