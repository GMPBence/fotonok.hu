import axios from "axios";

const api = axios.create({
    baseURL: "https://api.fotonok.hu/api/v1",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        } else if (err.response.data.error === "user_already_has_note") {
            alert("Már megvásároltad ezt a jegyzetet.");
        }
        return Promise.reject(err);
    }
);

export default api;
