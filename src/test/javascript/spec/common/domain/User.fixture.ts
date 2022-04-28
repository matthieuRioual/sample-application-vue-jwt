import { User } from '@/common/domain/User';

export const createUser = (user?: Partial<User>): User => ({
  username: 'randomUSername',
  id: '1234567890',
  role: 'ADMIN',
  ...user,
});
