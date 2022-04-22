import { defineStore } from 'pinia';
import { User } from '@/common/domain/User';

export const userLoggedInUserStore = defineStore({
  id: 'UserStore',
  state: () => ({
    user: new User(),
    authenticateError: false,
  }),

  getters: {
    isAuth(state) {
      return state.user.token != null;
    },
    getError(state) {
      return state.authenticateError;
    },
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setError(boolean: boolean) {
      this.authenticateError = boolean;
    },
  },
});
