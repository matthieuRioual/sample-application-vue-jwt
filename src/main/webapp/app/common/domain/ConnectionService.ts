import { UserDTO } from '@/common/secondary/UserDTO';

export interface ConnectionService {
  login(userCredentialDTO: UserDTO): Promise<string>;
}
