import {onMounted, reactive, ref} from "vue";
import ShipOrderApi from "@/common/api/ShipOrderApi.js";


export default function useShipmentOrder() {

    const tableData = ref([]);

    const pageObj = reactive({
        current: 1,
        size: 15,
        total: 0,
    })

    onMounted(async ()=>{
        let {data} = await ShipOrderApi.page({
            page : pageObj.current,
            size : pageObj.size,
        });
       let {total ,records} = data;

        pageObj.total = total;
        tableData.value = records;
    })

    return {
        pageObj,
        tableData
    }


}