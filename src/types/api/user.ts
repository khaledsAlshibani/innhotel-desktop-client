export const UserRole = {
  SuperAdmin: 'SuperAdmin',
  Admin: 'Admin',
  User: 'User'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];