import { createApp } from 'vue';
import App from './common/primary/app/App.vue';
import createRouter from './router/router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import AuthenticationRepository from './common/secondary/AuthenticationRepository';
import { AxiosHttp } from './http/AxiosHttp';
import axios from 'axios';
import ConsoleLogger from './common/secondary/ConsoleLogger';

// jhipster-needle-main-ts-import

const axiosHttp = new AxiosHttp(axios.create({ baseURL: '' }));
const authenticationRepository = new AuthenticationRepository(axiosHttp);
const consoleLogger = new ConsoleLogger(console);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
const router = createRouter();
app.provide('authenticationService', authenticationRepository);
app.provide('logger', consoleLogger);
app.use(router);
// jhipster-needle-main-ts-provider
app.mount('#app');
