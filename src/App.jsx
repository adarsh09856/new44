import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { ContactAgentModal } from './components/ContactAgentModal';
import { LoanCalculatorModal } from './components/LoanCalculatorModal';
import { BackToTop } from './components/BackToTop';

// Pages
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
import { CRMPage } from './pages/CRMPage';

const AppContent = () => {
  const { activePage, user } = useApp();

  const renderActivePage = () => {
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
      case 'crm':
        return user ? <CRMPage /> : <HomePage />;
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
      {/* Top Header */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Floating Modals & Overlays */}
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
