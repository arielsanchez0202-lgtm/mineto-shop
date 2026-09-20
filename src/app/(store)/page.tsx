import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      <Hero />
      <SearchBar />
      <div id="catalogo">
        <ProductGrid categoria={params.categoria} searchQuery={params.q} />
      </div>
      <Footer />
    </div>
  );
}