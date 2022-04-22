import { User } from '@/common/domain/User';
import { UserCredentialsDTO } from '@/common/domain/User';

describe('Initialization of User and UserCredentialDTO', () => {
  it('User constructor', () => {
    const testingUser = new User(
      'Matthieu',
      '1234567',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
    expect(testingUser.username).toBe('Matthieu');
    const UserCredential = new UserCredentialsDTO('username', 'password');
    expect(UserCredential.username).toBe('username');
    expect(UserCredential.password).toBe('password');
  });
});
