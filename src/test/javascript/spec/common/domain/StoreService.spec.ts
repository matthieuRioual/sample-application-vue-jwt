import { setActivePinia, createPinia } from 'pinia';
import { jwtStore } from '@/common/domain/StoreService';

describe('User store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('test set token', () => {
    const store = jwtStore();
    store.setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
    expect(store.token).toStrictEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
  });

  it('test set error', () => {
    const store = jwtStore();
    expect(store.authenticateError).toBe(false);
    store.setError(true);
    expect(store.authenticateError).toBe(true);
  });
  it('test isAuth function', () => {
    const store = jwtStore();
    store.setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
    expect(store.isAuth).toBe(true);
  });
  it('test getter error', () => {
    const store = jwtStore();
    store.setError(true);
    expect(store.getError).toBe(true);
  });
});
