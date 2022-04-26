import { UserCredentialsDTO } from '@/common/domain/User';

export interface ConnectionService {
  login(userCredentialDTO: UserCredentialsDTO): Promise<string>;
}
