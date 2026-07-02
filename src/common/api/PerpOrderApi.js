
import api from "@/common/api/index.js";

let url = "api/prep/order"

function page(params) {
    return api.post(url + "/page", {}, params)
}

const  PerpOrderApi = {
    page
}

export default PerpOrderApi