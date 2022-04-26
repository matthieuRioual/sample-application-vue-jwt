import { defineStore } from 'pinia';

export const jwtStore = defineStore({
  id: 'UserStore',
  state: () => ({
    token: '',
    authenticateError: false,
  }),

  getters: {
    isAuth(state) {
      return state.token != null;
    },
    getError(state) {
      return state.authenticateError;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setError(boolean: boolean) {
      this.authenticateError = boolean;
    },
  },
});
