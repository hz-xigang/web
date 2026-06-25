# M-Loading 组件

一个可以在 JavaScript 代码中调用的全局 Loading 组件。

## 特性

- ✅ 支持 JS 调用（`MLoading.show()` / `MLoading.close()`）
- ✅ 自定义加载文字
- ✅ 优雅的动画效果
- ✅ 毛玻璃背景
- ✅ 使用 Tailwind CSS 样式
- ✅ 使用 Teleport 渲染到 body

## 使用方法

### 1. 基本使用

```javascript
import MLoading from '@/components/M-Loading'

// 显示 Loading（默认文字：加载中...）
MLoading.show()

// 显示 Loading（自定义文字）
MLoading.show('正在处理数据...')

// 关闭 Loading
MLoading.close()
```

### 2. 在异步操作中使用

```javascript
import MLoading from '@/components/M-Loading'

async function fetchData() {
  try {
    MLoading.show('正在加载数据...')
    
    const response = await fetch('/api/data')
    const data = await response.json()
    
    MLoading.close()
    
    return data
  } catch (error) {
    MLoading.close()
    console.error('加载失败:', error)
  }
}
```

### 3. 在 Vue 组件中使用

```vue
<script setup>
import MLoading from '@/components/M-Loading'

const handleSubmit = async () => {
  MLoading.show('正在保存...')
  
  try {
    await saveData()
    MLoading.close()
    message.success('保存成功')
  } catch (error) {
    MLoading.close()
    message.error('保存失败')
  }
}
</script>

<template>
  <button @click="handleSubmit">提交</button>
</template>
```

### 4. 销毁实例（可选）

如果需要完全销毁 Loading 实例（通常不需要）：

```javascript
MLoading.destroy()
```

## API

### MLoading.show(text)

显示 Loading

**参数：**
- `text` (String, 可选) - 加载提示文字，默认 "加载中..."

**示例：**
```javascript
MLoading.show()
MLoading.show('请稍候...')
MLoading.show('正在处理数据...')
```

### MLoading.close()

关闭 Loading

**示例：**
```javascript
MLoading.close()
```

### MLoading.destroy()

销毁 Loading 实例（通常不需要调用）

**示例：**
```javascript
MLoading.destroy()
```

## 样式定制

组件使用 Tailwind CSS，如果需要自定义样式，可以修改 `MLoading.vue` 文件中的类名。

### 主要样式类：

- 遮罩层：`bg-black/50 backdrop-blur-sm`
- 内容卡片：`bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]`
- 加载动画：`.loading-spinner`（紫色旋转圆圈）

## 注意事项

1. 确保在关闭 Loading 前已经显示，否则不会有效果
2. 多次调用 `show()` 会复用同一个实例
3. 组件使用 `z-index: 9999` 确保在最上层显示
4. 使用 Teleport 渲染到 body，不受父组件样式影响

