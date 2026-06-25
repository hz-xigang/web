// http/interceptors.js
import MLoading from "@/components/M-Loading";
import ToastUtil from "@/common/util/ToastUtil.js";

let requestCount = 0;

function showLoading() {
    if (requestCount === 0) {
        MLoading.show();
    }
    requestCount++;
}

function hideLoading() {
    requestCount--;
    if (requestCount <= 0) {
        requestCount = 0;
        MLoading.close();
    }
}

export function setupHttpInterceptors(http) {
    http.interceptors.request.use(config => {
        const token = sessionStorage.getItem("ac");

        config.headers = {
            ...config.headers,
            Authorization: token ? `Bearer ${token}` : ""
        };

        showLoading();

        return config;
    });

    http.interceptors.response.use(
        res => {
            hideLoading();

            const data = res.data;

            if (data && data.success === false) {
                ToastUtil.error(data.message || "操作失败");
                return Promise.reject(data);
            }

            return data;
        },
        err => {
            hideLoading();

            const msg =
                err.response?.data?.message ||
                err.message ||
                "网络错误";

            ToastUtil.error(msg);

            return Promise.reject(err);
        }
    );
}
