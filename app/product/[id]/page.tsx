"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { useCart } from "@/app/Cart/context/CartContext";

interface ProductDetail {
  _id: string;
  title: string;
  description: string;
  productImage: string;
  price: number;
  tags: string[];
  discountPercentage?: number;
  isNew: boolean;
  content: PortableTextBlock[];
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const { addToCart } = useCart();
  const [selectedColor] = useState<string>("");
  const [selectedSize] = useState<string>("");

  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined.");
      return;
    }

    const fetchProduct = async () => {
      const query = `
        *[_type == "product" && _id == $id][0] {
          _id,
          title,
          description,
          price,
          productImage,
          tags,
          discountPercentage,
          isNew,
          content
        }
      `;

      try {
        const data = await client.fetch(query, { id });
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!id) {
    return <div>Error: Product ID is missing.</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  function handleAddToCart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    if (product) {
      addToCart({
        id: product._id,
        heading: product.title,
        price: product.price,
        image: urlFor(product.productImage).url(),
        quantity: 1,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        title: product.title
      });
    } else {
      console.error("Product is not available to add to cart.");
    }
  }

  return (
    <section className="container mx-auto px-4 lg:px-8 mt-8">
      <div className="lg:flex lg:space-x-8">
        {/* Left Side Image */}
        <div className="lg:w-1/2">
          <Image
            src={product.productImage ? urlFor(product.productImage).url() : "/fallback-image.jpg"}
            width={600}
            height={400}
            alt="Product Image"
            className="rounded-lg w-full"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-xl font-semibold text-green-800 mb-2">$ {product.price}</p>

          <div className="flex items-center space-x-2 mb-4">
            {product.isNew && <span className="text-sm text-green-600 font-medium">New Arrival</span>}
            {product.discountPercentage && (
              <span className="text-sm text-red-600 font-medium">
                {product.discountPercentage}% Off
              </span>
            )}
          </div>

          <div className="mb-4">
            <span className="block text-gray-700 font-medium">Size:</span>
            <div className="flex space-x-4 mt-2">
              <button className="px-4 py-2 border rounded hover:bg-black hover:text-white">L</button>
              <button className="px-4 py-2 border rounded hover:bg-black hover:text-white">XL</button>
              <button className="px-4 py-2 border rounded hover:bg-black hover:text-white">XS</button>
            </div>
          </div>

          <div className="mb-4">
            <span className="block text-gray-700 font-medium">Color:</span>
            <div className="flex space-x-4 mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 border"></div>
              <div className="w-8 h-8 rounded-full bg-blue-400 border"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 border"></div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <label className="block text-gray-700">Quantity:</label>
            <input
              type="number"
              className="w-16 border rounded p-2 text-center"
              defaultValue="1"
            />
          </div>

          <div className="flex space-x-4">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-yellow-500 transition"
            >
              Add to Cart
            </button>
            <Link href="/PCompare">
              <button className="px-6 py-2 border border-black text-black rounded hover:bg-black hover:text-white">
                Compare
              </button>
            </Link>
          </div>

          <div className="mt-6">
            <p className="text-gray-700">
              <span className="font-medium">SKU:</span> SS001
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Category:</span> Sofas
            </p>
            {/* Share icons */}
            <div className="flex items-center space-x-4 mt-6">
              <span className="font-medium text-gray-700">Share:</span>
              <FaFacebook size={24} className="cursor-pointer" />
              <AiFillTwitterCircle size={28} className="cursor-pointer" />
              <FaLinkedin size={26} className="cursor-pointer" />
            </div>
            {/* Tags */}
            <div className="mt-4 flex flex-wrap">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="border-b">
          <button className="px-4 py-2 text-gray-900 border-b-2 border-black font-medium">
            Description
          </button>
        </div>
        <div className="mt-4 text-gray-700">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="text-lg text-normal text-black mt-8">
        {product.content && <PortableText value={product.content} />}
      </div>
    </section>
  );
}
