'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Star, ChevronDown, ChevronUp, Truck, Shield, DollarSign } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import Image from 'next/image';

interface Product {
  _id: string;
  title: string;
  normalPrice: number;
  offerPrice: number;
  description?: string;
  gallery?: string[];
  rating?: number;
  reviewsCount?: number;
  features?: string[];
  inStock?: boolean;
  imageUrl?: string | null;
}

interface ProductDetailClientProps {
  product: Product;
  imageUrl: string | null;
  relatedProducts?: Product[];
}

export default function ProductDetailClient({ product, imageUrl, relatedProducts = [] }: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const images = [
    imageUrl,
    ...(product.gallery || [])
  ].filter((img): img is string => img !== null && img !== undefined && img !== '');

  const savings = product.normalPrice - product.offerPrice;
  const ratingStars = product.rating ? Math.round(product.rating) : 0;

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      title: product.title,
      offerPrice: product.offerPrice,
    });
    const updatedItems = useCartStore.getState().items;
    const newSubtotal = updatedItems.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
    toast.success(`✅ Agregado. Subtotal actual: $${newSubtotal.toFixed(2)}`);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < ratingStars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 min-h-[44px] text-sm font-semibold text-[#0a2540] shadow-sm hover:text-[#ff5500] hover:border-[#ff5500]/50 transition-all mb-6 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </button>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center aspect-square">
              {images.length > 0 ? (
                <img
                  src={images[currentImageIndex]}
                  alt={`${product.title} - Imagen ${currentImageIndex + 1}`}
                  className="max-w-full h-auto object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Sin imagen</p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-[#ff5500]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col space-y-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#0a2540]">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars()}</div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewsCount || 0} opiniones)
                </span>
              </div>
            )}

            {/* Prices */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xl text-gray-400 line-through">
                  ${product.normalPrice}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-[#ff5500]">
                  ${product.offerPrice}
                </span>
              </div>
              {savings > 0 && (
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Ahorras ${savings}
                </span>
              )}
            </div>

            {/* Trust Section */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-[#0a2540]" />
                <span className="text-sm text-gray-700">Envío a todo el país</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-[#0a2540]" />
                <span className="text-sm text-gray-700">Compra Segura</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-[#0a2540]" />
                <span className="text-sm text-gray-700">Pago contra entrega / Yape</span>
              </div>
            </div>

            {/* Description Accordion */}
            {product.description && (
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-t-lg"
                >
                  <span className="font-semibold text-[#0a2540]">Descripción</span>
                  {isDescriptionOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {isDescriptionOpen && (
                  <div className="p-4 bg-gray-50 rounded-b-lg">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Features Accordion */}
            {product.features && product.features.length > 0 && (
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-t-lg"
                >
                  <span className="font-semibold text-[#0a2540]">Características</span>
                  {isFeaturesOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {isFeaturesOpen && (
                  <div className="p-4 bg-gray-50 rounded-b-lg">
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <span className="text-[#ff5500] mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Stock Status */}
            {product.inStock !== undefined && (
              <div className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ En stock' : '✗ Agotado'}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#0a2540] mb-6">También te podría interesar</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/product/${relatedProduct._id}`}
                  className="flex-shrink-0 w-48 bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {relatedProduct.imageUrl ? (
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Imagen</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#0a2540] text-sm line-clamp-2 mb-2">
                    {relatedProduct.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">
                      ${relatedProduct.normalPrice}
                    </span>
                    <span className="text-lg font-bold text-[#ff5500]">
                      ${relatedProduct.offerPrice}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar (Mobile Only) */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Precio</p>
            <p className="text-xl font-bold text-[#ff5500]">${product.offerPrice}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#ff5500] text-white py-3 min-h-[44px] rounded-full font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingCart className="h-5 w-5" />
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}