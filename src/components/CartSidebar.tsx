'use client';

import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
  const shippingCost = 0; // Envío calculado por WhatsApp
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    const phoneNumber = '51989090122';
    
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const message = items
      .map((item) => `${item.quantity}x ${item.title} (S/ ${(item.offerPrice * item.quantity).toFixed(2)})`)
      .join('\n');
    
    const finalMessage = `Hola, quiero pedir:\n${message}\n\nTotal: S/ ${total.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-white shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold text-[#0a2540]">Carrito de Compras</h2>
          <button 
            onClick={closeCart}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        
        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-lg">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 p-4"
                >
                  {/* Product Image */}
                  <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                        IMG
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#0a2540] text-sm line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base font-bold text-[#ff5500]">
                      S/ {item.offerPrice.toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-full bg-slate-200 p-2 min-h-[44px] min-w-[44px] hover:bg-slate-300 active:bg-slate-400 transition-colors flex items-center justify-center"
                      >
                        <Minus className="h-4 w-4 text-[#0a2540]" />
                      </button>
                      <span className="w-8 text-center font-semibold text-[#0a2540]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-full bg-slate-200 p-2 min-h-[44px] min-w-[44px] hover:bg-slate-300 active:bg-slate-400 transition-colors flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 text-[#0a2540]" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4 pb-6">
            {/* Price Breakdown */}
            <div className="flex justify-between text-lg font-bold pt-2">
              <span className="text-[#0a2540]">Total</span>
              <span className="text-[#ff5500]">S/ {total.toFixed(2)}</span>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleCheckout}
              className="w-full rounded-full bg-[#25D366] py-3 text-lg font-semibold text-white transition-colors hover:bg-[#20b857] flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Comprar vía WhatsApp
            </button>
            <p className="text-center text-sm text-gray-600">Aceptamos Yape 🟣</p>
          </div>
        )}
      </div>
    </div>
  );
}