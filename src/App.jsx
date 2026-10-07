import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home         from './pages/Home';
import Products     from './pages/Products';
import About        from './pages/About';
import Certificates from './pages/Certificates';
import Contact      from './pages/Contact';
import './styles/index.css';
import './styles/animations.css';

// Automatically scrolls to top whenever the URL path changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
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
