
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';

interface ShopProps {
  onAddToCart: () => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Kitchen', 'Laundry', 'Cooling'];

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="heading-font text-4xl text-blue-950 mb-2">Pasar Elektronik Bekas</h2>
            <p className="text-slate-600">Barang second berkualitas, sudah melalui inspeksi teknisi Bang Ipul.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    product.condition === 'Like New' ? 'bg-green-100 text-green-700' :
                    product.condition === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {product.condition}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest">{product.category}</p>
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-blue-900 font-bold text-xl">{formatIDR(product.price)}</span>
                  <button 
                    onClick={onAddToCart}
                    className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors shadow-md"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
