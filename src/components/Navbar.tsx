import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-b border-orange-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/src/assets/cloudsurge-logo-orange.png" 
              alt="CloudSurge AI" 
              className="h-10 w-auto filter drop-shadow-lg"
            />
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#who-we-help" 
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium relative group"
            >
              Who We Help
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#services" 
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium relative group"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-orange-500/25 border border-orange-400/30">
              Book Free Strategy Call
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/50 rounded-lg mt-2 backdrop-blur-sm">
            <a 
              href="#who-we-help" 
              className="block px-3 py-2 text-gray-300 hover:text-orange-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Who We Help
            </a>
            <a 
              href="#services" 
              className="block px-3 py-2 text-gray-300 hover:text-orange-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              className="block px-3 py-2 text-gray-300 hover:text-orange-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <button 
              className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Free Strategy Call
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
