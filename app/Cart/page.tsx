'use client';

import { GoTrophy } from "react-icons/go";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiCustomerService2Line, RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  return (
    <div>
      {/* Background Image */}
      <Image
        src="/cart.png"
        alt="Cart background"
        width={1440}
        height={316}
        priority
        className="w-full object-cover"
      />

      <div className="flex flex-col md:flex-row justify-center items-start py-10 bg-gray-50 space-y-8 md:space-y-0 md:space-x-10">
        {/* Cart Section */}
        <div className="p-6 max-w-5xl w-full bg-white shadow-md rounded-md">
          {/* Cart Header */}
          <div className="flex justify-between items-center bg-pink-100 py-4 px-6 rounded-t-md">
            <h2 className="font-semibold text-[16px]">Product</h2>
            <h2 className="font-semibold text-[16px] flex-grow text-center">
              Price
            </h2>
            <h2 className="font-semibold text-[16px]">Quantity</h2>
            <h2 className="font-semibold text-[16px] ml-4">Subtotal</h2>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white py-6 px-6 border-b space-y-4 md:space-y-0">
            {/* Product Image */}
            <div className="flex items-center">
              <div className="bg-pink-100 p-2 rounded-md">
                <Image
                  src="/chair.png"
                  alt="Asgaard sofa"
                  className="h-[100px] w-[100px] object-cover rounded-md"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-[#9F9F9F] text-[16px] font-medium ml-4">
                Asgaard sofa
              </h3>
            </div>

            <p className="text-gray-500 text-center flex-grow">Rs.250,000.00</p>
            <input
              type="number"
              defaultValue="1"
              aria-label="Product Quantity"
              className="w-11 border rounded-md text-center py-1"
            />
            <p className="text-black ml-4">Rs. 250,000.00</p>
            <button
              aria-label="Remove Item"
              className="text-yellow-600 hover:text-yellow-700 ml-4"
            >
              <RiDeleteBin6Line size={20} />
            </button>
          </div>
        </div>

        {/* Cart Totals Section */}
        <div className="bg-pink-100 py-8 px-6 rounded-md shadow-md max-w-xs">
          <h2 className="font-semibold text-center text-[24px] mb-6">
            Cart Totals
          </h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="text-gray-400">Rs 250,000.00</span>
          </div>
          <div className="flex justify-between mb-6">
            <span>Total</span>
            <span className="text-yellow-600 font-semibold">
              Rs 250,000.00
            </span>
          </div>
          {/* Checkout Button Link */}
          <Link href="Checkout">
          <button
            aria-label="Proceed to Checkout"
            className="w-full border-2 border-black rounded-[15px] py-3 font-medium text-[16px] hover:bg-black hover:text-white transition"
          >
            Check Out
          </button>
          </Link>
        </div>
      </div>

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
};

export default Cart;