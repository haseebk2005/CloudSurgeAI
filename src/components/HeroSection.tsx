import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  
  // 3D scroll transforms
  const rotateX = useTransform(scrollY, [0, 400], [0, 15]);
  const rotateY = useTransform(scrollY, [0, 400], [0, -10]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, -100]);
  const backgroundY = useTransform(scrollY, [0, 400], [0, 200]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef} 
      id="hero" 
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,165,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,165,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
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
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
        style={{
          rotateX,
          rotateY,
          scale,
          opacity,
        }}
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Glowing Title */}
          <motion.div
            style={{ y: textY }}
            className="relative"
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,165,0,0.5)',
                  '0 0 40px rgba(255,165,0,0.8)',
                  '0 0 20px rgba(255,165,0,0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
              }}
            >
              <span className="block">VIBE-TO-PROD</span>
              <span className="block text-5xl md:text-7xl lg:text-8xl mt-4">SERVICES</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-2xl md:text-4xl mb-8 font-light tracking-wide">
              <span className="text-orange-400">You Coded It With AI.</span>
              <br />
              <span className="text-white">Let's Launch It </span>
              <span className="text-orange-400 font-bold">For Real.</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl max-w-4xl mx-auto mb-12 text-gray-300 leading-relaxed"
            style={{ y: textY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Ship your AI-generated app into production. Own it. Scale it. 
            <span className="text-orange-400 font-semibold"> No subscriptions. No lock-in.</span>
          </motion.p>

          {/* CTA Buttons with 3D Effects */}
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8 mb-8"
            style={{ y: textY }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.a
              href="#"
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full text-lg shadow-lg overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255,165,0,0.4)',
                rotateX: -5
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="relative z-10">Book Your Free Strategy Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href="#how-it-works"
              className="group px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-400 hover:text-white font-bold rounded-full text-lg relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(255,165,0,0.2)',
                rotateX: 5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">See How It Works</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          </motion.div>

          {/* Benefits Badge */}
          <motion.div
            className="flex justify-center"
            style={{ y: textY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3">
              <p className="text-sm text-gray-300">
                <span className="text-orange-400 font-semibold">Free 30-minute consultation</span>
                <span className="mx-2">•</span>
                <span>No obligation</span>
                <span className="mx-2">•</span>
                <span>Immediate next steps</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="flex flex-col items-center text-orange-400">
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-orange-400 rounded-full mt-2"
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
