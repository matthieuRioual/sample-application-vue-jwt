import { createRouter, createWebHistory, Router } from 'vue-router';
import { LoginVue } from '@/common/primary/login';
import { WelcomeVue } from '@/common/primary/welcome';

const routes = [
  {
    path: '/',
    name: 'Root',
    component: WelcomeVue,
  },
  {
    path: '/app',
    name: 'App',
    component: WelcomeVue,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginVue,
  },
  {
    path: '/Welcome',
    name: 'Welcome',
    component: WelcomeVue,
    meta: {
      requiresAuth: true,
    },
  },
];

const routerOptions = {
  history: createWebHistory(),
  routes,
};

export default (store: any): Router => {
  const router = createRouter(routerOptions);
  router.beforeEach((to, from, next: (...args: any[]) => void) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.isAuth) {
        next({
          path: '/login',
        });
        return;
      }
    }
    next();
  });
  return router;
};
