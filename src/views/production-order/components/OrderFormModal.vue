<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['success'])

const modalVisible = ref(false)
const formRef = ref(null)

const formData = reactive({
  id: '',
  poNo: '',
  soNo: '',
  invCode: '',
  invName: '',
  custCode: '',
  category: undefined,
  spec: '',
  status: true,
})

const formRules = {
  poNo: [{ required: true, message: '请输入生产单号', trigger: 'blur' }],
  soNo: [{ required: true, message: '请输入销售单号', trigger: 'blur' }],
  invCode: [{ required: true, message: '请输入存货编码', trigger: 'blur' }],
  invName: [{ required: true, message: '请输入存货名称', trigger: 'blur' }],
  custCode: [{ required: true, message: '请输入客户编码', trigger: 'blur' }],
  category: [{ required: true, message: '请选择产品类别', trigger: 'change' }],
  spec: [{ required: true, message: '请输入规格型号', trigger: 'blur' }],
}

const categoryOptions = [
  { value: '成品', label: '成品' },
  { value: '辅料', label: '辅料' },
  { value: '半成品', label: '半成品' },
]

const open = (record) => {
  Object.assign(formData, {
    id: record.id,
    poNo: record.poNo,
    soNo: record.soNo,
    invCode: record.invCode,
    invName: record.invName,
    custCode: record.custCode,
    category: record.category,
    spec: record.spec,
    status: record.status,
  })
  modalVisible.value = true
}

const handleOk = () => {
  formRef.value
    .validate()
    .then(() => {
      emit('success', { ...formData })
      modalVisible.value = false
    })
    .catch((err) => {
      console.log('Form validation failed:', err)
    })
}

defineExpose({
  open,
})
</script>

<template>
  <a-modal
    v-model:open="modalVisible"
    title="编辑生产订单"
    @ok="handleOk"
    ok-text="确认"
    cancel-text="取消"
    width="600px"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      layout="vertical"
      class="mt-4"
    >
      <div class="grid grid-cols-2 gap-4">
        <a-form-item label="生产单号" name="poNo">
          <a-input v-model:value="formData.poNo" disabled placeholder="系统自动生成" />
        </a-form-item>
        <a-form-item label="销售单号" name="soNo">
          <a-input v-model:value="formData.soNo" placeholder="请输入销售单号" />
        </a-form-item>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <a-form-item label="存货编码" name="invCode">
          <a-input v-model:value="formData.invCode" placeholder="请输入存货编码" />
        </a-form-item>
        <a-form-item label="存货名称" name="invName">
          <a-input v-model:value="formData.invName" placeholder="请输入存货名称" />
        </a-form-item>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <a-form-item label="客户编码" name="custCode">
          <a-input v-model:value="formData.custCode" placeholder="请输入客户编码" />
        </a-form-item>
        <a-form-item label="产品类别" name="category">
          <a-select
            v-model:value="formData.category"
            placeholder="请选择产品类别"
            :options="categoryOptions"
          />
        </a-form-item>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <a-form-item label="规格型号" name="spec">
          <a-input v-model:value="formData.spec" placeholder="请输入规格型号" />
        </a-form-item>
        <a-form-item label="启用状态" name="status">
          <a-switch v-model:checked="formData.status" checked-children="启用" un-checked-children="作废" />
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>
