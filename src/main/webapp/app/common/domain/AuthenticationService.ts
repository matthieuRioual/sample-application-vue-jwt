import { Login } from '@/common/domain/Login';
import { User } from '@/common/domain/User';

export interface AuthenticationService {
  authenticate(token: string): Promise<User>;
  login(login: Login): Promise<string>;
}
