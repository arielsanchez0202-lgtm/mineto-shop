'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import CartSidebar from './CartSidebar';

export default function ClientNavs({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  // Si estamos en Sanity, devolvemos solo el contenido sin menús
  if (isStudio) {
    return <>{children}</>;
  }

  // Si estamos en la tienda, cargamos toda la interfaz
  return (
    <>
      <Navbar />
      {children}
      <CartSidebar />
      <BottomNav />
    </>
  );
}