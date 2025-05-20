export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
} as const;

export type RouteKey = keyof typeof ROUTES;
