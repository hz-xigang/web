import api from "@/common/api/index.js";

let url = "api/prod"

function page(data, current, size) {
    return api.post(url + "/page", data, {page: current, size})
}



let ProdOrderApi = {
    page
}

export default ProdOrderApi