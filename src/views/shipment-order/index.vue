<script setup>
import {computed, reactive, ref} from 'vue'
import {SearchOutlined, ReloadOutlined} from '@antdv-next/icons'
import useShipmentOrder from "@/views/shipment-order/hook.js";
import ShipmentDetailModal from './components/ShipmentDetailModal.vue'


let {
  pageObj,
  tableData
} = useShipmentOrder()


const searchForm = reactive({
  shipNo: '',
  custCode: '',
  isTax: undefined,
  startDate: '',
  endDate: '',
})


const handleSearch = () => {
  pageObj.current = 1;
}

const handleReset = () => {
  Object.assign(searchForm, {shipNo: '', custCode: '', isTax: undefined, startDate: '', endDate: ''})
  pageObj.current = 1
}

const tableRef = ref()

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
    {field: 'shipNo', title: '发货单号', minWidth: 160, slots: {default: 'shipNo_default'}},
    {field: 'type', title: '发货类型', minWidth: 120},
    {field: 'salesType', title: '销售类型', minWidth: 120},
    {field: 'erpOrderNo', title: '用友订单号', minWidth: 140},
    {field: 'isTax', title: '是否含税', minWidth: 120, slots: {default: 'isTax_default'}},
    {field: 'salesDept', title: '销售部门', minWidth: 140},
    {field: 'dispatchMode', title: '发运方式', minWidth: 110},
    {field: 'customerCode', title: '客户编码', minWidth: 120},
    {field: 'contactPerson', title: '联系人', minWidth: 110},
    {field: 'salesman', title: '业务员', minWidth: 100},
    {field: 'createTime', title: '制表时间', minWidth: 170},
    {title: '操作', width: 100, fixed: 'right', slots: {default: 'action_default'}},
  ],
})

const detailModalRef = ref()

const handleViewDetail = (row) => {
  detailModalRef.value.open(row)
}
</script>

<template>
  <section class="page-panel">
    <div class="page-panel__body flex flex-col gap-4 w-full h-full overflow-hidden">
      <div class="bg-[#fafcff] border border-[#e2e8f0] p-4 rounded-xl flex flex-wrap gap-3 items-center">
        <a-input
            v-model:value="searchForm.shipNo"
            placeholder="🔍 发货单号"
            style="width: 200px"
            allow-clear
            @pressEnter="handleSearch"
        />
        <a-input
            v-model:value="searchForm.custCode"
            placeholder="🔍 客户编码"
            style="width: 180px"
            allow-clear
            @pressEnter="handleSearch"
        />
        <a-select
            v-model:value="searchForm.isTax"
            placeholder="是否含税"
            style="width: 140px"
            allow-clear
            :options="[{value: true, label: '含税'}, {value: false, label: '不含税'}]"
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
            <SearchOutlined/>
          </template>
          查询
        </a-button>
        <a-button @click="handleReset">
          <template #icon>
            <ReloadOutlined/>
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
            <template #shipNo_default="{ row }">
              <span class="font-bold text-[#0f172a]">{{ row.shipNo }}</span>
            </template>

            <template #isTax_default="{ row }">
              <a-tag :color="row.isTax ? 'blue' : 'default'">
                {{ row.isTax ? '含税' : '不含税' }}
              </a-tag>
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

    <ShipmentDetailModal ref="detailModalRef" />
  </section>
</template>

<style scoped>
</style>
