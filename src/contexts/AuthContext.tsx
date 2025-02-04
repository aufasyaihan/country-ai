import { createContext } from "react";
import { UserType } from "../types/User";

interface AuthContextType {
    user: UserType | null;
    login: (credential: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
