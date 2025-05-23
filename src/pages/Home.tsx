import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const Home = () => {
  return <Navigate to={ROUTES.ROOMS} replace />;
};

export default Home;
