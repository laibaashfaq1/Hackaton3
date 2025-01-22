'use client';

import Image from "next/image";
import { GoTrophy } from "react-icons/go";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";

const Checkout = () => {
  return (
    <div>
      {/* Background Image */}
      <Image
        src="/checkout.png"
        alt="Checkout background"
        width={1440}
        height={316}
        priority
        className="w-full object-cover"
      />

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-2xl font-bold mb-8">Billing Details</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Billing Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    placeholder="Company Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country / Region
                  </label>
                  <select
                    className="w-full border rounded-lg p-2"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    placeholder="1234 Main St"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Town / City
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    placeholder="New York"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Province
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      placeholder="State / Province"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border rounded-lg p-2"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-lg p-2"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    className="w-full border rounded-lg p-2"
                    placeholder="Order notes (optional)"
                    rows={4}
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Your Order</h2>
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Asgaard Sofa × 1</span>
                  <span>₹24,299.00</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-xl text-gray-900 font-bold">
                    ₹250,000.00
                  </span>
                </div>
              </div>

              {/* Payment Options */}
              <div>
                <h3 className="font-medium text-lg mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      className="border-gray-400"
                      defaultChecked
                    />
                    <span>Direct Bank Transfer</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      className="border-gray-400"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                <p className="text-gray-600 text-sm mt-4">
                  Your personal data will be used to process your order and
                  support your experience.
                </p>

                <button className="bg-black text-white w-full py-3 mt-6 rounded-lg hover:bg-gray-800">
                  Place Order
                </button>
              </div>
            </div>
          </div>
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
            <MdOutlineLocalShipping size={40} className="mx-auto text-gray-800" />
            <h4 className="font-bold text-gray-800">Free Shipping</h4>
            <p className="text-gray-600 text-sm">Orders over $50</p>
          </div>
          <div>
            <RiCustomerService2Line size={40} className="mx-auto text-gray-800" />
            <h4 className="font-bold text-gray-800">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Dedicated support</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
