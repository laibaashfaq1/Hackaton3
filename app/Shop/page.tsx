'use client';

import Image from "next/image";
import { GoTrophy } from "react-icons/go";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface MoreProduct {
  _id: string;
  title: string;
  description: string;
  productImage: any;
  price: number;
  tags: string[];
  discountPercentage?: number;
  isNew?: boolean;
  slug: { current: string };
}

const fetchProducts = async () => {
  const products = await client.fetch(
    `*[_type=='product'] | order(_createdAt asc){
      _id, description, title, productImage, discountPercentage, price,
      isNew, tags, slug
    }`
  );
  return products;
};

export default function Shop() {
  const [products, setProducts] = useState<MoreProduct[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  function handleAddToCart(product: MoreProduct): void {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${product.title} has been added to your cart.`);
    } else {
      console.error("Local storage is not available.");
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <Image
          src="/Rectangle 1.png"
          alt="Checkout background"
          width={1440}
          height={316}
          priority
          className="w-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-black text-4xl font-bold">Shop</h1>
          <p className="flex items-center text-gray-600">
            <span>Home</span>
            <IoIosArrowForward />
            <span>Shop</span>
          </p>
        </div>
      </section>

      <Image
        src="/Group 63.png"
        alt="Checkout background"
        width={1440}
        height={316}
        priority
        className="w-full object-cover"
      />

      {/* Product Grid */}
      <section className="p-6 bg-gray-50 mt-10">
        <div className="flex justify-center items-center flex-col mb-8">
          <h3 className="text-3xl font-extrabold text-gray-800 text-center">
            Our Products
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative border rounded-lg bg-white shadow hover:shadow-lg transition transform hover:-translate-y-1 group overflow-hidden"
            >
              {/* NEW Label */}
              {product.isNew && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>
              )}
              {/* Discount Percentage Label */}
              {product.discountPercentage && product.discountPercentage > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discountPercentage}%
                </div>
              )}

              <div className="relative w-full h-52">
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={
                      product.productImage
                        ? urlFor(product.productImage).url()
                        : "/fallback-image.jpg"
                    }
                    alt={product.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </Link>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-800">{product.title}</h4>
                <div className="flex items-center gap-2 mt-2">
                  {product.discountPercentage ? (
                    <>
                      <p className="text-gray-400 line-through text-sm">
                        $ {product.price}
                      </p>
                      <p className="text-black font-bold">
                        ${" "}
                        {(
                          product.price *
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-black font-bold">$ {product.price}</p>
                  )}
                </div>
                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-yellow-500 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
