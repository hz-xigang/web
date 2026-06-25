import {computed, onMounted, reactive, ref} from 'vue'
import {message, Modal} from 'antdv-next'
import LocArchiveApi from "@/common/api/LocArchiveApi.js";
import ToastUtil from "@/common/util/ToastUtil.js";
import MLoading from "@/components/M-Loading/index.js";

export function useLocationArchive() {
    const locationTypes = [
        {value: '货架区', label: '货架区'},
        {value: '收料区', label: '收料区'},
        {value: '备货区', label: '备货区'},
    ]

    const searchForm = reactive({
        code: '',
        type: undefined,
    })

    const tableData = ref([])
    const initData = async () => {
        let {data} = await LocArchiveApi.page({...searchForm}, pageObj.current, pageObj.size);
        let {records, total} = data;
        tableData.value = records;
        pageObj.total = total;
    }
    onMounted(async () => {
        await initData();
    })

    const pageObj = reactive({
        current: 1,
        size: 15,
        total: 0,
    })

    const handleSearch = async () => {
        pageObj.current = 1;
        await initData();
    }

    const handleReset = async () => {
        searchForm.code = ''
        searchForm.type = undefined
        pageObj.current = 1
        await initData();
    }

    const handleSaveSuccess = async (location) => {
        await initData();
        ToastUtil.success("操作成功")
    }

    const handleDelete = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除库位 ${record.locCode} 吗？该操作不可恢复。`,
            okText: '确认',
            cancelText: '取消',
            okType: 'danger',
            async onOk() {
                MLoading.show("删除中");
                await LocArchiveApi.dropById(record.id)
                ToastUtil.success("删除成功");
                await initData();
            },
        })
    }

    const handleDeleteBatch = () => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除选择库位吗？该操作不可恢复。`,
            okText: '确认',
            cancelText: '取消',
            okType: 'danger',
            async onOk() {
                let checkRecords = tableRef.value.getCheckboxRecords();
                let ids = checkRecords.map(it=> it.id);
                MLoading.show("删除中");
                await LocArchiveApi.dropByIds(ids)
                ToastUtil.success("删除成功");
                await initData();
            },
        })
    }

    let tableRef = ref()


    return {
        searchForm,
        locationTypes,
        tableData,
        pageObj,
        handleSearch,
        handleReset,
        handleSaveSuccess,
        handleDelete,
        tableRef,
        handleDeleteBatch,
    }
}
