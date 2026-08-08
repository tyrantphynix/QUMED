import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home         from './pages/Home';
import Products     from './pages/Products';
import About        from './pages/About';
import Certificates from './pages/Certificates';
import Contact      from './pages/Contact';
import './styles/index.css';
import './styles/animations.css';

export default function App() {
  return (
    <BrowserRouter>
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
