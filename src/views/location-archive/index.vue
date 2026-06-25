<script setup>
import {reactive, ref} from 'vue'
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@antdv-next/icons'
import {useLocationArchive} from './hook'
import AddLocationFormModal from './components/AddLocationFormModal.vue'
import EditLocationFormModal from './components/EditLocationFormModal.vue'

const {
  searchForm,
  locationTypes,
  pageObj,
  handleSearch,
  handleReset,
  handleSaveSuccess,
  handleDelete,
  handleDeleteBatch,
  tableData,
  tableRef,
} = useLocationArchive()

const addFormModalRef = ref(null)
const editFormModalRef = ref(null)

const rowClassName = ({rowIndex}) => {
  return rowIndex % 2 === 0 ? 'location-row-odd' : 'location-row-even'
}

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
  rowClassName,
  columns: [
    {type: 'checkbox', width: 60},
    {type: 'seq', width: 60, title: '序号'},
    {field: 'locCode', title: '库位编码', minWidth: 160, slots: {default: 'code_default'}},
    {field: 'locType', title: '库位类型', minWidth: 140},
    {field: 'status', title: '状态', minWidth: 120, slots: {default: 'status_default'}},
    {field: 'createTime', title: '创建时间', minWidth: 160},
    {title: '操作', width: 150, slots: {default: 'action_default'}, fixed: 'right'},
  ],
})
</script>

<template>
  <section class="page-panel">
    <div class="page-panel__body flex flex-col gap-4 w-full h-full overflow-hidden">
      <div class="bg-[#fafcff] border border-[#e2e8f0] p-4 rounded-xl flex flex-wrap gap-3 items-center">
        <a-input
            v-model:value="searchForm.code"
            placeholder="🔍 库位编码"
            style="width: 220px"
            allow-clear
            @pressEnter="handleSearch"
        />
        <a-select
            v-model:value="searchForm.type"
            placeholder="库位类型"
            style="width: 140px"
            allow-clear
            :options="locationTypes"
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
        <div class="ml-auto">
          <a-button type="primary" @click="addFormModalRef.open()">
            <template #icon>
              <PlusOutlined/>
            </template>
            新增库位
          </a-button>
          <a-button type="primary" danger class="ml-[5px]" @click="handleDeleteBatch">
            <template #icon>
              <DeleteOutlined/>
            </template>
            删除
          </a-button>
        </div>
      </div>

      <div class="flex-1 min-h-0 bg-white border border-[#e2e8f0] rounded-xl overflow-hidden relative">
        <div class="h-[calc(100%-58px)] w-full">
          <vxe-grid v-bind="gridOptions"
                    ref="tableRef"
                    :data="tableData"
                    :style="{
                        '--vxe-ui-table-row-hover-background-color': '#F4F2A3',
                        '--vxe-ui-table-column-hover-background-color': '#F4F2A3',

          }">
            <template #code_default="{ row }">
              <span class="font-bold text-[#0f172a]">{{ row.locCode }}</span>
            </template>

            <template #status_default="{ row }">
              <a-tag :color="row.status === '空闲' ? 'success' : 'warning'">
                {{ row.status }}
              </a-tag>
            </template>

            <template #action_default="{ row }">
              <div class="flex gap-2">
                <a-button size="small" type="link" class="!p-0" title="编辑" @click="editFormModalRef.open(row)">
                  <template #icon>
                    <EditOutlined/>
                  </template>
                </a-button>
                <a-button size="small" type="link" class="!p-0 !text-[#ef4444]" title="删除" @click="handleDelete(row)">
                  <template #icon>
                    <DeleteOutlined/>
                  </template>
                </a-button>
              </div>
            </template>
          </vxe-grid>
        </div>

        <div
            class="h-[48px] px-4 py-2 border-t border-[#e2e8f0] flex justify-end items-center bg-white absolute bottom-0 left-0 right-0">
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

    <AddLocationFormModal ref="addFormModalRef" @success="handleSaveSuccess"/>
    <EditLocationFormModal ref="editFormModalRef" @success="handleSaveSuccess"/>
  </section>
</template>

<style scoped>

</style>
