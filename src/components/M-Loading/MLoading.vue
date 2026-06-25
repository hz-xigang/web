<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="visible" 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
      >
        <div class="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8 flex flex-col items-center gap-4 min-w-[200px]">
          <!-- 加载动画 -->
          <div class="loading-spinner"></div>
          
          <!-- 加载文字 -->
          <div class="text-base font-semibold text-slate-700">{{ text }}</div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MLoading',
  setup() {
    const visible = ref(false)
    const text = ref('加载中...')

    const show = (loadingText = '加载中...') => {
      text.value = loadingText
      visible.value = true
    }

    const close = () => {
      visible.value = false
    }

    return {
      visible,
      text,
      show,
      close
    }
  }
}
</script>

<style scoped>
/* 加载动画 */
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

