import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import TrustStrip from '../components/sections/TrustStrip';
import AboutSnapshot from '../components/sections/AboutSnapshot';
import ProductCategories from '../components/sections/ProductCategories';
import CertificationsSection from '../components/sections/CertificationsSection';
import ManufacturingSection from '../components/sections/ManufacturingSection';
import CoreValues from '../components/sections/CoreValues';
import ContactStrip from '../components/sections/ContactStrip';
import TubeOverlay from '../components/tube/TubeOverlay';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative' }}>
        <TubeOverlay />
        <Hero />
        <TrustStrip />
        <AboutSnapshot />
        <ProductCategories />
        <CertificationsSection />
        <ManufacturingSection />
        <CoreValues />
        <ContactStrip />
      </main>
      <Footer />
    </>
  );
}
