'use client'

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgChevronRight } from 'react-icons/cg'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    firstname: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems([]);
      }
    }
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

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
    return Object.values(formValues).every(value => value.trim() !== '');
  };

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderData = {
          _type: "order",
          firstname: formValues.firstname,
          lastName: formValues.lastName,
          address: formValues.address,
          phone: formValues.phone,
          email: formValues.email,
          city: formValues.city,
          province: formValues.province,
          zipCode: formValues.zipCode,
          cartItems: cartItems.map(item => ({
            _type: "reference",
            _ref: item._id,
          })),
          total: subTotal,
          discount: discount,
          orderDate: new Date().toISOString(),
        };
  
        console.log("Sending order data:", orderData);
  
        try {
          const response = await client.create(orderData);
          console.log("Order response:", response);
  
          if (response && response._id) {
            Swal.fire("Success!", "Your order has been placed successfully!", "success");
            localStorage.removeItem("Cart");
            localStorage.removeItem("appliedDiscount");
            setCartItems([]);
          } else {
            throw new Error("Order creation failed, no ID returned.");
          }
        } catch (error) {
          console.error("Sanity API Error:", error);
          Swal.fire("Error!", `Failed to place the order`, "error");
        }        
      }
    });
  };
  
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex items-center gap-2 py-4'>
          <Link href={'/Cart'} className='text-[#666666] hover:text-black transition text-sm'>
            Cart
          </Link>
          <CgChevronRight/>
          <span>Checkout</span>
        </nav>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='bg-white border rounded-lg p-6'>
          <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
          {cartItems.length > 0 ? cartItems.map((item, index) => (
            <div key={item._id || index} className='flex items-center gap-4 py-3 border-b'>
              {item.image && <Image src={urlFor(item.image).url()} alt='Product Image' width={50} height={50} className='object-cover' />}
              <div>
                <h3 className='text-sm font-medium'>{item.title || "No Title"}</h3>
                <p className='text-sm text-gray-700'>Price: <strong>${item.price || 0}</strong></p>
                <p className='text-sm text-gray-700'>Quantity: <strong>{item.inventory || 1}</strong></p>
              </div>
            </div>
          )) : <p className='text-sm font-medium'>Your cart is empty</p>}

          <div className='text-right pt-4'>
            <p className='text-sm'>Subtotal: <span className='font-bold'>${subTotal.toFixed(2)}</span></p>
            <p className='text-sm'>Discount: <span className='font-bold'>${discount}</span></p>
            <p className='text-sm font-bold'>Total: ${subTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='font-bold'>Billing Information</h2>
          <form className='space-y-4'>
            {Object.keys(formValues).map((key) => (
              <div key={key}>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type='text'
                  id={key}
                  className='w-full border rounded-lg p-2'
                  placeholder={`Enter your ${key}`}
                  value={formValues[key]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </form>
          <button className='w-full h-12 bg-blue-500 hover:bg-blue-700 text-white rounded' onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
