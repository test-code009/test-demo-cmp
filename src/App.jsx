import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-base-black flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary-red/30 border-t-primary-red animate-spin" />
    </div>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-black">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produkti" element={<Products />} />
            <Route path="/produkti/:slug" element={<ProductDetail />} />
            <Route path="/par-mums" element={<About />} />
            <Route path="/kontakti" element={<Contact />} />
            <Route path="/privatuma-politika" element={<PrivacyPolicy />} />
            <Route path="/lietosanas-noteikumi" element={<TermsOfService />} />
            <Route path="/sikdatnu-politika" element={<CookiePolicy />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </LanguageProvider>
  );
}
