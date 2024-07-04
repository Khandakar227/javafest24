import { atom, useAtom } from 'jotai';
export type User = {
    _id: number;
    name: string;
    email: string;
    role: string;
    verified: boolean;
}
const userAtom = atom<User | null>(null);
const userLoadedAtom = atom(false);
export const useUser = () => useAtom(userAtom);
export const userUserLoaded = () => useAtom(userLoadedAtom);