import sinon, { SinonStub } from 'sinon';
import { AuthenticationService } from '@/common/domain/AuthenticationService';

export interface AuthenticationServiceFixture extends AuthenticationService {
  login: SinonStub;
}

export const stubAuthenticationService = (): AuthenticationServiceFixture => ({
  login: sinon.stub(),
});
