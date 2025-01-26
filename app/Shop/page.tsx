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
import { useCart } from "../Cart/context/CartContext";

interface MoreProduct {
  _id: string;
  title: string;
  description: string;
  productImage: any; // Updated to `any` for Sanity Image Source compatibility
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
  const { addToCart } = useCart();
  const [selectedColor] = useState<string>("");
  const [selectedSize] = useState<string>("");

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

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
                    fill
                    style={{ objectFit: "contain" }}
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
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      heading: product.title,
                      price: product.price,
                      image: urlFor(product.productImage).url(),
                      quantity: 1,
                      selectedColor: selectedColor,
                      selectedSize: selectedSize,
                    })
                  }
                  className="w-full py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-yellow-500 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-100 py-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <GoTrophy size={40} className="mx-auto text-gray-800" />
            <h4 className="font-bold text-gray-800">High Quality</h4>
            <p className="text-gray-600 text-sm">Crafted from top materials</p>
          </div>
          <div>
            <AiOutlineSafetyCertificate
              size={40}
              className="mx-auto text-gray-800"
            />
            <h4 className="font-bold text-gray-800">Warranty Protection</h4>
            <p className="text-gray-600 text-sm">Over 2 years</p>
          </div>
          <div>
            <MdOutlineLocalShipping
              size={40}
              className="mx-auto text-gray-800"
            />
            <h4 className="font-bold text-gray-800">Free Shipping</h4>
            <p className="text-gray-600 text-sm">Orders over $50</p>
          </div>
          <div>
            <RiCustomerService2Line
              size={40}
              className="mx-auto text-gray-800"
            />
            <h4 className="font-bold text-gray-800">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Dedicated support</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
