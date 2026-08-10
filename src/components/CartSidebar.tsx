'use client';

import { X, Plus, Minus, Trash2, MessageCircle, Truck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
  const freeShippingThreshold = 200; // Umbral para envío gratis
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = remainingForFreeShipping > 0 ? 15 : 0; // Costo de envío normal
  const total = subtotal + shippingCost;
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    const phoneNumber = '51999999999'; // Placeholder - reemplazar con número real
    
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const message = items
      .map((item) => `${item.quantity}x ${item.title} ($${item.offerPrice * item.quantity})`)
      .join('\n');
    
    const finalMessage = `Hola, quiero pedir:\n${message}\n\nSubtotal: $${subtotal}\nEnvío: ${shippingCost === 0 ? 'Gratis' : `$${shippingCost}`}\nTotal: $${total}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="relative h-full w-full max-w-md bg-white shadow-xl flex flex-col">
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
                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0a2540] text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-[#ff5500]">
                      ${item.offerPrice}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-full bg-gray-100 p-1 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
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
          <div className="border-t p-4 space-y-4">
            {/* Free Shipping Progress */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-[#0a2540]" />
                <span className="text-sm font-medium text-[#0a2540]">
                  {remainingForFreeShipping > 0 
                    ? `Te faltan $${remainingForFreeShipping.toFixed(2)} para envío gratis`
                    : '¡Envío gratis!'
                  }
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                  {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span className="text-[#0a2540]">Total</span>
                <span className="text-[#ff5500]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleCheckout}
              className="w-full rounded-full bg-[#25D366] py-3 text-lg font-semibold text-white transition-colors hover:bg-[#20b857] flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Comprar vía WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}