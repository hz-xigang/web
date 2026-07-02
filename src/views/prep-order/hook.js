import {computed, reactive, ref,onMounted} from "vue";
import PerpOrderApi from "@/common/api/PerpOrderApi.js";


export default function usePrepOrder() {

    const tableData = ref([]);
    onMounted(async ()=>{
       let {data} =  await PerpOrderApi.page({page : pageObj.current, size : pageObj.size});
       let {records, total } =  data;
       pageObj.total = total;
       tableData.value = records;
    })

    const orderTypeMap = {
        1: {text: '国内订单', color: 'blue'},
        2: {text: '外贸订单', color: 'purple'},
    }

    const statusMap = {
        0: {text: '待备料', color: 'warning'},
        1: {text: '备料中', color: 'processing'},
        2: {text: '已完成', color: 'success'},
    }

    const formatDateTime = (value) => {
        if (!value) return '-'
        return String(value).replace('T', ' ').slice(0, 19)
    }

    const searchForm = reactive({
        prepNo: '',
        customerCode: '',
        status: undefined,
        startDate: '',
        endDate: '',
    })

    const statusOptions = Object.entries(statusMap).map(([value, {text}]) => ({
        value: Number(value),
        label: text,
    }))

    const pageObj = reactive({
        current: 1,
        size: 15,
        total: 0,
    })



    const handleSearch = () => {
        pageObj.current = 1
    }

    const handleReset = () => {
        Object.assign(searchForm, {prepNo: '', customerCode: '', status: undefined, startDate: '', endDate: ''})
        pageObj.current = 1
    }

    const tableRef = ref()


    return {
        pageObj,
        tableData,
        handleSearch,
        handleReset,
        formatDateTime,
        tableRef,
        orderTypeMap,
        statusOptions,
        searchForm,
        statusMap
    }

}