import { createApp } from 'vue';
import App from './common/primary/app/App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import ConnectionRepository from './common/secondary/ConnectionRepository';
import { AxiosHttp } from './http/AxiosHttp';
import axios from 'axios';
import { jwtStore } from '@/common/domain/StoreService';

// jhipster-needle-main-ts-import

const axiosHttp = new AxiosHttp(axios.create({ baseURL: '' }));
const connectionRepository = new ConnectionRepository(axiosHttp);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.provide('connectionService', connectionRepository);
router.beforeEach(async to => {
  const user = jwtStore();
  const isAuth = user.isAuth;

  if (!isAuth && to.name !== 'Login')
    //avoid Login loop
    return { name: 'Login' };
});
app.use(router);
// jhipster-needle-main-ts-provider
app.mount('#app');
