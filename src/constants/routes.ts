export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ROOMS: '/rooms',
  GUESTS: '/guests',
  REGISTER_EMPLOYEE: '/employees/register',
  BRANCHES: '/branches',
  ADD_BRANCH: '/branches/add',
  ADD_ROOM: '/rooms/add',
  RESERVATIONS: '/reservations',
  ADD_RESERVATION: '/reservations/add'
} as const;

export type RouteKey = keyof typeof ROUTES;
