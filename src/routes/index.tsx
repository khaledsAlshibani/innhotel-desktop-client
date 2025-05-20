import { Routes, Route, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Rooms from '@/pages/Rooms';
import Guests from '@/pages/Guests';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout><Outlet /></MainLayout>}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.ROOMS} element={<Rooms />} />
        <Route path={ROUTES.GUESTS} element={<Guests />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
