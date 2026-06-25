// http/request.js
import http from "./index";

export const request = (options) => {
    return http({
        url: options.url,
        method: options.method || "GET",
        params: options.params,
        data: options.data,
        headers: options.headers
    });
};

export const get = (url, params) =>
    request({ url, method: "GET", params });

export const post = (url, data, params) =>
    request({ url, method: "POST", data, params });

export const put = (url, data, params) =>
    request({ url, method: "PUT", data, params });

export const del = (url, data, params) =>
    request({ url, method: "DELETE", data, params });
