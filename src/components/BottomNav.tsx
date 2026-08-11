'use client';

import { Home, Search, Heart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Inicio', hasPage: true },
    { href: '/search', icon: Search, label: 'Buscar', hasPage: false },
    { href: '/favorites', icon: Heart, label: 'Favoritos', hasPage: false },
    { href: '/profile', icon: User, label: 'Perfil', hasPage: false },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (!item.hasPage) {
      toast.info('Función próximamente disponible');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          if (item.hasPage) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-[#ff5500]' : 'text-gray-500'
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          }
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-[#ff5500]' : 'text-gray-500'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}