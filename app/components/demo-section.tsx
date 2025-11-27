'use client';

import { useState } from 'react';
import { greetUser, calculateSum, fetchProducts } from '@/lib/server-actions';

interface Product {
  id: number;
  title: string;
  description: string;
}

export function DemoSection() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [response, setResponse] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState(false);

  const handleServerAction = async (type: 'greet' | 'calculate') => {
    setLoading(true);
    setResponse('');
    
    try {
      if (type === 'greet') {
        const result = await greetUser(name || 'Guest');
        setResponse(result.message);
      } else {
        const result = await calculateSum(5, 3);
        setResponse(`${result.operation} = ${result.result}`);
      }
    } catch (error) {
      setResponse('Error occurred');
    }
    
    setLoading(false);
  };

  const handleApiCall = async (type: 'get' | 'post') => {
    setLoading(true);
    setResponse('');
    
    try {
      if (type === 'get') {
        const res = await fetch(`/api/hello?name=${encodeURIComponent(name || 'Guest')}`);
        const data = await res.json();
        setResponse(data.message);
      } else {
        const res = await fetch('/api/hello', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ a: 10, b: 5 }),
        });
        const data = await res.json();
        setResponse(`${data.operation} = ${data.result}`);
      }
    } catch (error) {
      setResponse('Error occurred');
    }
    
    setLoading(false);
  };

  const handleFetchProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchProducts();
      if (result.success) {
        setProducts(result.products);
        setShowProducts(true);
      } else {
        setResponse('Error fetching products');
      }
    } catch (error) {
      setResponse('Error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      {/* Server Actions Section */}
      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
          Server Actions
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-blue-800 dark:text-blue-200">
              Enter name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 rounded border border-blue-300 dark:border-blue-700 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleServerAction('greet')}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Greet (Server Action)'}
            </button>
            <button
              onClick={() => handleServerAction('calculate')}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Calculate (Server Action)'}
            </button>
          </div>
        </div>
      </div>

      {/* API Routes Section */}
      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-900 dark:text-green-100">
          API Routes
        </h2>
        
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 rounded border border-green-300 dark:border-green-700 dark:bg-green-900 text-green-900 dark:text-green-100"
          />

          <div className="flex gap-2">
            <button
              onClick={() => handleApiCall('get')}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'GET /api/hello'}
            </button>
            <button
              onClick={() => handleApiCall('post')}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'POST /api/hello'}
            </button>
          </div>
        </div>
      </div>

      {/* Response Section */}
      {response && (
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Response:</h3>
          <p className="text-gray-700 dark:text-gray-300">{response}</p>
        </div>
      )}

      {/* Products Section */}
      <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-purple-900 dark:text-purple-100">
          Products from API
        </h2>
        
        <button
          onClick={handleFetchProducts}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 mb-4"
        >
          {loading ? 'Loading...' : 'Fetch Products'}
        </button>

        {showProducts && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-purple-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700"
              >
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Product #{product.id}
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300 line-clamp-3">
                  {product.title}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 line-clamp-2">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
