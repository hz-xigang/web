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
    title="调拨明细"
    :footer="null"
    width="75vw"
    destroy-on-close
  >
    <template v-if="record && record.details && record.details.length">
      <vxe-table
        :data="record.details"
        border
        show-overflow
        auto-resize
        max-height="480"
      >
        <vxe-column type="seq" width="60" title="序号" />
        <vxe-column field="batchNo" title="批号" min-width="140" />
        <vxe-column field="inventoryCode" title="存货编码" min-width="130" />
        <vxe-column field="inventoryName" title="存货名称" min-width="140" />
        <vxe-column field="spec" title="规格型号" min-width="120" />
        <vxe-column field="unit" title="单位" min-width="80" />
        <vxe-column field="qty" title="数量" min-width="90" />
        <vxe-column field="weight" title="重量" min-width="90" />
        <vxe-column field="specWidth" title="规格片宽" min-width="100" />
        <vxe-column field="customerCode" title="客户编码" min-width="120" />
        <vxe-column field="packingMethod" title="包装方式" min-width="110" />
        <vxe-column field="pbatchNo" title="母材批号" min-width="130" />
      </vxe-table>
    </template>
    <div v-else class="text-center text-[#94a3b8] py-8">暂无明细数据</div>
  </a-modal>
</template>
