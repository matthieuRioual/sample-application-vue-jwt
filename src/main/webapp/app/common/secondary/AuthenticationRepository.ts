import { Login } from '@/common/domain/Login';
import { LoginDTO, toLoginDTO } from '@/common/secondary/LoginDTO';

import { AxiosHttp } from '@/http/AxiosHttp';
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { User } from '../domain/User';
import { toUser, UserDTO } from './UserDTO';

export default class AuthenticationRepository implements AuthenticationService {
  constructor(private axiosHttp: AxiosHttp) {}

  async authenticate(token: string): Promise<User> {
    return await this.axiosHttp
      .get<UserDTO>('/api/account', { headers: { Authorization: 'Bearer ' + token } })
      .then(response => toUser(response.data));
  }

  async login(login: Login): Promise<string> {
    const loginDTO: LoginDTO = toLoginDTO(login);
    return await this.axiosHttp
      .post<any, LoginDTO>('/api/authenticate', loginDTO)
      .then(response => this.parseAuthorisationHeaders(response));
  }

  parseAuthorisationHeaders(response: any): string {
    const bearerToken = response.headers.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length);
      return jwt;
    } else {
      return '';
    }
  }
}
