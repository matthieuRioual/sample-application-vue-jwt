import { shallowMount, VueWrapper } from '@vue/test-utils';
import { AppVue } from '@/common/primary/app';

import router from '@/router/router';

let wrapper: VueWrapper;

const wrap = () => {
  wrapper = shallowMount(AppVue,{
    router
  });
};

describe('Router', () => {
  it('Should redirect to App by default', async () => {
    wrap();
    await router.push('/')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AppVue)).toBeTruthy()
  })

  it('Should go to AppVue', async () => {
    wrap();
    await router.push('/app')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AppVue)).toBeTruthy()
  })
})
