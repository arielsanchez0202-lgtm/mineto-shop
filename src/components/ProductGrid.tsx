'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { client } from '@/sanity/lib/client';
import { PRODUCTS_QUERY } from '@/sanity/queries';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { toast } from 'sonner';

const builder = createImageUrlBuilder(client);

function urlFor(source: Image) {
  return builder.image(source);
}

interface Product {
  _id: string;
  title: string;
  normalPrice: number;
  offerPrice: number;
  image?: Image;
  description?: string;
  gallery?: Image[];
  rating?: number;
  reviewsCount?: number;
  features?: string[];
  inStock?: boolean;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch<Product[]>(PRODUCTS_QUERY);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product._id,
      title: product.title,
      offerPrice: product.offerPrice,
    });
    const updatedItems = useCartStore.getState().items;
    const newSubtotal = updatedItems.reduce((sum, item) => sum + item.offerPrice * item.quantity, 0);
    toast.success(`✅ Agregado. Subtotal actual: $${newSubtotal.toFixed(2)}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-[#0a2540] mb-8">Productos Destacados</h3>
        <div className="flex items-center justify-center">
          <p className="text-gray-500">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-[#0a2540] mb-8">Productos Destacados</h3>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
          <p className="text-lg text-gray-600 mb-2">No hay productos disponibles</p>
          <p className="text-sm text-gray-500">Agrega productos desde el Sanity Studio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold text-[#0a2540] mb-8">Productos Destacados</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <Link href={`/product/${product._id}`} className="block">
              {/* Image */}
              {product.image ? (
                <div className="mb-4 h-32 w-full overflow-hidden rounded bg-gray-100">
                  <img
                    src={urlFor(product.image).width(300).height(200).url()}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 h-32 w-full rounded bg-gray-200" />
              )}
              
              {/* Product Title */}
              <h4 className="mb-2 text-sm font-semibold text-[#0a2540] line-clamp-2">
                {product.title}
              </h4>
              
              {/* Prices */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  ${product.normalPrice}
                </span>
                <span className="text-lg font-bold text-[#ff5500]">
                  ${product.offerPrice}
                </span>
              </div>
            </Link>
            
            {/* Add Button */}
            <button 
              onClick={(e) => handleAddToCart(e, product)}
              className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[#0a2540] px-4 py-3 min-h-[44px] text-sm font-semibold text-white transition-colors hover:bg-[#0a2540]/80 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}