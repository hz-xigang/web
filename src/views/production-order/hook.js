import {ref, reactive, computed, onMounted, shallowRef} from 'vue'
import {message, Modal} from 'antdv-next'
import DateUtil from "@/common/util/DateUtil.js";
import ProdOrderApi from "@/common/api/ProdOrderApi.js";

let monthRange = DateUtil.monthRange();

export function useProductionOrder() {


    const tableData = shallowRef([]);
    const handleSearch = async () => {
        let req = {...searchForm};

        console.log(req.startDate.toLocaleString())
        console.log(req.endDate.toLocaleString());
        let {data} = await ProdOrderApi.page(req, 1, 15);
        let {total,records} = data;
        tableData.value = records;
        pageObj.total = total;
    }

    // 2. Query Filters
    const searchForm = reactive({
        keyword: '',
        status: undefined,
        category: undefined,
        startDate: monthRange.st,
        endDate: monthRange.ed,
    })

    // Columns Definition
    const columns = [
        {title: '生产单号', dataIndex: 'prodNo', key: 'prodNo', slot: 'poNo'},
        {title: '销售单号', dataIndex: 'erpOrderNo', key: 'erpOrderNo'},
        {title: '存货编码', dataIndex: 'inventoryCode', key: 'inventoryCode'},
        {title: '存货名称', dataIndex: 'inventoryName', key: 'inventoryName'},
        {title: '客户编码', dataIndex: 'customerCode', key: 'customerCode'},
        {title: '产品类别', dataIndex: 'productCategory', key: 'productCategory', slot: 'category'},
        {title: '规格型号', dataIndex: 'spec', key: 'spec'},
        {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
        {title: '状态', dataIndex: 'deleted', key: 'deleted', slot: 'status'},
        {title: '操作', key: 'action', slot: 'action', width: 150},
    ]

    // Filtered Data Source
    const filteredOrders = ref([])

    // Paginated Data
    const currentPage = ref(1)
    const pageSize = ref(10)
    const pageObj = reactive({
        current : 1,size : 15 ,total : 0,
    })


    const paginatedOrders = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value
        return filteredOrders.value.slice(start, end)
    })


    const handleReset = () => {
        searchForm.keyword = ''
        searchForm.status = undefined
        searchForm.category = undefined
        searchForm.startDate = monthRange.st
        searchForm.endDate = monthRange.ed
        handleSearch()
    }

    // Initial load
    handleSearch()

    // 4. Edit Modal Save Action
    const handleSaveSuccess = (updatedData) => {
        const index = orders.value.findIndex((o) => o.id === updatedData.id)
        if (index > -1) {
            orders.value[index] = {
                ...orders.value[index],
                ...updatedData,
            }
            message.success('更新订单成功')
            handleSearch()
        }
    }

    // 5. Delete Action
    const handleDelete = (id) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除此生产订单吗？该操作不可恢复。',
            okText: '确认',
            cancelText: '取消',
            okType: 'danger',
            onOk() {
                orders.value = orders.value.filter((item) => item.id !== id)
                message.success('删除成功')
                handleSearch()
            },
        })
    }

    // 6. QR Code Preview Modal State & Actions
    const qrModalVisible = ref(false)
    const qrCodePoNo = ref('')
    const qrCodeUrl = computed(() => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodePoNo.value)}`
    })

    const previewQRCode = (poNo) => {
        qrCodePoNo.value = poNo
        qrModalVisible.value = true
    }

    const statusOptions = [
        {value: true, label: '启用'},
        {value: false, label: '作废'},
    ]

    const categoryOptions = [
        {value: '成品', label: '成品'},
        {value: '辅料', label: '辅料'},
        {value: '半成品', label: '半成品'},
    ]


    onMounted(async () => {

    })


    return {

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
    }
}
