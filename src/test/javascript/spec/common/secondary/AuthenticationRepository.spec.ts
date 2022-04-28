import { UserDTO } from '@/common/secondary/UserDTO';
import { User } from '@/common/domain/User';
import AuthenticationRepository from '@/common/secondary/AuthenticationRepository';
import { stubAxiosHttp } from '../../http/AxiosHttpStub';

describe('AuthenticationRepository', () => {
  const AUTH_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  it('Should login when status 200 returned', async () => {
    const axiosHttpStub = stubAxiosHttp();
    axiosHttpStub.post.resolves({
      status: 200,
      headers: {
        authorization: 'Bearer ' + AUTH_TOKEN,
      },
    });
    const authenticationRepository = new AuthenticationRepository(axiosHttpStub);
    const user: User = { username: 'admin', rememberMe: true };

    const response = await authenticationRepository.login(user, 'admin');

    const [uri, payload] = axiosHttpStub.post.getCall(0).args;
    expect(uri).toBe('/api/authenticate');
    expect(payload).toEqual<UserDTO>({ username: 'admin', password: 'admin', rememberMe: true });
    expect(response).toEqual(AUTH_TOKEN);
  });

  it('Should not login when status 401 returned', async () => {
    const axiosHttpStub = stubAxiosHttp();
    axiosHttpStub.post.resolves({ status: 401, headers: { authorization: '' } });
    const authenticationRepository = new AuthenticationRepository(axiosHttpStub);
    const user: User = { username: 'admin', rememberMe: true };

    const response = await authenticationRepository.login(user, 'password');

    const [uri, payload] = axiosHttpStub.post.getCall(0).args;
    expect(uri).toBe('/api/authenticate');
    expect(payload).toEqual<UserDTO>({ username: 'admin', password: 'password', rememberMe: true });
    expect(response).toStrictEqual('');
  });
});
