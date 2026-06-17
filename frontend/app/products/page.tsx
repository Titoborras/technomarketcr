'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category, sort, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (sort) params.append('sort', sort);
      if (search) params.append('search', search);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Electronics',
    'Computers',
    'Laptops',
    'Smartphones',
    'Tablets',
    'Accessories',
    'Audio',
    'Networking'
  ];

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

      {/* Products Section */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="card h-fit">
            <h3 className="text-xl font-bold mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold mb-2">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-6">All Products</h2>
            
            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">No products found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product._id} href={`/products/${product._id}`}>
                    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-gray-500">No image</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-2 text-sm">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">${product.price}</span>
                        <span className="text-yellow-500">⭐ {product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
