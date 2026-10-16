import React from 'react';
import { FashionProvider, useFashion } from './context/FashionContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderDrawer } from './components/OrderDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { LookbookSection } from './components/LookbookSection';
import { BoutiqueSection } from './components/BoutiqueSection';
import { ContactSection } from './components/ContactSection';
import { AdminCMS } from './components/AdminCMS';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useFashion();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'admin' ? (
          <AdminCMS />
        ) : activeView === 'lookbook' ? (
          <div className="py-8">
            <LookbookSection />
          </div>
        ) : activeView === 'boutique' ? (
          <div className="py-8">
            <BoutiqueSection />
          </div>
        ) : activeView === 'contact' ? (
          <div className="py-8">
            <ContactSection />
          </div>
        ) : (
          /* Storefront View */
          <>
            <Hero />
            <ProductCatalog />
            <LookbookSection />
            <BoutiqueSection />
            <ContactSection />
          </>
        )}
      </main>

      {/* Interactive Global Modals & Drawers */}
      <ProductDetailModal />
      <OrderDrawer />
      <OrderConfirmationModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <FashionProvider>
      <AppContent />
    </FashionProvider>
  );
}
