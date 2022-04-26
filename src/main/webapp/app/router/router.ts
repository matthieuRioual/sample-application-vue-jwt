import { AppVue } from '@/common/primary/app';
import { createRouter, createWebHistory } from 'vue-router';
import { LoginVue } from '@/common/primary/login';
import { GeneratorVue } from '@/common/primary/generator';

const routes = [
  {
    path: '/',
    name: 'Root',
    component: GeneratorVue,
  },
  {
    path: '/app',
    name: 'App',
    component: GeneratorVue,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginVue,
  },
  {
    path: '/generator',
    name: 'Generator',
    component: GeneratorVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
