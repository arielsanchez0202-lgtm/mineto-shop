import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { PRODUCT_BY_ID_QUERY, RELATED_PRODUCTS_QUERY } from '@/sanity/queries';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import ProductDetailClient from '@/app/product/[id]/ProductDetailClient';

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
  gallery?: Image[];
  description?: string;
  rating?: number;
  reviewsCount?: number;
  features?: string[];
  inStock?: boolean;
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  try {
    const product = await client.fetch<Product>(PRODUCT_BY_ID_QUERY, { id });

    if (!product) {
      return (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
            <p className="text-lg text-gray-600 mb-2">Producto no encontrado</p>
            <Link href="/" className="text-[#ff5500] hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      );
    }

    const imageUrl = product.image ? urlFor(product.image).width(600).height(600).url() : null;
    const galleryUrls = product.gallery 
      ? product.gallery.map(img => urlFor(img).width(600).height(600).url())
      : [];

    // Fetch related products
    const relatedProducts = await client.fetch<Product[]>(RELATED_PRODUCTS_QUERY, { currentId: id });
    const relatedProductsWithImages = relatedProducts.map(prod => ({
      ...prod,
      imageUrl: prod.image ? urlFor(prod.image).width(300).height(300).url() : null,
      gallery: prod.gallery ? prod.gallery.map(img => urlFor(img).width(300).height(300).url()) : [],
    }));

    return (
      <ProductDetailClient 
        product={{
          ...product,
          gallery: galleryUrls.length > 0 ? galleryUrls : (imageUrl ? [imageUrl] : []),
        }}
        imageUrl={imageUrl}
        relatedProducts={relatedProductsWithImages}
      />
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
          <p className="text-lg text-gray-600 mb-2">Error al cargar el producto</p>
          <Link href="/" className="text-[#ff5500] hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }
}