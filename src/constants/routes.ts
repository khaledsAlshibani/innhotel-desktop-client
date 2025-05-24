export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ROOMS: '/rooms',
  GUESTS: '/guests',
  REGISTER_GUEST: '/guests/register',
  GUEST_DETAILS: '/guests/:id',
  EMPLOYEES: '/employees',
  REGISTER_EMPLOYEE: '/employees/register',
  BRANCHES: '/branches',
  ADD_BRANCH: '/branches/add',
  BRANCH_DETAILS: '/branches/:id',
  ADD_ROOM: '/rooms/add',
  ROOM_DETAILS: '/rooms/:id',
  RESERVATIONS: '/reservations',
  ADD_RESERVATION: '/reservations/add',
  SERVICES: '/services',
  ADD_SERVICE: '/services/add'
} as const;

export type RouteKey = keyof typeof ROUTES;
