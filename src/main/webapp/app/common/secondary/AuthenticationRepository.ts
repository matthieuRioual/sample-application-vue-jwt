import { Login } from '@/common/domain/Login';
import { LoginDTO, toLoginDTO } from '@/common/secondary/LoginDTO';

import { AxiosHttp } from '@/http/AxiosHttp';
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { User } from '../domain/User';
import { toUser, UserDTO } from './UserDTO';
import { Pinia } from 'pinia';
import { jwtStore } from '@/common/domain/JWTStoreService';

export default class AuthenticationRepository implements AuthenticationService {
  constructor(private axiosHttp: AxiosHttp, private piniaInstance: Pinia) {}

  async authenticate(): Promise<User> {
    return await this.axiosHttp
      .get<UserDTO>('/api/account', { headers: { Authorization: 'Bearer ' + this.getJwtToken() } })
      .then(response => toUser(response.data));
  }

  async login(login: Login): Promise<void> {
    const loginDTO: LoginDTO = toLoginDTO(login);
    await this.axiosHttp
      .post<any, LoginDTO>('/api/authenticate', loginDTO)
      .then(response => this.saveJwtTokenIntoStore(this.parseAuthorisationHeaders(response)));
  }

  private saveJwtTokenIntoStore = (token: string): void => jwtStore(this.piniaInstance).setToken(token);

  private getJwtToken = (): string => jwtStore(this.piniaInstance).token;

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
