import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImage from '../assets/cloudsurge-logo-orange.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-orange-500/95 via-purple-600/95 to-black/95 backdrop-blur-xl border-b border-purple-400/30 shadow-2xl shadow-purple-500/20' 
          : 'bg-gradient-to-r from-orange-500/20 via-purple-600/20 to-black/20 backdrop-blur-md border-b border-purple-400/10'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="CloudSurge AI" 
              className="h-10 w-auto filter drop-shadow-lg"
            />
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#who-we-help" 
              className="text-white/90 hover:text-orange-300 transition-all duration-300 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Who We Help
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 group-hover:w-full transition-all duration-300 blur-sm opacity-70"></span>
            </motion.a>
            <motion.a 
              href="#services" 
              className="text-white/90 hover:text-orange-300 transition-all duration-300 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 group-hover:w-full transition-all duration-300 blur-sm opacity-70"></span>
            </motion.a>
            <motion.a 
              href="#how-it-works" 
              className="text-white/90 hover:text-orange-300 transition-all duration-300 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 group-hover:w-full transition-all duration-300 blur-sm opacity-70"></span>
            </motion.a>
            <motion.button 
              className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 border border-purple-400/30 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Book Free Strategy Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/90 hover:text-orange-300 transition-colors duration-300 p-2 rounded-lg hover:bg-purple-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <motion.div 
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-orange-500/90 via-purple-600/90 to-black/90 rounded-lg mt-2 backdrop-blur-xl border border-purple-400/30 shadow-lg shadow-purple-500/20">
            <a 
              href="#who-we-help" 
              className="block px-3 py-2 text-white/90 hover:text-orange-300 transition-colors duration-300 rounded-lg hover:bg-purple-500/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Who We Help
            </a>
            <a 
              href="#services" 
              className="block px-3 py-2 text-white/90 hover:text-orange-300 transition-colors duration-300 rounded-lg hover:bg-purple-500/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              className="block px-3 py-2 text-white/90 hover:text-orange-300 transition-colors duration-300 rounded-lg hover:bg-purple-500/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <button 
              className="w-full mt-3 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white px-4 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 border border-purple-400/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Free Strategy Call
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
