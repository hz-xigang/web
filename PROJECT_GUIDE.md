# WMS 智能仓储系统

基于 Vue 3.5 的现代化仓储管理系统

## 项目结构

```
hz-xg-web/
├── src/
│   ├── layouts/              # 布局组件
│   │   └── MainLayout.vue    # 主布局（头部+侧边栏+内容区）
│   ├── views/                # 页面组件
│   │   ├── ProductionOrder.vue  # 生产订单列表页
│   │   ├── Home.vue          # 首页（示例）
│   │   └── About.vue         # 关于页面（示例）
│   ├── stores/               # 状态管理
│   │   ├── index.js          # Pinia 实例
│   │   └── counter.js        # 示例 store
│   ├── router/               # 路由配置
│   │   └── index.js          # 路由定义
│   ├── components/           # 公共组件
│   ├── assets/               # 静态资源
│   ├── App.vue               # 根组件
│   └── main.js               # 应用入口
└── package.json
```

## 技术栈

- **Vue 3.5** - 渐进式 JavaScript 框架
- **Vue Router 5** - 官方路由管理器
- **Pinia 3** - 新一代状态管理库
- **Ant Design Vue Next** - 企业级 UI 组件库
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Vite 8** - 下一代前端构建工具

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
pnpm run build
```

### 预览生产构建

```bash
pnpm run preview
```

## 功能模块

### 1. 主布局系统

主布局包含三个部分：

- **头部导航栏**：显示系统名称和用户信息
- **左侧菜单**：功能模块导航
- **内容区域**：页面主体内容

### 2. 生产订单管理

生产订单列表页面功能：

- 多条件搜索（生产单号、商品名称、日期范围、单据状态）
- 数据表格展示
- 分页功能
- 操作按钮（编辑、删除、查看详情）
- 新增订单

表格字段：
- 生产单号
- 订单编号
- 行项编码
- 行项名称
- 客户编码
- 产品编码
- 商品类型
- 创建时间
- 状态
- 操作

## 开发指南

### 添加新页面

1. 在 `src/views/` 创建页面组件
2. 在 `src/router/index.js` 添加路由配置
3. 在 `src/layouts/MainLayout.vue` 的菜单中添加菜单项

示例：

```javascript
// router/index.js
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('../views/NewPage.vue')
}
```

### 添加菜单项

在 `MainLayout.vue` 的菜单中添加：

```vue
<a-menu-item key="new-page" class="menu-item">
  <template #icon>
    <span class="menu-icon">📦</span>
  </template>
  <span>新页面</span>
</a-menu-item>
```

### 使用 Pinia Store

创建新的 store：

```javascript
// stores/example.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExampleStore = defineStore('example', () => {
  const data = ref([])
  
  function fetchData() {
    // 获取数据逻辑
  }
  
  return { data, fetchData }
})
```

在组件中使用：

```vue
<script setup>
import { useExampleStore } from '@/stores/example'

const exampleStore = useExampleStore()
</script>
```

### 使用 Ant Design Vue 组件

项目已全局注册 Ant Design Vue Next，可直接使用所有组件：

```vue
<template>
  <a-button type="primary">按钮</a-button>
  <a-table :columns="columns" :data-source="data" />
  <a-modal v-model:open="visible" title="标题">
    内容
  </a-modal>
</template>
```

## 样式规范

- 使用 `scoped` 样式避免污染全局
- 使用 Tailwind CSS 工具类快速开发
- 保持组件样式的一致性
- 遵循 Ant Design 设计规范

## 注意事项

1. 使用 Composition API 和 `<script setup>` 语法
2. 路由采用懒加载提升性能
3. 组件命名使用 PascalCase
4. 文件命名使用 PascalCase（组件）或 camelCase（工具函数）
5. 使用 `antdv-next` 而不是 `ant-design-vue`

## 项目特点

- 现代化的 UI 设计
- 响应式布局
- 深色侧边栏配色
- 渐变色头部导航
- 完整的表格操作功能
- 灵活的搜索筛选

## 许可证

MIT
