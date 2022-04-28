import { User } from '@/common/domain/User';
import { Login } from '@/common/secondary/Login';

import { AxiosHttp } from '@/http/AxiosHttp';
import { AuthenticationService } from '@/common/domain/AuthenticationService';

export default class AuthenticationRepository implements AuthenticationService {
  constructor(private axiosHttp: AxiosHttp) {}

  async login(user: User, password: string): Promise<string> {
    return await this.axiosHttp
      .post<any, Login>('/api/authenticate', { username: user.username, password: password, rememberMe: user.rememberMe })
      .then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          return jwt;
        } else {
          return '';
        }
      });
  }
}
