import api from "@/common/api/index.js";

let url = "api/stock/in"

function inPage(data, current, size) {
    return api.post(url + "/page", data, {page: current, size})
}

let BoundRecordApi = {
    inPage,
}

export default BoundRecordApi
