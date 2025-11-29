import React from 'react';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full">
      <div className="relative overflow-hidden aspect-square bg-stone-100">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-serif font-bold text-stone-800 rounded-full shadow-sm">
          {product.manufacturer || 'Neznámý'}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2 text-xs font-bold text-cobalt-600 tracking-widest uppercase">
          {product.category}
        </div>
        <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 leading-tight">
          {product.title}
        </h3>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <span className="font-serif text-xl font-bold text-stone-900">
            {product.price} Kč
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="flex items-center bg-stone-900 hover:bg-cobalt-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Do košíku
          </button>
        </div>
      </div>
    </div>
  );
};