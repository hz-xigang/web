import axios from 'axios';
import ToastUtil from "../util/ToastUtil.js";
import MLoading from "@/components/M-Loading/index.js";

let http = axios.create({
    timeout: 60 * 1000, // request timeout
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
});


 function baseApi(reqDto) {

    let {url, headers, params, data, method, failFunc} = reqDto;

    let token = sessionStorage.getItem('ac');

    return new Promise(((resolve, reject) => {
        http({
            url,
            method,
            headers : {
                ...headers,
                "Authorization" : `Bearer ${token}`,
            },
            params,
            data
        }).then(res=>{

            let {success, message, data : resData} = res.data;
            if (success) {
                resolve(resData);

                // 确保加载动画至少显示500ms，提升用户体验
                setTimeout(() => {
                    MLoading.close()
                }, 150)

            } else {
                MLoading.close()
                if (failFunc){
                    failFunc();
                }
                ToastUtil.error(message || '操作失败');
            }
        }).catch(err=>{
            // 提取友好的错误信息
            const errorMessage = err.response?.data?.message 
                || err.message 
                || '网络请求失败，请稍后重试';
            
            ToastUtil.error(errorMessage);
            
            if (failFunc){
                failFunc();
            }
            MLoading.close()
            reject(err);
        })
    }));
}

function post(data) {
    data.method = 'post';
    return baseApi(data);
}

function get(data) {
    data.method = 'get';
    return baseApi(data);
}

function put(data) {
    data.method = 'put';
    return baseApi(data);
}

function drop(data) {
    data.method = 'delete';
    return baseApi(data);
}


function download(reqDto) {

    let { url, params, data, method, filename,failFunc } = reqDto;
    let token = sessionStorage.getItem('ac');

    return http({
        url,
        method: method || 'post',
        params,
        data,
        responseType: 'blob', // 👈 核心
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => {

        // 👇 判断是不是 JSON 错误（很关键）
        const contentType = res.headers['content-type'];

        if (contentType && contentType.includes('application/json')) {
            failFunc();
             return res.data.text().then(text => {
                const json = JSON.parse(text);
                ToastUtil.error(json.message || '下载失败');
                MLoading.close()
            });
        }

        // 👇 解析文件名（后端有的话）
        let fileName = filename || 'report.xlsx';
        const disposition = res.headers['content-disposition'];

        if (disposition) {
            // 优先匹配 filename*（支持中文）
            const match = disposition.match(/filename\*=UTF-8''(.+)/);
            if (match) {
                fileName = decodeURIComponent(match[1]);
            } else {
                // fallback
                const match2 = disposition.match(/filename="?([^"]+)"?/);
                if (match2) {
                    fileName = match2[1];
                }
            }
        }

        // 👇 下载
        const blob = new Blob([res.data]);
        const urlObj = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = urlObj;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(urlObj);
        MLoading.close()
    }).catch(err => {
        ToastUtil.error('下载失败');
        failFunc();
        MLoading.close()
        throw err;
    });
}

let httpUtil = {
    post,
    get,
    put,
    drop,
    download,
}

export default httpUtil
