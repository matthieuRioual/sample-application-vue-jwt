import { Login } from '@/common/domain/Login';

export interface AuthenticationService {
  login(login: Login): Promise<string>;
}
