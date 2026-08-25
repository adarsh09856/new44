import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { ContactAgentModal } from './components/ContactAgentModal';
import { LoanCalculatorModal } from './components/LoanCalculatorModal';
import { BackToTop } from './components/BackToTop';
import { CompareDrawer } from './components/CompareDrawer';
import { TashiAIChatModal } from './components/TashiAIChatModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { AgentsPage } from './pages/AgentsPage';
import { ListPropertyPage } from './pages/ListPropertyPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { CalculatorPage } from './pages/CalculatorPage';

// Admin / Staff Workspace
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StaffLoginPortal } from './components/admin/StaffLoginPortal';

const AppContent = () => {
  const { activePage, user, setUser, navigateTo } = useApp();

  // Listen for direct URL hashtag navigation (e.g. https://domain.com/#/admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/admin' || window.location.hash === '#admin') {
        navigateTo('admin');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigateTo]);

  // Check if current user possesses verified staff/broker administrative authority
  const isStaff = user && (
    ['super_admin', 'admin', 'broker', 'agent', 'editor'].includes(user.role) ||
    user.permissions?.includes('dashboard:read')
  );

  // -------------------------------------------------------------
  // ISOLATED INTERNAL STAFF & CRM WORKSPACE (Unlisted Direct Route)
  // -------------------------------------------------------------
  if (activePage === 'admin' || activePage === 'crm') {
    if (!isStaff) {
      return (
        <>
          <StaffLoginPortal
            onLoginSuccess={(staffUser) => {
              setUser(staffUser);
            }}
            onBackToPublic={() => {
              window.location.hash = '';
              navigateTo('home');
            }}
          />
          <ToastContainer />
        </>
      );
    }

    return (
      <div className="min-h-screen bg-[#F4F6F9]">
        <AdminDashboard
          onExitAdmin={() => {
            window.location.hash = '';
            navigateTo('home');
          }}
        />
        <ToastContainer />
      </div>
    );
  }

  // -------------------------------------------------------------
  // PUBLIC-FACING CUSTOMER MARKETPLACE (Zero Admin Links)
  // -------------------------------------------------------------
  const renderActivePublicPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'properties':
        return <PropertiesPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'vehicles':
        return <VehiclesPage />;
      case 'vehicle-detail':
        return <VehicleDetailPage />;
      case 'agents':
        return <AgentsPage />;
      case 'list-property':
        return <ListPropertyPage />;
      case 'dashboard':
        return user ? <DashboardPage /> : <HomePage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactPage />;
      case 'calculator':
        return <CalculatorPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAF7] font-sans antialiased text-slate-900 selection:bg-[#9e1b27] selection:text-white">
      {/* 1. Public Top Header (100% Clean, No Admin References) */}
      <Header />

      {/* 2. Main Routed Public Page */}
      <main className="flex-1">
        {renderActivePublicPage()}
      </main>

      {/* 3. Public Footer */}
      <Footer />

      {/* 4. Floating Customer Tools */}
      <BackToTop />
      <TashiAIChatModal />
      <CompareDrawer />

      {/* 5. Customer Modals (Inquiry, Booking, Auth for Buyers) */}
      <AuthModal />
      <ScheduleTourModal />
      <ContactAgentModal />
      <LoanCalculatorModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
