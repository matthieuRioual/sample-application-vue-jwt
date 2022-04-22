import { User, UserCredentialsDTO } from '@/common/domain/User';
import ConnectionRepository from '@/common/secondary/ConnectionRepository';
import { stubAxiosHttp } from '../../http/AxiosHttpStub';

describe('ProjectRepository', () => {
  it('should login with credentials returned', async () => {
    const axiosHttpStub = stubAxiosHttp();
    axiosHttpStub.post.resolves({
      status: 200,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
      data: { id: '1234567890' },
    });
    const connectionRepository = new ConnectionRepository(axiosHttpStub);
    const userCredentialDTO: UserCredentialsDTO = { username: 'mySuperUsername', password: 'mySuperPassword' };

    const response = await connectionRepository.login(userCredentialDTO);

    const [uri, payload] = axiosHttpStub.post.getCall(0).args;
    expect(uri).toBe('/api/authenticate');
    expect(payload).toEqual<UserCredentialsDTO>(userCredentialDTO);
    expect(response).toStrictEqual(
      new User(
        'mySuperUsername',
        '1234567890',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      )
    );
  });
  it('should not login when no credential returned', async () => {
    const axiosHttpStub = stubAxiosHttp();
    axiosHttpStub.post.resolves({ status: 200, headers: { authorization: '' } });
    const connectionRepository = new ConnectionRepository(axiosHttpStub);
    const userCredentialDTO: UserCredentialsDTO = { username: 'mySuperUsername', password: 'mySuperPassword' };

    const response = await connectionRepository.login(userCredentialDTO);

    const [uri, payload] = axiosHttpStub.post.getCall(0).args;
    expect(uri).toBe('/api/authenticate');
    expect(payload).toEqual<UserCredentialsDTO>(userCredentialDTO);
    expect(response).toStrictEqual(new User());
  });
});
