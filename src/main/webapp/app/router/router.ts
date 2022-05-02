import { createRouter, createWebHistory, Router } from 'vue-router';
import { LoginVue } from '@/common/primary/login';
import { WelcomeVue } from '@/common/primary/welcome';
import { jwtStore } from '@/common/domain/JWTStoreService';

const routes = [
  {
    path: '/',
    name: 'Root',
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
    path: '/welcome',
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

export default (): Router => {
  const router = createRouter(routerOptions);
  router.beforeEach((to, from, next: (...args: any[]) => void) => {
    const store = jwtStore();
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
