import { QnA } from "@/types";
import { serverUrl, serverUrlV2 } from "./const";

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

export const getDoctors = async (page = 0, speciality: string, district: string, sortField: string, direction: 'ASC' | 'DESC', query = '') => {
    const res = await (await fetch(serverUrl + `/doctor?page=${page}&query=${query}&speciality=${speciality}&district=${district}&sortField=${sortField}&direction=${direction}`)).json();
    return res;
}

export const searchDoctor = async (keyword: string, page: number) => {
    const res = await (await fetch(serverUrl + `/doctor/search?query=${keyword}&page=${page}`)).json();
    return res;
}

export const getDoctor = async (id: string) => {
    const res = await (await fetch(serverUrl + `/doctor/${id}`)).json();
    return res;
}

export const getExercises = async (query: string, page = 0) => {
    const res = await (await fetch(serverUrl + `/exercise/muscle/${query}?page=${page}`)).json();
    return res;
}

export const getDiseasePrediction = async (prompt: string, previousResponse: QnA[]) => {
    const res = await (await fetch(serverUrlV2 + `/predict-disease?prompt=${prompt}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(previousResponse)
    })).json();
    
    return res;
}

export const getWords = async (page=0, alphabet='') => {
    let res;
    if(alphabet)
        res = await (await fetch(serverUrl + `/signs/prefix/${alphabet}?page=${page}`)).json();
    else
        res = await (await fetch(serverUrl + `/signs/words?page=${page}`)).json();
    return res;
}

export const getWord = async (word: string) => {
    const res = await (await fetch(serverUrl + `/signs/word/${word}`)).json();
    return res;
}