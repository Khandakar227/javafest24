import { QnA } from "@/types";
import { serverUrl, serverUrlV2 } from "./const";

export const login = async (data: any) => {
    const res = await (await fetch(serverUrl + '/user/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    })).json();
    if (!res.error) localStorage.setItem("token", res.token);
    return res;
}

export const sendPasswordResetLink = async (email: string) => {
    const res = await (await fetch(serverUrl + `/user/send-password-reset-mail?email=${email}`)).json();
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

export const getExercises = async (query: string, gender: string, page = 0) => {
    const res = await (await fetch(serverUrl + `/exercise/muscle/${query}?gender=${gender}&page=${page}`)).json();
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

export const registerDonor = async (data: any) => {
    const token = localStorage.getItem("token");
    const res = await (await fetch(`${serverUrl}/donors/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })).json();
    return res;
};

export const findDonorNear = async (bloodGroup: string, lng:string,  lat:string) => {
    const res = await (await fetch(`${serverUrl}/donors/searchByBloodGroup?bloodGroup=${bloodGroup}&lng=${lng}&lat=${lat}&maxDistance=5000`)).json()
    return res;
}

export const getDonorsAddedByMe = async (page=0) => {
    const token = localStorage.getItem("token");
    const res = await (await fetch(`${serverUrl}/donors/added?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })).json();
    return res;
}

export const fetchBloodGroups = async () => {
    try {
        const response = await fetch(`${serverUrl}/donors/countByBloodGroup`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (typeof data !== 'object' || data === null) {
            throw new Error('Unexpected response format');
        }

        return data; 
    } catch (error) {
        console.error('Failed to fetch blood groups:', error);
        return {}; 
    }
};

export const getWorkoutPlans = async (data:any) => {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      
    const res = await (await fetch(`${serverUrl}/workout-plan`, options)).json();
    return res;
}