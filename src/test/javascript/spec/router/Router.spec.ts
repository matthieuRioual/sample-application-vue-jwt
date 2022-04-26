import { mount, VueWrapper } from '@vue/test-utils';
import { AppVue } from '@/common/primary/app';
import router from '@/router/router';

let wrapper: VueWrapper;
describe('Router', () => {
  beforeAll(async () => {
    router.push('/');
    await router.isReady();
    const wrap = () => {
      wrapper = mount(AppVue, {
        global: {
          plugins: [router],
        },
      });
    };
    wrap();
  });
  it('Should redirect to App by default', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AppVue)).toBeTruthy();
  });

  it('Should go to AppVue', async () => {
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(AppVue)).toBeTruthy();
  });
});
