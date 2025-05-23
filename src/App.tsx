import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toaster position="top-right" richColors />
    </Router>
  );
};

export default App;
