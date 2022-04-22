import { User, UserCredentialsDTO } from '@/common/domain/User';
import { AxiosHttp } from '@/http/AxiosHttp';
import { ConnectionService } from '@/common/domain/ConnectionService';

export default class ConnectionRepository implements ConnectionService {
  constructor(private axiosHttp: AxiosHttp) {}

  async login(userCredentialDTO: UserCredentialsDTO): Promise<User> {
    return await this.axiosHttp.post<any, UserCredentialsDTO>('/api/authenticate', userCredentialDTO).then(result => {
      const bearerToken = result.headers.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        return new User(userCredentialDTO.username, result.data.id, jwt);
      } else {
        return new User();
      }
    });
  }
}
