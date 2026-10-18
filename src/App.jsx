import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home         from './pages/Home';
import Products     from './pages/Products';
import About        from './pages/About';
import Certificates from './pages/Certificates';
import Contact      from './pages/Contact';
import Preloader    from './components/ui/Preloader';
import './styles/index.css';
import './styles/animations.css';

const PAGE_TITLES = {
  '/': 'Qu-med Disposable — Medical Device Manufacturer, Gurugram',
  '/products': 'Medical Devices & Disposable Products — Qu-med Disposable',
  '/about': 'About Us & Manufacturing Plant — Qu-med Disposable',
  '/certificates': 'ISO 13485:2016 & CE Certifications — Qu-med Disposable',
  '/contact': 'Contact Us & Bulk Supply Enquiries — Qu-med Disposable',
};

// Automatically scrolls to top on hard reload & route transitions, updates page titles
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = PAGE_TITLES[pathname] || 'Qu-med Disposable — Medical Device Manufacturer';
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    // Ensure initial landing on top on hard refresh
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <BrowserRouter>
      <Preloader />
      <ScrollToTop />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/products"      element={<Products />} />
        <Route path="/about"         element={<About />} />
        <Route path="/certificates"  element={<Certificates />} />
        <Route path="/contact"       element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
