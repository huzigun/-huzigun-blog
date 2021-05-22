import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/inquery',
    name: 'Inquery',
    component: () => import('../views/Inquery.vue'),
  },
  {
    path: '/peed',
    name: 'Peed',
    component: () => import('../views/Peed.vue'),
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue'),
  },
  {
    path: '/incruit',
    name: 'Incruit',
    component: () => import('../views/Incruit.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth/index.vue'),
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('../views/Auth/Login.vue'),
      },
      {
        path: '/auth/register',
        name: 'Register',
        component: () => import('../views/Auth/Register.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
