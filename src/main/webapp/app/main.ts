import { createApp } from 'vue';
import App from './common/primary/app/App.vue';
import createRouter from './router/router';
import { createPinia } from 'pinia';
import AuthenticationRepository from './common/secondary/AuthenticationRepository';
import { AxiosHttp } from './http/AxiosHttp';
import axios from 'axios';
import ConsoleLogger from './common/secondary/ConsoleLogger';
import piniaPersist from 'pinia-plugin-persist';

// jhipster-needle-main-ts-import

const axiosHttp = new AxiosHttp(axios.create({ baseURL: '' }));
const consoleLogger = new ConsoleLogger(console);
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
const router = createRouter();

const authenticationRepository = new AuthenticationRepository(axiosHttp, pinia);

app.provide('authenticationService', authenticationRepository);
app.provide('logger', consoleLogger);
app.provide('router', router);
app.use(router);
// jhipster-needle-main-ts-provider
app.mount('#app');
