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

export const getDoctors = async (page=0, speciality:string, district:string, sortField:string, direction:'ASC' | 'DESC') => {
    const res = await (await fetch(serverUrl + `/doctor?page=${page}&speciality=${speciality}&district=${district}&sortField=${sortField}&direction=${direction}`)).json();
    return res;
}

export const searchDoctor = async (keyword:string, page:number) => {
    const res = await (await fetch(serverUrl + `/doctor/search?query=${keyword}&page=${page}`)).json();
    return res;
}