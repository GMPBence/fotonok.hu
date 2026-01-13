import { jwtDecode } from "jwt-decode";

export function getToken() {
    return localStorage.getItem("token");
}

export function isAuthenticated() {
    const token = getToken();
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token);
        return Date.now() < exp * 1000;
    } catch {
        return false;
    }
}
