import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <Toaster position="top-right" richColors />
    </Router>
  );
};

export default App;
