import { User } from '@/types';
import { atom, useAtom } from 'jotai';

const userAtom = atom<User | null>(null);
const userLoadedAtom = atom(false);
export const useUser = () => useAtom(userAtom);
export const userUserLoaded = () => useAtom(userLoadedAtom);