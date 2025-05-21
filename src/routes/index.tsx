import { Routes, Route, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import MainLayout from '@/layouts/MainLayout';
import AppLayout from '@/layouts/AppLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Rooms from '@/pages/Rooms';
import Guests from '@/pages/Guests';
import RegisterEmployee from '@/pages/RegisterEmployee';
import Branches from '@/pages/Branches';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout><Outlet /></MainLayout>}>
        <Route index element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>

      <Route path={ROUTES.HOME} element={<AppLayout><Outlet /></AppLayout>}>
        <Route path={ROUTES.ROOMS} element={<Rooms />} />
        <Route path={ROUTES.GUESTS} element={<Guests />} />
        <Route path={ROUTES.REGISTER_EMPLOYEE} element={<RegisterEmployee />} />
        <Route path={ROUTES.BRANCHES} element={<Branches />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
