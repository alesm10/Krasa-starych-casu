import React, { useState } from 'react';
import { ShoppingBag, Mail, Menu, X, Heart, Info } from 'lucide-react';

// Types for our products
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Míšeňský šálek s podšálkem",
    description: "Jemný porcelán s ručně malovaným květinovým vzorem a zlaceným okrajem. Období 1920.",
    price: 1200,
    image: "https://picsum.photos/id/1060/400/300"
  },
  {
    id: 2,
    name: "Cibulákový talíř hluboký",
    description: "Tradiční modrý cibulový vzor. Ideální pro sváteční polévku nebo jako dekorace.",
    price: 450,
    image: "https://picsum.photos/id/113/400/300"
  },
  {
    id: 3,
    name: "Starožitná konvička na čaj",
    description: "Elegantní tvar, krémová barva s motivem růží. Objem 0.8 litru.",
    price: 890,
    image: "https://picsum.photos/id/225/400/300"
  },
  {
    id: 4,
    name: "Velká servírovací mísa",
    description: "Masivní porcelán s jemným reliéfem po obvodu. Perfektní stav bez oťuků.",
    price: 650,
    image: "https://picsum.photos/id/431/400/300"
  },
  {
    id: 5,
    name: "Sada dezertních talířků (6ks)",
    description: "Kompletní sada pro odpolední kávu. Motiv lučního kvítí.",
    price: 1500,
    image: "https://picsum.photos/id/360/400/300"
  },
  {
    id: 6,
    name: "Porcelánový omáčkovník",
    description: "Klasický tvar, značeno spodní značkou porcelánky Stará Role.",
    price: 350,
    image: "https://picsum.photos/id/75/400/300"
  }
];

// Custom SVG Logo Component
const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="6" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Teapot Body */}
    <path d="M25 45 Q20 85 50 85 Q80 85 75 45 Z" />
    {/* Lid */}
    <path d="M30 45 Q50 25 70 45" />
    {/* Knob */}
    <circle cx="50" cy="30" r="4" fill="currentColor" stroke="none" />
    {/* Handle */}
    <path d="M75 50 C95 50 95 80 75 75" />
    {/* Spout */}
    <path d="M25 55 C5 50 5 40 15 40" />
    {/* Decorative steam/flower detail */}
    <path d="M50 20 Q55 10 50 5" strokeWidth="4" className="opacity-60" />
  </svg>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans text-stone-700">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <Logo className="h-9 w-9 text-amber-800" />
              <span className="font-serif text-2xl font-bold text-stone-800 tracking-tight">Staré Časy</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-amber-700 transition-colors font-medium">Domů</button>
              <button onClick={() => scrollToSection('offer')} className="hover:text-amber-700 transition-colors font-medium">Nabídka</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-amber-700 transition-colors font-medium">Kontakt</button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-stone-200 focus:outline-none text-stone-600">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-stone-50 border-t border-stone-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-3 rounded-md hover:bg-stone-100 font-medium text-stone-800">Domů</button>
              <button onClick={() => scrollToSection('offer')} className="block w-full text-left px-3 py-3 rounded-md hover:bg-stone-100 font-medium text-stone-800">Nabídka</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-3 rounded-md hover:bg-stone-100 font-medium text-stone-800">Kontakt</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="home" className="pt-24 pb-12 md:pt-32 md:pb-24 px-4 text-center bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Logo className="h-20 w-20 text-stone-400 opacity-20" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-stone-800 mb-6 tracking-tight">
            Krása starých časů – porcelán
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-stone-600 mb-8">
            Objevte kouzlo historie v každém šálku. Starý porcelán není jen nádobí, je to příběh našich předků, 
            který přináší do dnešních uspěchaných dnů klid, eleganci a jedinečnou atmosféru. 
            Ideální dárek pro ty, kteří si váží tradic a poctivého řemesla.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => scrollToSection('offer')}
              className="px-8 py-3 bg-stone-700 text-stone-50 font-medium rounded-full hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Prohlédnout nabídku
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Features / Why Buy Section */}
        <section className="mb-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-800">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2 text-stone-800">Jedinečný originál</h3>
            <p className="text-stone-600">Každý kousek v naší nabídce má svou historii a duši. Nenajdete dva zcela identické kusy.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-800">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2 text-stone-800">Kvalitní zpracování</h3>
            <p className="text-stone-600">Poctivé řemeslo starých mistrů, které přetrvalo generace a stále slouží svému účelu.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-800">
              <Info className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2 text-stone-800">Udržitelná krása</h3>
            <p className="text-stone-600">Dát nový život starým věcem je ta nejkrásnější forma recyklace a úcty k přírodě.</p>
          </div>
        </section>

        {/* Offer Section */}
        <section id="offer" className="mb-20 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-800 mb-4">Aktuální nabídka</h2>
            <div className="w-24 h-1 bg-amber-700 mx-auto opacity-50 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-lg overflow-hidden shadow-md border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden bg-stone-200 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-bold text-stone-800 leading-tight">{product.name}</h3>
                    <span className="bg-amber-50 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2 border border-amber-100">
                      {product.price} Kč
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm mb-6 min-h-[60px] leading-relaxed">{product.description}</p>
                  <button className="w-full py-2.5 px-4 border border-stone-300 rounded text-stone-700 font-medium hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-stone-400">
                    <Mail className="h-4 w-4" />
                    Mám zájem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-stone-100">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-stone-800 mb-4">Kontaktujte nás</h2>
            <p className="text-stone-600">Líbí se vám některý z kousků? Napište nám a domluvíme se na předání či zaslání.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Jméno</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none bg-stone-50 transition-all"
                placeholder="Vaše jméno"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">E-mail</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none bg-stone-50 transition-all"
                placeholder="vas@email.cz"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Zpráva</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full px-4 py-3 rounded-md border border-stone-300 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none bg-stone-50 transition-all"
                placeholder="O jaký produkt máte zájem?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-amber-700 text-white font-medium py-3.5 rounded-md hover:bg-amber-800 transition-colors shadow-sm hover:shadow-md"
            >
              Odeslat zprávu
            </button>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Logo className="h-6 w-6 text-stone-500" />
              <h4 className="font-serif text-xl text-stone-200 font-bold">Krása starých časů</h4>
            </div>
            <p className="text-sm">Uchováváme vzpomínky v porcelánu.</p>
          </div>
          <div className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Krása starých časů. Všechna práva vyhrazena.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;