import { defineStore } from 'pinia';

export const jwtStore = defineStore({
  id: 'JWTStore',
  state: () => ({
    token: '',
  }),

  getters: {
    isAuth(state) {
      return state.token != '';
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
});
