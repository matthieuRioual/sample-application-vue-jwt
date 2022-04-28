import { defineStore } from 'pinia';

export const jwtStore = defineStore({
  id: 'UserStore',
  state: () => ({
    token: '',
  }),

  getters: {
    isAuth(state) {
      return state.token != null;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
});
