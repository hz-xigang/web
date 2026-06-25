<template>
  <a-config-provider
      :locale="zhCN"
    :theme="{
      token: {
        colorPrimary: '#2563eb',
        colorInfo: '#2563eb',
        colorBgLayout: '#edf3fb',
        colorTextBase: '#0f172a',
        borderRadius: 16,
        fontSize: 14,
      },
    }"
  >
    <router-view />
  </a-config-provider>
</template>


<script setup >
import zhCN from 'antdv-next/locale/zh_CN'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
</script>

