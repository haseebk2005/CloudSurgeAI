import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const VibeToProdServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  
  // Scroll transforms
  const backgroundY = useTransform(scrollY, [0, 400], [0, 100]);

  // Mouse parallax effect for this section only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const { clientX, clientY } = e;
        
        // Check if mouse is within this section
        if (clientX >= rect.left && clientX <= rect.right && 
            clientY >= rect.top && clientY <= rect.bottom) {
          const x = ((clientX - rect.left) / rect.width - 0.5) * 20;
          const y = ((clientY - rect.top) / rect.height - 0.5) * 20;
          setMousePosition({ x, y });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[30vh] overflow-hidden bg-white text-black flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-15"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 via-orange-600/20 to-orange-500/15" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251,146,60,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251,146,60,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            animate={{
              y: [-20, -80],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Side - Text Content */}
        <motion.div 
          className="text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Main Headlines */}
          <motion.div 
            className="mb-4"
            style={{
              transform: `rotateY(${mousePosition.x * 0.3}deg) rotateX(${mousePosition.y * -0.2}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <motion.h1 
              className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 bg-gradient-to-r from-gray-800 via-orange-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              You Coded It With AI.
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl lg:text-3xl font-black mb-3 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Let's Launch It For Real.
            </motion.h2>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-base md:text-lg mb-3 text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Ship your AI-generated app into production. Own it. Scale it. No subscriptions. No lock-in.
          </motion.p>

          {/* Guarantee Text */}
          <motion.p 
            className="text-xs md:text-sm text-gray-600 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Free 30-minute consultation • No obligation • Immediate next steps
          </motion.p>
        </motion.div>

        {/* Right Side - Action Buttons */}
        <motion.div 
          className="flex flex-col gap-3 items-center lg:items-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.button
            className="group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-bold text-base shadow-xl w-full max-w-xs"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px -12px rgba(251,146,60,0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Book Your Free Strategy Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            className="group relative px-6 py-3 border-2 border-purple-500 rounded-full text-purple-600 font-bold text-base hover:text-white transition-colors duration-300 w-full max-w-xs"
            whileHover={{ 
              scale: 1.05,
              borderColor: '#a855f7',
              boxShadow: '0 20px 40px -12px rgba(168,85,247,0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">See How It Works</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VibeToProdServices;
