<script setup>
import { ref } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})

const formRules = {
  locCode: [{ required: true, message: '请输入库位编码', trigger: 'blur' }],
  locType: [{ required: true, message: '请选择库位类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

const locationTypes = [
  { value: '货架区', label: '货架区' },
  { value: '收料区', label: '收料区' },
  { value: '备货区', label: '备货区' },
]

const statusOptions = [
  { value: '空闲', label: '空闲' },
  { value: '占用', label: '占用' },
]

const innerFormRef = ref(null)

const validate = () => innerFormRef.value?.validate()

const resetFields = () => innerFormRef.value?.resetFields()

defineExpose({
  validate,
  resetFields,
})
</script>

<template>
  <a-form ref="innerFormRef" :model="props.formData" :rules="formRules" layout="vertical" class="mt-4">
    <a-form-item label="库位编码" name="locCode">
      <a-input v-model:value="props.formData.locCode" placeholder="请输入库位编码，例如 A-01-01" />
    </a-form-item>
    <a-form-item label="库位类型" name="type">
      <a-select v-model:value="props.formData.locType" placeholder="请选择库位类型" :options="locationTypes" />
    </a-form-item>
    <a-form-item label="状态" name="status">
      <a-select v-model:value="props.formData.status" placeholder="请选择状态" :options="statusOptions" />
    </a-form-item>
  </a-form>
</template>
