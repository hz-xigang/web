<script setup>
import { reactive, ref } from 'vue'
import {
  SearchOutlined,
  ReloadOutlined,
} from '@antdv-next/icons'
import { useInboundRecord } from './hook'
import InboundDetailModal from './components/InboundDetailModal.vue'

const {
  searchForm,
  recordTypes,
  pageObj,
  handleSearch,
  handleReset,
  tableData,
  tableRef,
} = useInboundRecord()

const gridOptions = reactive({
  border: true,
  showOverflow: true,
  autoResize: true,
  height: '100%',
  columnConfig: {
    resizable: true,
  },
  stripe: false,
  rowConfig: {
    isCurrent: true,
    isHover: true,
  },
  rowClassName: ({ rowIndex }) => (rowIndex % 2 === 0 ? 'location-row-odd' : 'location-row-even'),
  columns: [
    { type: 'seq', width: 60, title: '序号' },
    { field: 'receiptNo', title: '单据号', minWidth: 180, slots: { default: 'orderNo_default' } },
    { field: 'locCode', title: '库位编码', minWidth: 140 },
    { field: 'qty', title: '数量', minWidth: 100, slots: { default: 'quantity_default' } },
    { field: 'printUser', title: '操作人', minWidth: 120 },
    { field: 'createTime', title: '操作时间', minWidth: 180 },
    { title: '操作', width: 120, slots: { default: 'action_default' }, fixed: 'right' },
  ],
})

const detailModalRef = ref(null)

const handleViewDetail = (row) => {
  detailModalRef.value.open(row)
}
</script>

<template>
  <section class="page-panel">
    <div class="page-panel__body flex flex-col gap-4 w-full h-full overflow-hidden">
      <div class="bg-[#fafcff] border border-[#e2e8f0] p-4 rounded-xl flex flex-wrap gap-3 items-center">
        <a-input
          v-model:value="searchForm.no"
          placeholder="🔍 单据号"
          style="width: 200px"
          allow-clear
          @pressEnter="handleSearch"
        />
        <a-input
          v-model:value="searchForm.locCode"
          placeholder="🔍 库位编码"
          style="width: 180px"
          allow-clear
          @pressEnter="handleSearch"
        />
        <a-date-picker
          v-model:value="searchForm.startDate"
          placeholder="开始时间"
          style="width: 160px"
          value-format="YYYY-MM-DD"
        />
        <span class="text-[#94a3b8] text-sm select-none">至</span>
        <a-date-picker
          v-model:value="searchForm.endDate"
          placeholder="结束时间"
          style="width: 160px"
          value-format="YYYY-MM-DD"
        />
        <a-button type="primary" @click="handleSearch">
          <template #icon>
            <SearchOutlined />
          </template>
          查询
        </a-button>
        <a-button @click="handleReset">
          <template #icon>
            <ReloadOutlined />
          </template>
          重置
        </a-button>
      </div>

      <div class="flex-1 min-h-0 bg-white border border-[#e2e8f0] rounded-xl overflow-hidden relative">
        <div class="h-[calc(100%-58px)] w-full">
          <vxe-grid
            v-bind="gridOptions"
            ref="tableRef"
            :data="tableData"
            :style="{
              '--vxe-ui-table-row-hover-background-color': '#F4F2A3',
              '--vxe-ui-table-column-hover-background-color': '#F4F2A3',
            }"
          >
            <template #orderNo_default="{ row }">
              <span class="font-bold text-[#0f172a]">{{ row.receiptNo }}</span>
            </template>

            <template #quantity_default="{ row }">
              <span class="font-semibold text-[#0f172a]">{{ row.qty }}</span>
            </template>

            <template #action_default="{ row }">
              <a-button size="small" type="link" class="!p-0" @click="handleViewDetail(row)">
                明细
              </a-button>
            </template>
          </vxe-grid>
        </div>

        <div
          class="h-[48px] px-4 py-2 border-t border-[#e2e8f0] flex justify-end items-center bg-white absolute bottom-0 left-0 right-0"
        >
          <a-pagination
            v-model:current="pageObj.current"
            v-model:pageSize="pageObj.size"
            :total="pageObj.total"
            :show-total="(total) => `共 ${total} 条`"
            show-size-changer
            show-quick-jumper
          />
        </div>
      </div>
    </div>

    <InboundDetailModal ref="detailModalRef" />
  </section>
</template>

<style scoped>
</style>
