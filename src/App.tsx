import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes';
import { AuthProvider } from '@/context/AuthProvider';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toaster position="top-center" richColors />
    </Router>
  );
};

export default App;
