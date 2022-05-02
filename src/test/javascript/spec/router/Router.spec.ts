import { mount, VueWrapper } from '@vue/test-utils';
import { AppVue } from '@/common/primary/app';
import { WelcomeVue } from '@/common/primary/welcome';
import createRouter from '@/router/router';
import { createTestingPinia } from '@pinia/testing';

let wrapper: VueWrapper;
describe('Router', () => {
  let router: any;
  beforeAll(async () => {
    const router = createRouter();
    router.push('/');
    const wrap = () => {
      wrapper = mount(AppVue, {
        global: {
          stubs: ['router-link', 'router-view'],
          plugins: [router, createTestingPinia()],
        },
      });
    };
    wrap();
  });

  afterAll(async () => new Promise(resolve => window.setTimeout(resolve, 0)));
  it('Should redirect to App by default', async () => {
    router = createRouter();

    router.push('/');
    await router.isReady();

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AppVue)).toBeTruthy();
  });

  it('Should go to AppVue', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AppVue)).toBeTruthy();
  });

  it('Should go to WelcomeVue', async () => {
    router.push('/welcome');

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(WelcomeVue)).toBeTruthy();
  });
});
