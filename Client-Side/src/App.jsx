import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import ScrollTop from '@/components/ScrollTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <ScrollTop />
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;