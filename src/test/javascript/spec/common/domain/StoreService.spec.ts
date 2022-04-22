import { setActivePinia, createPinia } from 'pinia';
import { userLoggedInUserStore } from '@/common/domain/StoreService';
import { User } from '@/common/domain/User';

describe('User store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('test set user', () => {
    const store = userLoggedInUserStore();
    expect(store.user).toStrictEqual(new User());
    store.setUser(
      new User(
        'Matthieu',
        '1234567',
        true,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      )
    );
    expect(store.user).toStrictEqual(
      new User(
        'Matthieu',
        '1234567',
        true,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      )
    );
  });

  it('test set error', () => {
    const store = userLoggedInUserStore();
    expect(store.authenticateError).toBe(false);
    store.setError(true);
    expect(store.getError).toBe(true);
  });
  it('test isAuth function', () => {
    const store = userLoggedInUserStore();
    store.setUser(
      new User(
        'Matthieu',
        '1234567',
        true,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      )
    );
    expect(store.isAuth).toBe(true);
  });
});
