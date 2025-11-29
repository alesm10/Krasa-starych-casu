import React, { useState } from 'react';
import { Category, Product, Condition } from '../types';
import { generateProductListing, GeneratedListing } from '../services/geminiService';
import { Sparkles, Loader2, Save, Image as ImageIcon } from 'lucide-react';

interface AdminPanelProps {
  onAddProduct: (product: Product) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddProduct }) => {
  const [loading, setLoading] = useState(false);
  const [rawNotes, setRawNotes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.CUPS);
  const [generatedData, setGeneratedData] = useState<GeneratedListing | null>(null);

  const handleGenerate = async () => {
    if (!rawNotes.trim()) return;
    setLoading(true);
    const result = await generateProductListing(rawNotes, selectedCategory);
    setGeneratedData(result);
    setLoading(false);
  };

  const handleSave = () => {
    if (!generatedData) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      title: generatedData.title,
      description: generatedData.description,
      price: generatedData.suggestedPrice,
      category: selectedCategory,
      condition: Condition.GOOD, // Default, would be selectable in full app
      imageUrl: `https://picsum.photos/400/400?random=${Date.now()}`, // Mock image
      year: generatedData.estimatedYear,
      manufacturer: 'Neznámý' // Simplified for demo
    };

    onAddProduct(newProduct);
    // Reset
    setRawNotes('');
    setGeneratedData(null);
    alert('Produkt úspěšně přidán do obchodu!');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-stone-800 mb-2">Administrace & AI Asistent</h2>
        <p className="text-stone-600">
          Pro prodej starožitností je klíčový příběh. Použijte AI pro vytvoření profesionálních popisů z vašich poznámek.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Input */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
          <div className="mb-6">
            <label className="block text-sm font-bold text-stone-700 mb-2">Kategorie</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-cobalt-500 outline-none"
            >
              {Object.values(Category).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-stone-700 mb-2">Vaše poznámky k produktu</label>
            <textarea 
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              placeholder="Např.: Starý talíř po babičce, zlatý okraj trochu ošoupaný, vzor růže, značka dole vypadá jako dva meče..."
              className="w-full h-40 p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-cobalt-500 outline-none resize-none text-stone-800 placeholder-stone-400"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !rawNotes}
            className="w-full bg-cobalt-600 hover:bg-cobalt-500 disabled:bg-stone-300 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Analyzuji porcelán...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generovat AI popis
              </>
            )}
          </button>
        </div>

        {/* Right: Output Preview */}
        <div className={`bg-stone-50 p-6 rounded-2xl border-2 border-dashed border-stone-300 flex flex-col justify-center items-center ${generatedData ? 'border-cobalt-200 bg-cobalt-50/30' : ''}`}>
          
          {!generatedData && !loading && (
            <div className="text-center text-stone-400">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Zde se objeví náhled vašeho nového inzerátu</p>
            </div>
          )}

          {loading && (
            <div className="text-center space-y-4">
              <div className="h-4 w-3/4 bg-stone-200 rounded animate-pulse mx-auto"></div>
              <div className="h-4 w-full bg-stone-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-stone-200 rounded animate-pulse mx-auto"></div>
              <p className="text-sm text-cobalt-600 font-medium">Gemini zkoumá historii...</p>
            </div>
          )}

          {generatedData && (
            <div className="w-full text-left space-y-4 animate-in fade-in duration-500">
               <div className="flex justify-between items-start">
                  <span className="bg-cobalt-100 text-cobalt-700 text-xs px-2 py-1 rounded font-bold uppercase">{selectedCategory}</span>
                  <span className="text-stone-500 text-xs">{generatedData.estimatedYear}</span>
               </div>
               
               <h3 className="font-serif text-2xl font-bold text-stone-900">{generatedData.title}</h3>
               
               <p className="text-stone-700 leading-relaxed text-sm">
                 {generatedData.description}
               </p>

               <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-stone-500">Stav:</span>
                   <span className="font-medium text-stone-800">{generatedData.conditionEval}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-stone-500">Cena:</span>
                   <span className="font-bold text-cobalt-600 text-lg">{generatedData.suggestedPrice} Kč</span>
                 </div>
               </div>

               <button 
                 onClick={handleSave}
                 className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-green-600/20"
               >
                 <Save className="mr-2 h-4 w-4" />
                 Uložit do obchodu
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};