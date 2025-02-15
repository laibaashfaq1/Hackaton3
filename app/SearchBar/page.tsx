'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from '@/app/components/SearchBar';
import Link from 'next/link';
import Image from 'next/image';

// Define Product Type
type Product = {
  _id: string;
  title: string;
  price: number;
  productImage?: string; // Image URL from API
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://template6-six.vercel.app/api/products');
        const data = await response.json();

        console.log("Fetched Products:", data); // ✅ Debug API Response
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response: Not an array");
        }

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Handle Search (Filter API Data)
  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setFilteredProducts([]); // No products should be shown initially
      return;
    }

    console.log("Searching for:", trimmedQuery);
    console.log("Current Products:", products);

    const filtered = products.filter((product) =>
      product?.title?.toLowerCase().includes(trimmedQuery)
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Search API Products</h1>
      
      {/* ✅ Left-Aligned Search Bar */}
      <div className="w-full md:w-auto">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* ✅ Show Loader If Fetching */}
      {loading && <p className="mt-6 text-gray-500">Loading products...</p>}

      {/* ✅ Show Filtered Products ONLY AFTER SEARCH */}
      {filteredProducts.length > 0 ? (
        <div className="mt-6 w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product._id || index} className="bg-white shadow-lg rounded-lg p-4">
                
                {/* ✅ Display Image ONLY if Available */}
                {product.productImage ? (
                  <Image
                    src={product.productImage}
                    alt={product.title || "Product Image"}
                    width={160}
                    height={160}
                    className="w-full h-40 object-contain mb-4"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">No image available</p>
                )}

                <Link href={`/product/${product._id}`}>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                </Link>
                <p className="text-blue-600 font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && <p className="text-gray-500 mt-4">Search for a product...</p>
      )}
    </div>
  );
};

export default Page;
