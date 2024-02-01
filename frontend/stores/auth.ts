import { defineStore } from "pinia";
import type { User } from "~/types/user";

export interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    userRole: (state) => state.user?.role,
  },
  actions: {
    updateAuth(data: Partial<AuthState>) {
      this.$patch({
        ...this.$state,
        ...data,
      });
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      secure: process.env.NODE_ENV === "production",
    }),
  },
});
