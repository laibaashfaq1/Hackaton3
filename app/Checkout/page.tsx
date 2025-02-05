'use client'

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgChevronRight } from 'react-icons/cg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
    province: false,
  });

  useEffect(() => {
    const getCartItems = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          return Array.isArray(parsedCart) ? parsedCart : [];
        } catch (error) {
          console.error("Error parsing cart data:", error);
          return [];
        }
      }
      return [];
    };
    

    const storedItems = getCartItems();
    setCartItems(storedItems);
    console.log("Cart Items Retrieved:", storedItems);

    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);


  // ✅ Debugging: Check if the structure is correct
  console.log("Cart Items State:", cartItems);

  const subTotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.inventory || 1), 
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const error = {
      firstName: !formValues.firstname,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      province: !formValues.province,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(error);
    return Object.values(error).every((err) => !err);
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      Swal.fire("Error!", "Please fill all the required fields", "error");
      return;
    }
  
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then(async (result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        // Creating order
        const orderData = {
          _type: "order",
          firstName: formValues.firstname,
          lastName: formValues.lastName,
          address: formValues.address,
          city: formValues.city,
          zipCode: formValues.zipCode,
          phone: formValues.phone,
          email: formValues.email,
          province: formValues.province,
          cartItems: cartItems.map((item) => ({
            _type: "reference",
            _ref: item._id,
          })),
          total: subTotal,
          discount: discount,
          orderDate: new Date().toISOString(), // Fixed function call
        };
  
        try {
          await client.create(orderData); // Fixed missing await
          toast.success("Order has been placed successfully");
          localStorage.removeItem("appliedDiscount");
        } catch (error) {
          console.error("Error creating order:", error);
          Swal.fire("Error!", "Failed to place the order. Try again.", "error");
        }
      }
    });
  };
  

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mt-6'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='flex items-center gap-2 py-4'>
            <Link 
              href={"/Cart"}
              className='text-[#666666] hover:text-black transition text-sm'
            >
              Cart
            </Link>
            <CgChevronRight/>
            <span> Checkout </span>
          </nav>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white border rounded-lg p-6 space-y-4'>
            <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
            {cartItems.length > 0 ? (
  cartItems.map((item) => (
    <div key={item._id} className='flex items-center gap-4 py-3 border-b'>
      <div className='w-16 h-16 rounded overflow-hidden'>
        {item.productImage && (
          <Image
            src={urlFor(item.productImage).url()}
            alt='Product Image'
            width={50}
            height={50}
            className='object-cover w-full h-full'
          />
        )}
      </div>
      <div className='flex-1'>
        <h3 className='item-sm font-medium'>{item.title || "No Title"}</h3>
        <p className='text-sm text-gray-700'>Price: <strong>${item.price || 0}</strong></p>
        <p className='text-sm text-gray-700'>Quantity: <strong>{item.inventory || 1}</strong></p>
      </div>
    </div>
       ))
        ) : (
           <p className='text-sm font-medium'>Your cart is empty</p>
             )}

            <div className='text-right pt-4'>
              <p className='text-sm'>
                Subtotal: 
              <span className='font-bold'>${subTotal.toFixed(2)}</span>
              </p>
              <p className='text-sm'>
                Discount:
                <span className='font-bold'>${discount}</span>
              </p>
              <p className='text-sm font-bold'>
                Total:${subTotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form className="space-y-4">
              <div>
                <h2 className="font-bold">Billing Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname" // Added id here
                      className="w-full border rounded-lg p-2"
                      placeholder="Muhammad"
                      value={formValues.firstname}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm">
                        First Name is Required
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName" // Added id here
                      className="w-full border rounded-lg p-2"
                      placeholder="Ahmed"
                      value={formValues.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm">
                        Last Name is Required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                   City
                  </label>
                    <select
                     className="w-full border rounded-lg p-2"
                     id="city" // Added id here
                     value={formValues.city} // Bind the value to formValues
                     onChange={(e) => setFormValues({ ...formValues, city: e.target.value })} // Update formValues on change
                     required
                     >
                        <option value="" disabled>
                           Select a city
                        </option>
                         <option value="Karachi">Karachi</option>
                          <option value="Lahore">Lahore</option>
                           <option value="Islamabad">Islamabad</option>
                    </select>
                          {formErrors.city && (
                         <p className="text-red-500 text-sm">
                     City is Required
                            </p>
                       )}
                  </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address" // Added id here
                    className="w-full border rounded-lg p-2"
                    placeholder="1234 Main St"
                    value={formValues.address}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-sm">
                      Address is Required
                    </p>
                  )}
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Town / City
                  </label>
                  <input
                    type="text"
                    id="city" // Added id here
                    className="w-full border rounded-lg p-2"
                    placeholder="New York"
                    value={formValues.city}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-sm">
                      City Name is Required
                    </p>
                  )}
                </div> */}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Province
                    </label>
                    <input
                      type="text"
                      id="province" // Added id here
                      className="w-full border rounded-lg p-2"
                      placeholder="State / Province"
                      value={formValues.province}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.province && (
                      <p className="text-red-500 text-sm">
                        Province Name is Required
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode" // Added id here
                      className="w-full border rounded-lg p-2"
                      placeholder="10001"
                      value={formValues.zipCode}
                      onChange={handleInputChange}
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
                    id="phone" // Added id here
                    className="w-full border rounded-lg p-2"
                    placeholder="+1 234 567 8900"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">
                      Phone Number is Required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email" // Added id here
                    className="w-full border rounded-lg p-2"
                    placeholder="you@example.com"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">
                      Email Address is Required
                    </p>
                  )}
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
              </div>
            </form>
            <button
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white rounded"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
