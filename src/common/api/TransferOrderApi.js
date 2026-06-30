
import api from "@/common/api/index.js";

let url = "api/transfer/order"

function page(params) {
    return api.post(url + "/page", {}, params)
}

let TransferOrderApi = {
    page
}

export default TransferOrderApi