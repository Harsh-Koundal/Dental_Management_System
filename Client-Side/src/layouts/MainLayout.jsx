import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '@/components/landingpage/Header.jsx';
import Footer from '@/components/landingpage/Footer';

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = pathname === '/' ? 'hero' : pathname.replace('/', '');
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;