import { mount, VueWrapper } from '@vue/test-utils';
import { AppVue } from '@/common/primary/app';
import router from '@/router/router';

let wrapper: VueWrapper;

describe('App', () => {
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

  it('should exist', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
