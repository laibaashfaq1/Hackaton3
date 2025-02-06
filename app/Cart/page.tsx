'use client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Swal from "sweetalert2";
import { useCart } from '@/app/Cart/context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
}

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  // ✅ Refresh hone par cart ka data localStorage se retrieve karein
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems(cart);
    }
    console.log(cart)
  }, [cart]);

  // ✅ Jab bhi cartItems update ho, localStorage mein save karein
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        removeFromCart(id);
        Swal.fire("Removed!", "Item has been removed from your cart.", "success");
      }
    });
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your order has been successfully processed!", "success");
        router.push("/Checkout");
        // ✅ Checkout ke baad bhi cart ko localStorage mein save karein
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold my-6 text-center hover:underline text-myDarkOrange">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-xl font-semibold text-center">Your Cart is Empty</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center border p-4 rounded-lg space-y-4 md:space-y-0 md:space-x-6"
            >
              <Image
                src={urlFor(item.image).url()}
                alt="title"
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-semibold text-lg">{item.title ||'product name'}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                <p className="font-bold text-gray-800">Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    updateQuantity(item.id, item.quantity - 1);
                    const updatedCart = cartItems.map(cartItem =>
                      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                    );
                    setCartItems(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                  }}
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => {
                    updateQuantity(item.id, item.quantity + 1);
                    const updatedCart = cartItems.map(cartItem =>
                      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    );
                    setCartItems(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                  }}
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ✅ Total and Checkout Button Layout */}
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between font-bold text-xl">
              <span className="text-left">Total:</span>
              <span className="font-normal">${calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={handleProceed}
              className="w-full text-center font-normal text-xl mt-2 px-4 py-2 bg-green-700 text-white rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
