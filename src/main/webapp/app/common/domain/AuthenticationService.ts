import { User } from '@/common/domain/User';

export interface AuthenticationService {
  login(user: User, password: string): Promise<string>;
}
