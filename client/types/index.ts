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