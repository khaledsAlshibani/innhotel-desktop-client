export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ROOMS: '/rooms',
  GUESTS: '/guests',
  ADD_GUEST: '/guests/add',
  GUEST_DETAILS: '/guests/:id',
  EMPLOYEES: '/employees',
  EMPLOYEE_DETAILS: '/employees/:id',
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
