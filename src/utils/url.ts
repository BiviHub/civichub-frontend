import api from "../api";

export const toAbsolute = (url?: string) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const base = (api.defaults.baseURL ?? "").replace(/\/+$/, "");
    const rel = url.startsWith("/") ? url : `/${url}`;
    return `${base}${rel}`;
};
