import { Login } from '@/common/domain/Login';
import { LoginDTO } from '@/common/secondary/LoginDTO';
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
    const login: Login = { username: 'admin', password: 'admin', rememberMe: true };

    const response = await authenticationRepository.login(login);

    const [uri, payload] = axiosHttpStub.post.getCall(0).args;
    expect(uri).toBe('/api/authenticate');
    expect(payload).toEqual<LoginDTO>({ username: 'admin', password: 'admin', rememberMe: true });
    expect(response).toEqual(AUTH_TOKEN);
  });

  it('Should set empty token', async () => {
    const axiosHttpStub = stubAxiosHttp();
    axiosHttpStub.post.resolves({ status: 401, headers: { authorization: '' } });
    const authenticationRepository = new AuthenticationRepository(axiosHttpStub);
    const login: Login = { username: 'admin', password: 'wrong_password', rememberMe: true };

    const response = await authenticationRepository.login(login);

    const [uri, payload] = axiosHttpStub.post.getCall(0).args;
    expect(uri).toBe('/api/authenticate');
    expect(payload).toEqual<LoginDTO>({ username: 'admin', password: 'wrong_password', rememberMe: true });
    expect(response).toEqual('');
  });
});
