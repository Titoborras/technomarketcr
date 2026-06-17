'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCart(cartItems);
      calculateTotal(cartItems);
    }
  };

  const calculateTotal = (items: CartItem[]) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const removeItem = (productId: string) => {
    const updated = cart.filter(item => item.product !== productId);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    const updated = cart.map(item =>
      item.product === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const handleCheckout = async () => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      // Create order
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          products: cart,
          totalPrice: total,
          paymentMethod: 'stripe',
          shippingAddress: {
            name: 'Customer Name',
            phone: '123-456-7890',
            address: '123 Main St',
            city: 'San José',
            zipCode: '2000'
          }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Clear cart
      localStorage.removeItem('cart');
      router.push(`/checkout/${response.data.data._id}`);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">TechnoMarketCR</h1>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <Link href="/cart" className="hover:text-blue-600">Cart</Link>
            <Link href="/login" className="hover:text-blue-600">Login</Link>
          </nav>
        </div>
      </header>

      {/* Cart Section */}
      <section className="container py-8">
        <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link href="/products" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="card">
                {cart.map((item) => (
                  <div key={item.product} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-blue-600 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="card h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.13).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(total + total * 0.13).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || loading}
              className="w-full btn btn-primary"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <Link href="/products" className="block text-center text-blue-600 mt-4 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container text-center">
          <p>&copy; 2024 TechnoMarketCR. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
