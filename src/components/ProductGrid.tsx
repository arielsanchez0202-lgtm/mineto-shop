import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  originalPrice: number;
  offerPrice: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'AirPods Pro 2 - Cancelación de ruido activa',
    originalPrice: 249,
    offerPrice: 199,
  },
  {
    id: 2,
    title: 'Apple Watch Series 9 - GPS',
    originalPrice: 399,
    offerPrice: 349,
  },
  {
    id: 3,
    title: 'Samsung Galaxy Buds2 Pro',
    originalPrice: 189,
    offerPrice: 149,
  },
  {
    id: 4,
    title: 'Sony WH-1000XM5 - Auriculares',
    originalPrice: 349,
    offerPrice: 299,
  },
  {
    id: 5,
    title: 'Garmin Forerunner 265',
    originalPrice: 449,
    offerPrice: 399,
  },
  {
    id: 6,
    title: 'JBL Flip 6 - Portable Speaker',
    originalPrice: 129,
    offerPrice: 99,
  },
];

export default function ProductGrid() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold text-[#0a2540] mb-8">Productos Destacados</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Image Placeholder */}
            <div className="mb-4 h-32 w-full rounded bg-gray-200" />
            
            {/* Product Title */}
            <h4 className="mb-2 text-sm font-semibold text-[#0a2540] line-clamp-2">
              {product.title}
            </h4>
            
            {/* Prices */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-lg font-bold text-[#ff5500]">
                ${product.offerPrice}
              </span>
            </div>
            
            {/* Add Button */}
            <button className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[#0a2540] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0a2540]/80">
              <ShoppingCart className="h-4 w-4" />
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}