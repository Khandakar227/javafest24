import { serverUrl } from "./const";

export const login = async (data: any) => {
    const res = await (await fetch(serverUrl + '/user/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    })).json();
    if (!res.error) localStorage.setItem("token", res.token);
    return res;
}

export const getLoggedInUser = async () => {
    const token = localStorage.getItem("token");
    const res = await (await fetch(serverUrl + "/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).json();
    if (res.error) {
        localStorage.removeItem("token");
        return;
    }
    return res;
}

export const getDoctors = async () => {
    const res = await (await fetch(serverUrl + "/doctor")).json();
    return res;
}