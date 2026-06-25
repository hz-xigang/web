// http/download.js
import http from "./index";
import ToastUtil from "@/common/util/ToastUtil.js";

export const download = async (options) => {

    const token = sessionStorage.getItem("ac");

    try {
        const res = await http({
            url: options.url,
            method: options.method || "POST",
            params: options.params,
            data: options.data,
            responseType: "blob",
            headers: {
                Authorization: token ? `Bearer ${token}` : ""
            }
        });

        // ❗ 判断是否是 JSON 错误
        const contentType = res.headers?.["content-type"];

        if (contentType?.includes("application/json")) {
            const text = await res.data.text();
            const json = JSON.parse(text);

            ToastUtil.error(json.message || "下载失败");
            return;
        }

        // 文件名
        let fileName = options.filename || "file.xlsx";

        const disposition = res.headers?.["content-disposition"];
        if (disposition) {
            const match = disposition.match(/filename\*=UTF-8''(.+)/);
            if (match) {
                fileName = decodeURIComponent(match[1]);
            }
        }

        // 下载
        const blob = new Blob([res.data]);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    } catch (err) {
        ToastUtil.error("下载失败");
        throw err;
    }
};