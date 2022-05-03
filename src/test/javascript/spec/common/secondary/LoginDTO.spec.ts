import { LoginDTO, toLoginDTO } from '@/common/secondary/LoginDTO';
import { Login } from '@/common/domain/Login';

describe('LoginDTO', () => {
  it('should convert to LoginDTO', () => {
    const login: Login = { username: 'username', password: 'password', rememberMe: true };

    expect(toLoginDTO(login)).toEqual<LoginDTO>({ username: 'username', password: 'password', rememberMe: true });
  });
});
