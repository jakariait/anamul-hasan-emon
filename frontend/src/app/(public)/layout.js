import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GTMPageView from "@/components/GTMPageView";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function PublicLayout({ children }) {
  return (
    <>
      <GTMPageView />
      <Navbar />
      {children}
      <ScrollToTop />
      <WhatsAppButton />
      <Footer />
    </>
  );
}
