export type Doctor = {
    id: string,
    photo: string,
    name: string,
    degree: string,
    speciality: string,
    designation: string,
    workplace: string,
    chamber: string,
    about: string,
    district: string,
    contact: string,
}
export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    verified: boolean;
}

export type Exercise = {
    excerciseName: string;
    muscleGp: string;
    equipment: string;
    description: string;
    benefits: string;
    rating: number;
    img: string [];
}

export type PredictedDisease = {
    name: string,
    possibility: string,
    description: string,
}
export type QnA = {
    question: string;
    answer: string; 
}