import { setActivePinia, createPinia, StoreDefinition } from 'pinia';
import { jwtStore } from '@/common/domain/JWTStoreService';

describe('Test JWT store', () => {
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = jwtStore();
  });

  it('test set token', () => {
    store.setToken(TOKEN);
    expect(store.token).toStrictEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
  });

  it('test isAuth function', () => {
    store.setToken(TOKEN);
    expect(store.isAuth).toBe(true);
  });
});
