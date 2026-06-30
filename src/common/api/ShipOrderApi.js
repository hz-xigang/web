
import api from "@/common/api/index.js";

let url = "api/ship/order"

function page(params) {
    return api.post(url + "/page", {}, params)
}

let  ShipOrderApi = {
    page
}

export default ShipOrderApi