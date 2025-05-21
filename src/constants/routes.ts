export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ROOMS: '/rooms',
  GUESTS: '/guests',
  REGISTER_EMPLOYEE: '/register-employee'
} as const;

export type RouteKey = keyof typeof ROUTES;
