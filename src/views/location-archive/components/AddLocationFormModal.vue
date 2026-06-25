<script setup>
import { reactive, ref } from 'vue'
import LocationFormModal from './LocationFormModal.vue'
import LocArchiveApi from "@/common/api/LocArchiveApi.js";
import MLoading from "@/components/M-Loading/index.js";

const emit = defineEmits(['success'])

const modalVisible = ref(false)
const formRef = ref(null)

const formData = reactive({
  locCode: '',
  locType: undefined,
  status: '空闲',
})

const open = () => {
  Object.assign(formData, {
    locCode: '',
    locType: undefined,
    status: '空闲',
  })
  modalVisible.value = true
}

const handleOk = () => {
  formRef.value.validate().then(async () => {
    MLoading.show("上传中。。。")
    await LocArchiveApi.add({...formData})
    emit('success', { ...formData });
    modalVisible.value = false;
  })
}

defineExpose({
  open,
})
</script>

<template>
  <a-modal
    v-model:open="modalVisible"
    title="新增库位"
    ok-text="确认"
    cancel-text="取消"
    width="520px"
    @ok="handleOk"
  >
    <LocationFormModal ref="formRef" :form-data="formData" />
  </a-modal>
</template>
