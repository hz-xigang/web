<script setup>
import { reactive, ref } from 'vue'
import LocationFormModal from './LocationFormModal.vue'
import MLoading from "@/components/M-Loading/index.js";
import LocArchiveApi from "@/common/api/LocArchiveApi.js";

const emit = defineEmits(['success'])

const modalVisible = ref(false)
const formRef = ref(null)

const formData = reactive({
  id: '',
  locCode: '',
  locType: undefined,
  status: '空闲',
})

const open = (record) => {
  Object.assign(formData, {
    id: record.id,
    locCode: record.locCode,
    locType: record.locType,
    status: record.status,
  })
  modalVisible.value = true
}

const handleOk = () => {
  formRef.value.validate().then(async () => {
    MLoading.show("上传中。。。")
    await LocArchiveApi.updateById({...formData})
    emit('success', { ...formData })
    modalVisible.value = false
  })
}

defineExpose({
  open,
})
</script>

<template>
  <a-modal
    v-model:open="modalVisible"
    title="编辑库位"
    ok-text="确认"
    cancel-text="取消"
    width="520px"
    @ok="handleOk"
  >
    <LocationFormModal ref="formRef" :form-data="formData" />
  </a-modal>
</template>
