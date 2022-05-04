import { shallowMount, VueWrapper } from '@vue/test-utils';
import { WelcomeVue } from '@/common/primary/welcome';
import { createTestingPinia } from '@pinia/testing';
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { stubAuthenticationService } from '../../domain/AuthenticationService.fixture';
import { stubLogger } from '../../domain/Logger.fixture';
import { Logger } from '@/common/domain/Logger';

let wrapper: VueWrapper;

interface WrapperOptions {
  authenticationService: AuthenticationService;
  logger: Logger;
}

const wrap = (wrapperOptions?: Partial<WrapperOptions>) => {
  const { authenticationService, logger }: WrapperOptions = {
    authenticationService: stubAuthenticationService(),
    logger: stubLogger(),
    ...wrapperOptions,
  };

  wrapper = shallowMount(WelcomeVue, {
    global: {
      provide: {
        authenticationService,
        logger,
      },
      plugins: [createTestingPinia()],
    },
  });
};

describe('Welcome', () => {
  it('should exist', () => {
    wrap();

    expect(wrapper.exists()).toBe(true);
  });

  it('should authenticate', async () => {
    const authenticationService = stubAuthenticationService();
    authenticationService.authenticate.resolves({ username: 'username', authorities: ['admin'] });
    const logger = stubLogger();
    await wrap({ authenticationService, logger });

    const clickButton = wrapper.find('#identity');
    await clickButton.trigger('click');

    // @ts-ignore
    expect(wrapper.vm.getUser()).toStrictEqual({ username: 'username', authorities: ['admin'] });
  });

  it('Should log an error when authentication fails', async () => {
    const authenticationService = stubAuthenticationService();
    const logger = stubLogger();
    authenticationService.authenticate.rejects({});
    await wrap({ authenticationService, logger });

    const clickButton = wrapper.find('#identity');
    await clickButton.trigger('click');

    const [message] = logger.error.getCall(0).args;
    expect(message).toBe('The token provided is not know by our service');
  });
});
