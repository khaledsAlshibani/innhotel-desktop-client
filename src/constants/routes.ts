export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ROOMS: '/rooms',
  GUESTS: '/guests',
} as const;

export type RouteKey = keyof typeof ROUTES;
