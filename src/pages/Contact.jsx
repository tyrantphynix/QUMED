import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactStrip from '../components/sections/ContactStrip';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <ContactStrip />
      </main>
      <Footer />
    </>
  );
}
