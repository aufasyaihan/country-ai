import { createContext } from 'react';
import { UserType } from '../types/User';

export const AuthContext = createContext<{ user: UserType | null, login: (credential: string) => void, logout: () => void } | undefined>(undefined);