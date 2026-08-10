import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <ProductGrid />
      <Footer />
      <CartSidebar />
    </div>
  );
}