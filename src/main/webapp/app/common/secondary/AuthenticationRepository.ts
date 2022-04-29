import { Login } from '@/common/domain/Login';
import { LoginDTO, toLoginDTO } from '@/common/secondary/LoginDTO';

import { AxiosHttp } from '@/http/AxiosHttp';
import { AuthenticationService } from '@/common/domain/AuthenticationService';

export default class AuthenticationRepository implements AuthenticationService {
  constructor(private axiosHttp: AxiosHttp) {}

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
