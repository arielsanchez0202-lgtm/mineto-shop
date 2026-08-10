'use client';

import { Search, User, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const { items, openCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="sticky top-0 z-50 bg-[#0a2540]">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">Mi Neto Shop</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* User and Cart Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Usuario</span>
            </button>
            <button 
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-full bg-[#ff5500] px-4 py-2 text-white transition-colors hover:bg-[#e64d00]"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#ff5500]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category Bar */}
      <div className="border-t border-white/10">
        <div className="flex gap-6 overflow-x-auto px-4 py-2 scrollbar-hide">
          <a href="#" className="flex-shrink-0 text-sm text-white/80 hover:text-white transition-colors">
            Audio
          </a>
          <a href="#" className="flex-shrink-0 text-sm text-white/80 hover:text-white transition-colors">
            Smartwatches
          </a>
          <a href="#" className="flex-shrink-0 text-sm text-white/80 hover:text-white transition-colors">
            Accesorios
          </a>
          <a href="#" className="flex-shrink-0 text-sm text-[#ff5500] font-semibold hover:text-[#ff6a1a] transition-colors">
            Ofertas
          </a>
        </div>
      </div>
    </div>
  );
}