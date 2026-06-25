import api from "@/common/api/index.js";

let url = "api/loc"

function page(data, current, size) {
    return api.post(url + "/page", data, {page: current, size})
}

function add(data) {
    return api.post(url , data)
}

function updateById(data) {
    return api.put(url , data)
}

function dropById(id) {
    return api.del(url + "/" + id)
}

function dropByIds(ids) {
    return api.del(url+"/batch" ,ids)
}

let  LocArchiveApi = {
    page,
    add,
    updateById,
    dropByIds,
    dropById
}

export default LocArchiveApi