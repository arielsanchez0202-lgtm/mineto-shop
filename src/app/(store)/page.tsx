import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      <Hero />
      <div id="catalogo">
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
}