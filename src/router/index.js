import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/production-orders',
    children: [
      {
        path: 'production-orders',
        name: 'production-orders',
        component: () => import('@/views/production-order/index.vue'),
        meta: {
          title: '生产订单',
        },
      },
      {
        path: 'location-archive',
        name: 'location-archive',
        component: () => import('@/views/location-archive/index.vue'),
        meta: {
          title: '库位档案',
        },
      },
      {
        path: 'inbound-record',
        name: 'inbound-record',
        component: () => import('@/views/inbound-record/index.vue'),
        meta: {
          title: '入库记录',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} | WMS 智能仓储平台`
  }
})

export default router
