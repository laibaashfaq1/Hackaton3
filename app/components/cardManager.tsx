import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';

interface Product {
  _id: string;
  title: string;
  description: string;
  productImage: string;
  price: number;
  tags: string[];
  discountPercentage?: number;
  isNew?: boolean;
  slug: any;
}

const getProducts = async () => {
  const product = await client.fetch(
    `*[_type=='product'][0..5]{
      _id,
      title,
      description,
      price,
      productImage,
      tags,
      discountPercentage,
      isNew
    }`
  );
  return product;
};

export default function CardManager({ product }: { product: Product }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  function handleAddToCart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    
    if (product) {
      // Check if the product is already in the cart
      const isProductInCart = cart.some((cartItem) => cartItem._id === product._id);

      if (isProductInCart) {
        console.log(`Product "${product.title}" is already in the cart.`);
      } else {
        setCart((prevCart) => [...prevCart, product]);
        console.log(`Product "${product.title}" added to the cart.`);
      }
    } else {
      console.error("Product is not available to add to cart.");
    }
  }

  const handleRemoveFromCart = (product_id: string) => {
    const newData = cart.filter((item: Product) => item._id !== product_id);
    setCart(newData);
    console.log("Removed product with ID:", product_id);
  };

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <section className="p-6 bg-gray-50 mt-20">
      {/* Centered Header */}
      <div className="flex justify-center items-center flex-col mb-8">
        <h3 className="text-3xl font-extrabold text-gray-800 text-center">
          Our Products
        </h3>
      </div>

      {/* Products Grid */}
      <div className="display grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Single Product Card */}
        <div className="relative border rounded-lg bg-white shadow hover:shadow-lg transition transform hover:-translate-y-1 group overflow-hidden">
          {/* Labels */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              New
            </div>
          )}
          {product.discountPercentage !== undefined && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discountPercentage}% off
            </div>
          )}

          {/* Product Image */}
          {/* Link Card to SingleProduct Detail */}
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.productImage ? urlFor(product.productImage).url() : "/fallback-image.jpg"} // Add fallback URL
              alt={product.title}
              className="w-full h-44 object-contain rounded-md"
              width={300}
              height={200}
            />
          </Link>

          {/* Product Name */}
          <h4 className="mt-4 font-semibold text-gray-800 ml-4">{product.title}</h4>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2 ml-4 mb-4">
            <p className="text-green-800 font-semibold text-sm">$ {product.price}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-yellow-500 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Show More Button */}
      <div className="text-center mt-8">
        <Link
          href="/Shop"
          className="px-6 py-3 font-bold rounded border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition"
        >
          Show More
        </Link>
      </div>
    </section>
  );
}
