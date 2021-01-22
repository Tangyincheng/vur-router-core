import Vue from 'vue';
import VueRouter from '../vue-router/index';

import Home from '../views/home.vue';
import About from '../views/about.vue';
import About_a from '../views/about_a.vue';
import About_b from '../views/about_b.vue'

Vue.use(VueRouter);

let routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
    children: [
      {
        path: 'a',
        component: About_a
      },
      {
        path: 'b',
        component: About_b
      }
    ]
  }
]
let router = new VueRouter({
  routes,
  mode: 'history'
});
export default router;
