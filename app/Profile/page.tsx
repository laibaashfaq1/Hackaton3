// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  products: string[];
  total: number;
  status: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch user data and orders (replace with actual API calls)
  useEffect(() => {
    // Mock data - replace with your actual data fetching logic
    const fetchUserData = async () => {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Sofa Street, Furniture City, FC 12345'
      };

      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          date: '2024-03-15',
          products: ['Luxury Sofa Set', 'Ottoman'],
          total: 2499.99,
          status: 'Delivered'
        },
        {
          id: 'ORD-002',
          date: '2024-02-28',
          products: ['Sectional Sofa'],
          total: 1599.99,
          status: 'Processing'
        }
      ];

      setUser(mockUser);
      setOrders(mockOrders);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {/* User Details Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Phone:</span> {user.phone}</p>
            <p><span className="font-medium">Address:</span> {user.address}</p>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">Products:</p>
                    <ul className="list-disc list-inside">
                      {order.products.map((product) => (
                        <li key={product}>{product}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-2 font-medium">
                    Total: ₹{order.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}