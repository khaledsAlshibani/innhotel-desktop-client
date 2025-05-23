import { Routes, Route, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import MainLayout from '@/layouts/MainLayout';
import AppLayout from '@/layouts/AppLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Rooms from '@/pages/Rooms';
import AddRoom from '@/pages/AddRoom';
import Guests from '@/pages/Guests';
import RegisterEmployee from '@/pages/RegisterEmployee';
import Employees from '@/pages/Employees';
import Branches from '@/pages/Branches';
import AddBranch from '@/pages/AddBranch';
import Reservations from '@/pages/Reservations';
import AddReservation from '@/pages/AddReservation';
import BranchDetails from '@/pages/BranchDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout><Outlet /></MainLayout>}>
        <Route index element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>

      <Route path={ROUTES.HOME} element={<AppLayout><Outlet /></AppLayout>}>
        <Route path={ROUTES.ROOMS} element={<Rooms />} />
        <Route path={ROUTES.ADD_ROOM} element={<AddRoom />} />
        <Route path={ROUTES.GUESTS} element={<Guests />} />
        <Route path={ROUTES.EMPLOYEES} element={<Employees />} />
        <Route path={ROUTES.REGISTER_EMPLOYEE} element={<RegisterEmployee />} />
        <Route path={ROUTES.BRANCHES} element={<Branches />} />
        <Route path={ROUTES.ADD_BRANCH} element={<AddBranch />} />
        <Route path={ROUTES.RESERVATIONS} element={<Reservations />} />
        <Route path={ROUTES.ADD_RESERVATION} element={<AddReservation />} />
        <Route path={ROUTES.BRANCH_DETAILS} element={<BranchDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
