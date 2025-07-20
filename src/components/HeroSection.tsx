import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-500 via-purple-600 to-black text-white"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/15 via-purple-600/20 to-purple-500/15" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px)
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
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
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
        className="relative z-10 flex items-center justify-center min-h-screen"
        style={{
          opacity,
        }}
      >
        {/* Centered Spline Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-full h-full max-w-4xl max-h-4xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Spline scene="https://prod.spline.design/T-E4O2fGd11JT60v/scene.splinecode" />
          </motion.div>
        </div>
        
        {/* Overlaid Title */}
        <div className="relative z-20 text-center" style={{ perspective: '800px' }}>
          <motion.div 
            className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-tight text-orange-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* First Line - VIBE-TO-PROD with cylindrical curve */}
            <div className="block relative mb-4">
              {['V', 'I', 'B', 'E', '-', 'T', 'O', '-', 'P', 'O', 'D'].map((char, index) => {
                const totalChars = 11;
                const centerIndex = (totalChars - 1) / 2;
                const distanceFromCenter = index - centerIndex;
                const rotateY = distanceFromCenter * 12; // Degrees of Y rotation
                const translateZ = Math.abs(distanceFromCenter) * -10; // Push back sides
                
                return (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                      transformOrigin: 'center center'
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
            
            {/* Second Line - SERVICES with cylindrical curve */}
            <div className="block relative text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
              {['S', 'E', 'R', 'V', 'I', 'C', 'E', 'S'].map((char, index) => {
                const totalChars = 8;
                const centerIndex = (totalChars - 1) / 2;
                const distanceFromCenter = index - centerIndex;
                const rotateY = distanceFromCenter * 10; // Degrees of Y rotation
                const translateZ = Math.abs(distanceFromCenter) * -12; // Push back sides
                
                return (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                      transformOrigin: 'center center'
                    }}
                  >
                    {char}
                  </span>
                );
              })}
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
        <div className="flex flex-col items-center text-purple-400">
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-purple-400 rounded-full mt-2"
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
