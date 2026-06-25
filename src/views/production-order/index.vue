<script setup>
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  QrcodeOutlined,
} from '@antdv-next/icons'
import { useProductionOrder } from './hook'
import { ref, reactive } from 'vue'
import OrderFormModal from './components/OrderFormModal.vue'

const {
  searchForm,
  columns,
  tableData,
  currentPage,
  pageSize,
  handleSearch,
  handleReset,
  handleSaveSuccess,
  handleDelete,
  qrModalVisible,
  qrCodePoNo,
  qrCodeUrl,
  previewQRCode,
  statusOptions,
  categoryOptions,
    pageObj
} = useProductionOrder()

const formModalRef = ref(null)


const gridOptions = reactive({
  border: true,
  showOverflow: true,
  autoResize: true,
  height: '100%',
  columnConfig: {
    resizable: true,
  },
  columns: [
    { type: 'seq', width: 60, title: '序号' },
    { field: 'prodNo', title: '生产单号', width: 160, slots: { default: 'poNo_default' } },
    { field: 'erpOrderNo', title: '销售单号', width: 140 },
    { field: 'inventoryCode', title: '存货编码', width: 140 },
    { field: 'inventoryName', title: '存货名称', minWidth: 160 },
    { field: 'customerCode', title: '客户编码', width: 120 },
    { field: 'productCategory', title: '产品类别', width: 100, slots: { default: 'category_default' } },
    { field: 'spec', title: '规格型号', width: 140 },
    { field: 'createTime', title: '创建时间', width: 150 },
    { field: 'deleted', title: '状态', width: 90, slots: { default: 'status_default' } },
    { title: '操作', width: 150, slots: { default: 'action_default' }, fixed: 'right' }
  ]
})
</script>


<template>
  <section class="page-panel">
    <!-- Header Area -->
<!--    <div class="page-panel__header">
      <div  >
      </div>

      <a-button type="primary" @click="openAddModal">
        <template #icon><PlusOutlined /></template>
        新增订单
      </a-button>
    </div>-->

    <!-- Content / Body Area -->
    <div class="page-panel__body flex flex-col gap-4 w-full h-full overflow-hidden">
      <!-- Search Filter Bar -->
      <div class="bg-[#fafcff] border border-[#e2e8f0] p-4 rounded-xl flex flex-wrap gap-3 items-center">
        <a-input
          v-model:value="searchForm.keyword"
          placeholder="🔍 生产单号 / 销售单号"
          style="width: 220px"
          allow-clear
          @pressEnter="handleSearch"
        />
        <a-date-picker
          v-model:value="searchForm.startDate"
          placeholder="开始日期"
          style="width: 140px"
        />
        <span class="text-[#94a3b8] text-sm">至</span>
        <a-date-picker
          v-model:value="searchForm.endDate"
          placeholder="结束日期"
          style="width: 140px"
        />
        <a-select
          v-model:value="searchForm.category"
          placeholder="全部类别"
          style="width: 130px"
          allow-clear
          :options="categoryOptions"
        />
        <a-select
            v-model:value="searchForm.status"
            placeholder="状态"
            style="width: 120px"
            allow-clear
            :options="statusOptions"
        />
        <a-button type="primary" @click="handleSearch">
          <template #icon><SearchOutlined /></template>
          查询
        </a-button>
        <a-button @click="handleReset">
          <template #icon><ReloadOutlined /></template>
          重置
        </a-button>
      </div>

      <!-- Data Table Area -->
      <div class="flex-1 min-h-0 bg-white border border-[#e2e8f0] rounded-xl overflow-hidden relative">
        <!-- Grid Wrapper Div -->
        <div class="h-[calc(100%-58px)] w-full">
          <vxe-grid
            v-bind="gridOptions"
            :data="tableData"
          >
            <!-- Custom rendering for poNo -->
            <template #poNo_default="{ row }">
              <span class="font-bold text-[#0f172a]">{{ row.prodNo }}</span>
            </template>

            <!-- Custom rendering for category -->
            <template #category_default="{ row }">
              <a-tag  color="default">{{ row.productCategory }}</a-tag>
            </template>

            <!-- Custom rendering for status -->
            <template #status_default="{ row }">
              <a-tag :color="row.deleted ? 'error' : 'success'">
                {{ row.deleted ? '作废' : '启用' }}
              </a-tag>
            </template>

            <!-- Custom rendering for actions -->
            <template #action_default="{ row }">
              <div class="flex gap-2">
                <a-button size="small" type="link" class="!p-0" @click="formModalRef.open(row)" title="编辑">
                  <template #icon><EditOutlined /></template>
                </a-button>
                <a-button size="small" type="link" class="!p-0 !text-[#ef4444]" @click="handleDelete(row.id)" title="删除">
                  <template #icon><DeleteOutlined /></template>
                </a-button>
                <a-button size="small" type="link" class="!p-0 !text-[#10b981]" @click="previewQRCode(row.poNo)" title="二维码">
                  <template #icon><QrcodeOutlined /></template>
                </a-button>
              </div>
            </template>
          </vxe-grid>
        </div>

        <!-- Pagination Area -->
        <div class="h-[48px] px-4 py-2 border-t border-[#e2e8f0] flex justify-end items-center bg-white absolute bottom-0 left-0 right-0">
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

    <!-- Edit Form Modal Component -->
    <OrderFormModal ref="formModalRef" @success="handleSaveSuccess" />

    <!-- QR Code Preview Modal -->
    <a-modal
      v-model:open="qrModalVisible"
      title="📱 生产单号二维码"
      :footer="null"
      width="360px"
    >
      <div class="flex flex-col items-center justify-center p-6 gap-4">
        <div class="border border-[#cbd5e1] p-3 rounded-2xl bg-white shadow-sm">
          <img :src="qrCodeUrl" alt="二维码" class="w-[200px] h-[200px]" />
        </div>
        <div class="text-[15px] font-bold text-[#1e293b]">
          生产单号：{{ qrCodePoNo }}
        </div>
      </div>
    </a-modal>
  </section>
</template>
