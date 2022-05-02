import { shallowMount, VueWrapper } from '@vue/test-utils';
import { AppVue } from '@/common/primary/app';
import sinon from 'sinon';

let wrapper: VueWrapper;
const $route = { path: {} };
const $router = { push: sinon.stub() };

const isNotEmptyStub = (override: any): boolean => {
  return override.stubs && override.stubs.length > 1;
};
const wrap = (override: any = {}) => {
  const mocks: any = override.mocks || {};

  wrapper = shallowMount(AppVue, {
    global: {
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route,
        $router,
        ...mocks,
      },
    },
  });
};
describe('App', () => {
  it('should exist', () => {
    wrap();
    expect(wrapper).toBeTruthy();
  });
});
