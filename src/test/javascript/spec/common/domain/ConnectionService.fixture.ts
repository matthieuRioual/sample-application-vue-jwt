import sinon, { SinonStub } from 'sinon';
import { ConnectionService } from '@/common/domain/ConnectionService';

export interface ConnectionServiceFixture extends ConnectionService {
  login: SinonStub;
}

export const stubConnectionService = (): ConnectionServiceFixture => ({
  login: sinon.stub(),
});
