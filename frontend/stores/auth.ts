import { defineStore } from "pinia";
import type { User } from "~/types/user";

export interface AuthState {
  tokens: {
    access: string | null;
    refresh: string | null;
  };
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    tokens: {
      access: null,
      refresh: null,
    },
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.tokens.access && !!state.tokens.refresh,
    userRole: (state) => state.user?.role,
  },
  actions: {
    updateAuth(data: Partial<AuthState>) {
      this.$patch({
        ...this.$state,
        ...data,
      });
    },

    updateTokens(tokens: Partial<AuthState["tokens"]>) {
      this.updateAuth({
        tokens: {
          ...this.$state.tokens,
          ...tokens,
        },
      });
    },
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      secure: process.env.NODE_ENV === "production",
    }),
  },
});
