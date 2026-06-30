<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {SearchOutlined, ReloadOutlined} from '@antdv-next/icons'
import TransferDetailModal from './components/TransferDetailModal.vue'
import TransferOrderApi from "@/common/api/TransferOrderApi.js";

const tableData = ref([]);
const initTableData = async () => {
  let {data} = await TransferOrderApi.page({page: pageObj.current, size: pageObj.size});
  let {total, records} = data;
  pageObj.total = total;
  tableData.value = records;
}

onMounted(() => {
  initTableData()
})

const searchForm = reactive({
  orderNo: '',
  applyNo: '',
  startDate: '',
  endDate: '',
})

const pageObj = reactive({
  current: 1,
  size: 15,
  total: 0,
})

const formatDateTime = (value) => {
  if (!value) return '-'
  return String(value).replace('T', ' ').slice(0, 19)
}

const orderTypeText = (type) => {
  const map = {
    1: '普通调拨',
    2: '生产调拨',
  }
  return map[type] || '其他调拨'
}


const handleSearch = () => {
  pageObj.current = 1
}

const handleReset = () => {
  Object.assign(searchForm, {orderNo: '', applyNo: '', startDate: '', endDate: ''})
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
    {field: 'orderNo', title: '调拨单号', minWidth: 160, slots: {default: 'orderNo_default'}},
    {
      field: 'orderDate',
      title: '单据日期',
      minWidth: 140,
      formatter: ({cellValue}) => formatDateTime(cellValue).slice(0, 10)
    },
    {field: 'applyNo', title: '申请单号', minWidth: 140},
    {field: 'fromDept', title: '转出部门', minWidth: 120},
    {field: 'toDept', title: '转入部门', minWidth: 120},
    {field: 'fromWarehouse', title: '转出仓库', minWidth: 120},
    {field: 'toWarehouse', title: '转入仓库', minWidth: 120},
    {field: 'outCategory', title: '出库类别', minWidth: 120},
    {field: 'inCategory', title: '入库类别', minWidth: 120},
    {field: 'handler', title: '经手人', minWidth: 100},
    {field: 'auditTime', title: '审核时间', minWidth: 170, formatter: ({cellValue}) => formatDateTime(cellValue)},
    {field: 'orderType', title: '单据类型', minWidth: 110, slots: {default: 'orderType_default'}},
    {field: 'remark', title: '备注', minWidth: 180},
    {field: 'createTime', title: '创建时间', minWidth: 170, formatter: ({cellValue}) => formatDateTime(cellValue)},
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
            v-model:value="searchForm.orderNo"
            placeholder="🔍 调拨单号"
            style="width: 200px"
            allow-clear
            @pressEnter="handleSearch"
        />
        <a-input
            v-model:value="searchForm.applyNo"
            placeholder="🔍 申请单号"
            style="width: 180px"
            allow-clear
            @pressEnter="handleSearch"
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
            <template #orderNo_default="{ row }">
              <span class="font-bold text-[#0f172a]">{{ row.orderNo }}</span>
            </template>

            <template #orderType_default="{ row }">
              <a-tag :color="row.orderType === 1 ? 'blue' : 'purple'">
                {{ orderTypeText(row.orderType) }}
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

    <TransferDetailModal ref="detailModalRef"/>
  </section>
</template>

<style scoped>
</style>
