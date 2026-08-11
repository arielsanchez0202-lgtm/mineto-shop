'use client';

import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const { items, openCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="sticky top-0 z-50 bg-[#0a2540] shadow-md">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo y Nombre Bacán */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="Logo Mi Neto Shop" 
              className="h-11 w-11 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-[#ff5500]/80 shadow-[0_0_10px_rgba(255,85,0,0.4)]" 
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ff5500]">
                MI NETO
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#ffaa00] uppercase tracking-[0.2em] -mt-1">
                Shop
              </span>
            </div>
          </Link>

          {/* Search Bar - Oculto en móviles */}
          <div className="hidden md:block flex-1 max-w-2xl ml-4">
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
            {/* Botón Usuario - Oculto en móviles */}
            <button className="hidden md:flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
              <User className="h-5 w-5" />
              <span className="text-sm">Usuario</span>
            </button>
            
            {/* Botón Carrito */}
            <button 
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7700] p-2 sm:px-4 sm:py-2 text-white transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-semibold">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#ff5500] shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Category Bar */}
      <div className="border-t border-white/10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-4 py-2 min-w-max">
          <Link href="/?categoria=audio" className="text-sm text-white/80 hover:text-white transition-colors">
            Audio
          </Link>
          <Link href="/?categoria=smartwatches" className="text-sm text-white/80 hover:text-white transition-colors">
            Smartwatches
          </Link>
          <Link href="/?categoria=accesorios" className="text-sm text-white/80 hover:text-white transition-colors">
            Accesorios
          </Link>
          <Link href="/?categoria=ofertas" className="text-sm text-[#ffaa00] font-bold hover:text-[#ffcc00] transition-colors">
            Ofertas 🔥
          </Link>
        </div>
      </div>
    </div>
  );
}