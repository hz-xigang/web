<script setup>
import {computed, reactive, ref} from 'vue'
import {SearchOutlined, ReloadOutlined} from '@antdv-next/icons'
import usePrepOrder from "@/views/prep-order/hook.js";

let {
  pageObj,
  tableData,
  handleSearch,
  handleReset,
  formatDateTime,
  tableRef,
  orderTypeMap,
  statusOptions,
  searchForm,
  statusMap
} = usePrepOrder()


const gridOptions = reactive({
  border: true,
  showOverflow: true,
  autoResize: true,
  height: '100%',
  columnConfig: {resizable: true},
  stripe: false,
  rowConfig: {isCurrent: true, isHover: true},
  rowClassName: ({rowIndex}) => (rowIndex % 2 === 0 ? 'location-row-odd' : 'location-row-even'),
  columns: [
    {type: 'seq', width: 60, title: '序号'},
    {field: 'prepNo', title: '备料单号', minWidth: 160, slots: {default: 'prepNo_default'}},
    {field: 'customerCode', title: '客户编码', minWidth: 130},
    {field: 'packingMethod', title: '包装方式', minWidth: 150},
    {field: 'dispatchMode', title: '发运方式', minWidth: 160},
    {field: 'creator', title: '制单人', minWidth: 100},
    {field: 'deliveryTime', title: '交货时间', minWidth: 170, formatter: ({cellValue}) => formatDateTime(cellValue)},
    {field: 'orderType', title: '订单类型', minWidth: 110, slots: {default: 'orderType_default'}},
    {field: 'status', title: '状态', minWidth: 100, slots: {default: 'status_default'}},
    {field: 'remark', title: '备注', minWidth: 200},
    {field: 'createTime', title: '创建时间', minWidth: 170, formatter: ({cellValue}) => formatDateTime(cellValue)},
  ],
})
</script>

<template>
  <section class="page-panel">
    <div class="page-panel__body flex flex-col gap-4 w-full h-full overflow-hidden">
      <div class="bg-[#fafcff] border border-[#e2e8f0] p-4 rounded-xl flex flex-wrap gap-3 items-center">
        <a-input
          v-model:value="searchForm.prepNo"
          placeholder="🔍 备料单号"
          style="width: 200px"
          allow-clear
          @pressEnter="handleSearch"
        />
        <a-input
          v-model:value="searchForm.customerCode"
          placeholder="🔍 客户编码"
          style="width: 180px"
          allow-clear
          @pressEnter="handleSearch"
        />
        <a-select
          v-model:value="searchForm.status"
          placeholder="备料状态"
          style="width: 140px"
          allow-clear
          :options="statusOptions"
        />
        <a-date-picker
          v-model:value="searchForm.startDate"
          placeholder="开始时间"
          style="width: 150px"
          value-format="YYYY-MM-DD"
        />
        <span class="text-[#94a3b8] text-sm select-none">至</span>
        <a-date-picker
          v-model:value="searchForm.endDate"
          placeholder="结束时间"
          style="width: 150px"
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
            <template #prepNo_default="{ row }">
              <span class="font-bold text-[#0f172a]">{{ row.prepNo }}</span>
            </template>

            <template #orderType_default="{ row }">
              <a-tag :color="orderTypeMap[row.orderType]?.color ?? 'default'">
                {{ orderTypeMap[row.orderType]?.text ?? row.orderType }}
              </a-tag>
            </template>

            <template #status_default="{ row }">
              <a-tag :color="statusMap[row.status]?.color ?? 'default'">
                {{ statusMap[row.status]?.text ?? row.status }}
              </a-tag>
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
  </section>
</template>

<style scoped>
</style>
