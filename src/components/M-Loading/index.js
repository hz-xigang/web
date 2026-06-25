import { createApp } from 'vue'
import MLoadingComponent from './MLoading.vue'

let loadingInstance = null
let loadingApp = null

const MLoading = {
  /**
   * 显示 Loading
   * @param {string} text - 加载提示文字，默认 "加载中..."
   */
  show(text = '加载中...') {
    // 如果已经存在实例，直接显示
    if (loadingInstance) {
      loadingInstance.show(text)
      return
    }

    // 创建容器
    const container = document.createElement('div')
    container.id = 'm-loading-container'
    document.body.appendChild(container)

    // 创建 Vue 应用实例
    loadingApp = createApp(MLoadingComponent)
    loadingInstance = loadingApp.mount(container)

    // 显示 Loading
    loadingInstance.show(text)
  },

  /**
   * 关闭 Loading
   */
  close() {
    if (loadingInstance) {
      loadingInstance.close()
    }
  },

  /**
   * 销毁 Loading 实例
   */
  destroy() {
    if (loadingApp && loadingInstance) {
      loadingInstance.close()
      
      setTimeout(() => {
        loadingApp.unmount()
        const container = document.getElementById('m-loading-container')
        if (container) {
          document.body.removeChild(container)
        }
        loadingApp = null
        loadingInstance = null
      }, 300) // 等待动画结束
    }
  }
}

export default MLoading

