import { UserCredentialsDTO } from '@/common/domain/User';

describe('Initialization UserCredentialDTO', () => {
  it('UserCredentialsDTO constructor', () => {
    const UserCredential = new UserCredentialsDTO('username', 'password', true);
    expect(UserCredential.username).toBe('username');
    expect(UserCredential.password).toBe('password');
    expect(UserCredential.rememberMe).toBe(true);
  });
});
