import adminAvatar from '@/assets/avatars/admin.webp';
import userAvatar from '@/assets/avatars/user.webp';
import { UserRole } from '@/types/api/user';

export const DEFAULT_AVATARS = {
  [UserRole.Admin]: adminAvatar,
  [UserRole.SuperAdmin]: adminAvatar,
  [UserRole.User]: userAvatar,
} as const;