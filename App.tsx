import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { AdminPanel } from './components/AdminPanel';
import { Product, CartItem, Category } from './types';
import { MOCK_PRODUCTS } from './constants';
import { Filter, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'admin'>('shop');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | 'Vše'>('Vše');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'Vše' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setActiveTab('shop');
  };

  return (
    <div className="min-h-screen bg-porcelain-50 font-sans text-stone-800">
      <Navbar 
        cartCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'shop' && (
          <>
            {/* Hero Section */}
            <div className="mb-12 text-center py-10 bg-white rounded-3xl shadow-sm border border-stone-100">
              <h1 className="font-serif text-5xl font-bold text-stone-800 mb-4">
                Krása starých časů
              </h1>
              <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light">
                Objevte jedinečné kousky porcelánu s historií. Každý šálek a talíř má svůj příběh, který čeká na pokračování u vás doma.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                 onClick={() => setActiveCategory('Vše')}
                 className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === 'Vše' ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
              >
                Vše
              </button>
              {Object.values(Category).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-stone-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-stone-400">
                <Filter className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p>V této kategorii zatím nejsou žádné produkty.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'admin' && (
          <AdminPanel onAddProduct={handleAddProduct} />
        )}

      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h2 className="font-serif text-2xl font-bold">Váš košík</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-center text-stone-500 mt-10">Košík je prázdný.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-lg bg-stone-100" />
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-stone-800">{item.title}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-stone-500">{item.quantity}x</span>
                        <span className="font-bold text-cobalt-600">{item.price * item.quantity} Kč</span>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 mt-2 underline"
                      >
                        Odstranit
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-stone-100 bg-stone-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-600">Celkem</span>
                <span className="font-serif text-2xl font-bold text-stone-900">{cartTotal} Kč</span>
              </div>
              <button className="w-full bg-stone-900 hover:bg-cobalt-600 text-white font-bold py-4 rounded-xl transition-colors">
                Přejít k pokladně
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-stone-900 text-stone-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-serif text-white text-lg font-bold mb-4">Porcelán & Historie</h3>
            <p>Váš specialista na starožitný porcelán, sklo a keramiku. Obnovujeme krásu minulosti.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Doprava a platba</h4>
            <p className="mb-2">Balíme extrémně pečlivě do bublinkové fólie.</p>
            <p>Doprava přes Zásilkovnu nebo kurýrem.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Kontakt</h4>
            <p>info@porcelanhistorie.cz</p>
            <p>+420 123 456 789</p>
            <p>Praha 1, Dlouhá 12</p>
          </div>
        </div>
      </footer>
    </div>
  );
}