<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const menuGroups = [
  {
    title: '单据管理',
    menus: [
      {
        key: 'production-order',
        label: '生产订单',
        to: '/production-orders',
        icon: '📋',
      },
    ],
  },
  {
    title: '基础数据',
    menus: [
      {
        key: 'location-archive',
        label: '库位档案',
        to: '/location-archive',
        icon: '📍',
      },
    ],
  },
]

const pageTitle = computed(() => route.meta?.title || '生产订单')
</script>

<template>
  <div class="app-shell">
    <aside class="app-sidebar">
      <div class="app-brand">
        <div class="app-brand__icon">🏭</div>
        <div class="app-brand__text">
          <span>WMS 智能仓储</span>
        </div>
      </div>

      <div
        v-for="group in menuGroups"
        :key="group.title"
        class="app-sidebar__group"
      >
        <div class="app-sidebar__title">{{ group.title }}</div>

        <RouterLink
          v-for="menu in group.menus"
          :key="menu.key"
          :to="menu.to"
          class="app-menu-item"
          :class="{ 'is-active': route.path === menu.to }"
        >
          <span class="app-menu-item__icon">{{ menu.icon }}</span>
          <span class="app-menu-item__label">{{ menu.label }}</span>
        </RouterLink>
      </div>
    </aside>

    <div class="app-main">
      <header class="app-header">
        <div>
          <h1 class="app-header__title">{{ pageTitle }}</h1>
        </div>

        <div class="app-user">
          <div class="app-user__meta">
            <span>管理员</span>
            <strong>张工</strong>
          </div>
        </div>
      </header>

      <main class="app-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
