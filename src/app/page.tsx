import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <ProductGrid />
      <Footer />
    </div>
  );
}