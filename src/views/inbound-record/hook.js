import { onMounted, reactive, ref } from 'vue'
import BoundRecordApi from '@/common/api/BoundRecordApi.js'
import DateUtil from "@/common/util/DateUtil.js";

let monthRange = DateUtil.monthRange();

export function useInboundRecord() {


    const searchForm = reactive({
        no: '',
        locCode: '',
        startDate: monthRange.st,
        endDate: monthRange.ed,
    })

    const tableData = ref([])

    const pageObj = reactive({
        current: 1,
        size: 15,
        total: 0,
    })

    const initData = async () => {
        let { data } = await BoundRecordApi.inPage({ ...searchForm }, pageObj.current, pageObj.size)
        let { records, total } = data
        tableData.value = records
        pageObj.total = total
    }

    onMounted(async () => {
        await initData()
    })

    const handleSearch = async () => {
        pageObj.current = 1
        await initData()
    }

    const handleReset = async () => {
        searchForm.orderNo = ''
        searchForm.locCode = ''
        searchForm.type = undefined
        searchForm.startTime = ''
        searchForm.endTime = ''
        pageObj.current = 1
        await initData()
    }

    const tableRef = ref()

    return {
        searchForm,
        tableData,
        pageObj,
        handleSearch,
        handleReset,
        tableRef,
    }
}
