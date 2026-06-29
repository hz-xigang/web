<script setup>
import { ref } from 'vue'

const modalVisible = ref(false)
const record = ref(null)

const open = (row) => {
  record.value = row
  modalVisible.value = true
}

defineExpose({ open })
</script>

<template>
  <a-modal
    v-model:open="modalVisible"
    title="明细"
    :footer="null"
    width="75vw"
    destroy-on-close
  >
    <template v-if="record && record.tags && record.tags.length">
      <vxe-table
        :data="record.tags"
        border
        show-overflow
        auto-resize
        max-height="400"
      >
        <vxe-column field="tagNo" title="标签" min-width="140" />
        <vxe-column field="prodNo" title="生产单号" min-width="160" />
        <vxe-column field="inventoryCode" title="存货编码" min-width="140" />
        <vxe-column field="inventoryName" title="产品名称" min-width="160" />
        <vxe-column field="spec" title="规格型号" min-width="140" />
        <vxe-column field="qty" title="数量" min-width="80" />
      </vxe-table>
    </template>
    <div v-else class="text-center text-[#94a3b8] py-8">暂无明细数据</div>
  </a-modal>
</template>
