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

export const getRandomWords = async () => {
    const res = await (await fetch(serverUrl + `/signs/quiz`)).json();
    return res;
}

export const getMedicines = async (keyword:string, page=0) => {
    if(!keyword) {
        const res = await (await fetch(serverUrl + `/medicine?page=${page}`)).json();
        return res;
    }
    const res = await (await fetch(serverUrl + `/medicine/search?query=${keyword}&page=${page}`)).json();
    return res;
}

export const getFullMedicineInfo = async(slug:string) => {
    const res = await (await fetch(serverUrl + `/medicine/slug/${slug}`)).json();
    return res;
}

export const estimateFoodCalorie = async(image:File, foodName="", width=0, height=0) => {
    const form = new FormData();
    form.append("file", image);
    const options = { method: 'POST', body: form };
    const res = await (await fetch(serverUrl + `/food-calorie?foodName=${foodName}&width=${width}&height=${height}`, options)).json();
    return res;
}

export const calculateBMI = async (weight: number, height: number) => {
    const res = await (await fetch(serverUrl + `/bmi?weight=${weight}&height=${height}`)).json();
    return res;
}