import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  
  // Hover state for straightening text
  const [isHovered, setIsHovered] = useState(false);
  
  // Scroll transforms
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const backgroundY = useTransform(scrollY, [0, 400], [0, 200]);

  // Mouse parallax effect for hero section only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const { clientX, clientY } = e;
        
        // Check if mouse is within hero section
        if (clientX >= rect.left && clientX <= rect.right && 
            clientY >= rect.top && clientY <= rect.bottom) {
          const x = ((clientX - rect.left) / rect.width - 0.5) * 30;
          const y = ((clientY - rect.top) / rect.height - 0.5) * 30;
          setMousePosition({ x, y });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef} 
      id="hero" 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#] via-purple-600 to-black text-white"
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
        {[...Array(80)].map((_, i) => (
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
        
        {/* Transparent Overlay to Enable Scrolling */}
        <div className="absolute inset-0 z-10 pointer-events-none" />
        
        {/* Overlaid Title */}
        <div className="relative z-20 text-center" style={{ perspective: '1200px' }}>
          <motion.div 
            className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-tight text-white/60 cursor-pointer select-none pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transform: `rotateY(${mousePosition.x * 1.2}deg) rotateX(${mousePosition.y * -0.8}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* First Line - VIBE-TO-PROD with cylindrical curve */}
            <div className="block relative mb-4">
              {['V', 'I', 'B', 'E', '-', 'T', 'O', '-', 'P',  'O', 'D'].map((char, index) => {
                const totalChars = 11;
                const centerIndex = (totalChars - 1) / 2;
                const distanceFromCenter = index - centerIndex;
                const rotateY = isHovered ? 0 : distanceFromCenter * 15;
                const translateZ = isHovered ? 0 : Math.abs(distanceFromCenter) * -10;
                
                return (
                  <span
                    key={index}
                    className="inline-block transition-transform duration-300 ease-out"
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
                const rotateY = isHovered ? 0 : distanceFromCenter * 10;
                const translateZ = isHovered ? 0 : Math.abs(distanceFromCenter) * -12;
                
                return (
                  <span
                    key={index}
                    className="inline-block transition-transform duration-300 ease-out"
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
