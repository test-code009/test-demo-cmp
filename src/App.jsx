import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense, Component } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-black flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-soft-grey/40 text-sm uppercase tracking-widest mb-4">Kļūda ielādējoties</p>
            <a href="/produkti" className="text-primary-red text-sm hover:underline">← Atpakaļ uz produktiem</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Gallery = lazy(() => import('./pages/Gallery'));

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
        <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produkti" element={<Products />} />
            <Route path="/galerija" element={<Gallery />} />
            <Route path="/produkti/:slug" element={<ProductDetail />} />
            <Route path="/par-mums" element={<About />} />
            <Route path="/kontakti" element={<Contact />} />
            <Route path="/privatuma-politika" element={<PrivacyPolicy />} />
            <Route path="/lietosanas-noteikumi" element={<TermsOfService />} />
            <Route path="/sikdatnu-politika" element={<CookiePolicy />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
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
