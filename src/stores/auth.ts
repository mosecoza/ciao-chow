import { create } from "zustand";
import { AuthSuccessResponse, User } from "src/types/api";

interface AuthStore {
    user: User | null;
    token: string | null;
    setAuth: (auth: AuthSuccessResponse | null) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    token: null,
    setAuth: (value: AuthSuccessResponse | null) =>
        set((state) => ({
            ...state,
            user: value ? value.user : null,
            token: value ? value.jwt : null,
        }))
}));
