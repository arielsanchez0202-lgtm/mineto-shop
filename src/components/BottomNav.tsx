'use client';

import { Home, Store, MessageCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/#search');
    setTimeout(() => {
      const searchInput = document.getElementById('search-input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around h-16">
        {/* Inicio */}
        <Link
          href="/#catalogo"
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            pathname === '/' ? 'text-[#ff5500]' : 'text-gray-500'
          }`}
        >
          <Home className="h-6 w-6 mb-1" />
          <span className="text-xs">Inicio</span>
        </Link>

        {/* Catálogo */}
        <Link
          href="/#catalogo"
          className="flex flex-col items-center justify-center flex-1 h-full transition-colors text-gray-500 hover:text-[#ff5500]"
        >
          <Store className="h-6 w-6 mb-1" />
          <span className="text-xs">Catálogo</span>
        </Link>

        {/* Buscar */}
        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center flex-1 h-full transition-colors text-gray-500 hover:text-[#ff5500]"
        >
          <Search className="h-6 w-6 mb-1" />
          <span className="text-xs">Buscar</span>
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/51989090122"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 h-full transition-colors text-gray-500 hover:text-[#25D366]"
        >
          <MessageCircle className="h-6 w-6 mb-1" />
          <span className="text-xs">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}