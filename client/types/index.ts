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
    img: string[];
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

export type Medicine = {
    brandName: string,
    dosageForm: string,
    generic: string,
    id: string,
    manufacturer: string,
    price: string,
    slug: string,
    strength: string,
    type: string
}

export type Generic = {
    id: string,
    genericId: number,
    name: string,
    slug: string,
    drugClass?: string,
    indication?: string,
    indicationDescription?: string,
    therapeuticClassDescription?: string,
    pharmacologyDescription?: string,
    dosageDescription?: string,
    administrationDescription?: string,
    interactionDescription?: string,
    contraindicationsDescription?: string,
    sideEffectsDescription?: string,
    pregnancyAndLactationDescription?: string,
    precautionsDescription?: string,
    pediatricUsageDescription?: string,
    overdoseEffectsDescription?: string,
    storageConditionsDescription?: string
}

export type Address = { location: number[], name: string }


export type Donor = {
    id: string,
    fullName: string,
    bloodGroup: string,
    gender: string,
    age: number,
    mobileNo: string,
    addresses: Address[],
    verified: boolean,
}