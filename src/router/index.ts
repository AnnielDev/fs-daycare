import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/TopBar.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/activities',
          name: 'activities',
          component: () => import('../views/ActivitiesView.vue'),
        },
        {
          path: '/pictures',
          name: 'pictures',
          component: () => import('../views/MediaView.vue'),
        },
      ],
    },
  ],
})

export default router
