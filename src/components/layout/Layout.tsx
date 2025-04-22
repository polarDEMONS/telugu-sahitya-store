
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from './Header';
import Footer from './Footer';
import MobileNavbar from './MobileNavbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@ataka.com';
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    console.log("Layout component mounted", { 
      path: location.pathname,
      isAdmin,
      isAdminRoute
    });
  }, [location.pathname, isAdmin]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      {!isAdminRoute && <MobileNavbar />}
      <Footer />
    </div>
  );
};

export default Layout;
