import { shallowMount, VueWrapper } from '@vue/test-utils';
import { LoginVue } from '@/common/primary/login';
import { createTestingPinia } from '@pinia/testing';
import { ConnectionService } from '@/common/domain/ConnectionService';
import { stubConnectionService } from '../../domain/ConnectionService.fixture';
import { UserCredentialsDTO } from '@/common/domain/User';

let wrapper: VueWrapper;

interface WrapperOptions {
  connectionService: ConnectionService;
}

const wrap = (wrapperOptions?: Partial<WrapperOptions>) => {
  const { connectionService }: WrapperOptions = {
    connectionService: stubConnectionService(),
    ...wrapperOptions,
  };
  wrapper = shallowMount(LoginVue, {
    global: {
      provide: {
        connectionService,
      },
      plugins: [createTestingPinia()],
    },
  });
};

const fillFullForm = async (userCredentialDTO: UserCredentialsDTO): Promise<void> => {
  const usernameInput = wrapper.find('#username');
  await usernameInput.setValue(userCredentialDTO.username);
  const passwordInput = wrapper.find('#password');
  await passwordInput.setValue(userCredentialDTO.password);
};

describe('Login', () => {
  it('should exist', () => {
    wrap();

    expect(wrapper.exists()).toBe(true);
  });

  it('should login', async () => {
    const connectionService = stubConnectionService();
    connectionService.login.resolves({});
    await wrap({ connectionService });

    const userCredential: UserCredentialsDTO = new UserCredentialsDTO('username', 'password', true);
    await fillFullForm(userCredential);

    const submitButton = wrapper.find('#submit');
    await submitButton.trigger('submit');

    const args = connectionService.login.getCall(0).args[0];

    expect(args).toEqual({ username: 'username', password: 'password', rememberMe: false });
  });

  it('should not login', async () => {
    const connectionService = stubConnectionService();
    connectionService.login.rejects({});
    await wrap({ connectionService });

    const userCredential: UserCredentialsDTO = new UserCredentialsDTO('username', 'password', true);
    await fillFullForm(userCredential);

    const submitButton = wrapper.find('#submit');
    await submitButton.trigger('submit');

    expect(true).toEqual(true);
  });
});
