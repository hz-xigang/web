# Hz-Xg-Web

基于 Vue 3.5 的现代化 Web 应用项目

## 技术栈

- **Vue 3.5** - 渐进式 JavaScript 框架
- **Vue Router 5** - 官方路由管理器
- **Pinia 3** - 新一代状态管理库
- **Ant Design Vue Next** - 企业级 UI 组件库
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Vite 8** - 下一代前端构建工具

## 项目结构

```
hz-xg-web/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 公共组件
│   ├── views/           # 页面组件
│   │   ├── Home.vue     # 首页
│   │   └── About.vue    # 关于页面
│   ├── router/          # 路由配置
│   │   └── index.js     # 路由定义
│   ├── stores/          # 状态管理
│   │   ├── index.js     # Pinia 实例
│   │   └── counter.js   # 示例 store
│   ├── App.vue          # 根组件
│   ├── main.js          # 应用入口
│   └── style.css        # 全局样式
├── public/              # 公共资源
├── package.json         # 项目配置
└── vite.config.js       # Vite 配置
```

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

## 核心功能

### 路由管理

使用 Vue Router 5 进行页面导航，支持：
- 路由懒加载
- 嵌套路由
- 路由守卫
- 动态路由

示例：

```javascript
// src/router/index.js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]
```

### 状态管理

使用 Pinia 进行全局状态管理，采用 Composition API 风格：

```javascript
// src/stores/counter.js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  return { count, doubleCount, increment }
})
```

在组件中使用：

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <div>{{ counterStore.count }}</div>
  <button @click="counterStore.increment">增加</button>
</template>
```

### UI 组件

项目集成了 Ant Design Vue Next，可以直接使用所有组件：

```vue
<template>
  <a-button type="primary">按钮</a-button>
  <a-input placeholder="请输入" />
</template>
```

## 开发建议

### 添加新页面

1. 在 `src/views/` 创建页面组件
2. 在 `src/router/index.js` 添加路由配置
3. 在导航栏添加链接

### 添加新的 Store

1. 在 `src/stores/` 创建新的 store 文件
2. 使用 `defineStore` 定义状态和方法
3. 在组件中导入并使用

### 样式管理

- 全局样式：`src/style.css`
- 组件样式：使用 `<style scoped>` 标签
- Tailwind 工具类：直接在模板中使用

## 注意事项

- 使用 Composition API 编写组件
- 路由采用懒加载提升性能
- Store 使用 Setup 语法糖
- 组件使用 `<script setup>` 语法

## 许可证

MIT
