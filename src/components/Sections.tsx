import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const AICanCodeFastSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true });

  // 3D transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const cardsY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const benefits = [
    {
      title: "Save £20k–£100k a Year",
      description: "Replace expensive SaaS subscriptions with software you own forever.",
      icon: "💰",
      color: "from-green-400 to-emerald-600"
    },
    {
      title: "Own Your Software & Future",
      description: "Complete ownership, full source code, no vendor lock-in ever.",
      icon: "🔐",
      color: "from-orange-400 to-red-600"
    },
    {
      title: "Go Live in Days, Not Months",
      description: "Modern development practices mean rapid deployment without corners cut.",
      icon: "⚡",
      color: "from-blue-400 to-purple-600"
    },
    {
      title: "No Vendor Lock-In",
      description: "Your code, your servers, your data. Switch providers anytime you want.",
      icon: "🔓",
      color: "from-purple-400 to-pink-600"
    },
    {
      title: "Tech Tailored for YOU",
      description: "Built around how you work, not forced into someone else's template.",
      icon: "🎯",
      color: "from-cyan-400 to-blue-600"
    },
    {
      title: "Human-First Approach",
      description: "Real people who understand your mission, not just your code.",
      icon: "👥",
      color: "from-orange-400 to-yellow-600"
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white overflow-hidden"
      style={{ 
        perspective: '1000px',
        opacity,
        rotateX,
        rotateY,
        scale
      }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        {/* Neural Network Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,165,0,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147,51,234,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)
            `,
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        />
        
        {/* Code-like Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,165,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,165,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
          }}
        />
      </motion.div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {['{ }', '</>', '( )', '[ ]', '&&', '||', '=>', '++'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-orange-400/20 font-mono text-2xl"
            animate={{
              y: [-20, -40, -20],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Title */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          style={{ y: cardsY }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block text-white">AI Can Code </span>
            <span 
              className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
              style={{
                transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
              }}
            >
              Fast.
            </span>
          </motion.h2>
          
          <motion.h3
            className="text-2xl md:text-4xl font-light text-gray-300 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            But Prototypes <span className="text-orange-400 font-semibold">Aren't Products.</span>
          </motion.h3>

          <motion.p
            className="text-lg md:text-xl max-w-4xl mx-auto text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            You've built something brilliant with AI tools like <span className="text-orange-400 font-semibold">v0, Claude, or Cursor</span>. 
            Now you need it live, secure, and scalable. We bridge that gap — turning your prototype into a 
            <span className="text-white font-semibold"> production-ready product you actually own</span>.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ y: cardsY }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-orange-500/20 hover:border-orange-400/50 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              animate={titleInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 1.2 + (index * 0.2),
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: '0 25px 50px rgba(255,165,0,0.15)'
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <motion.div 
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {benefit.icon}
              </motion.div>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-300">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover Effect Line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const WhoWeHelpSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true });

  // 3D transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const cardsY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const techInnovators = [
    { name: "Indie hackers", icon: "🚀" },
    { name: "AI-native builders", icon: "🤖" },
    { name: "Startup founders", icon: "💡" },
    { name: "Product teams", icon: "👥" },
    { name: "Solo developers", icon: "💻" },
    { name: "Tech entrepreneurs", icon: "⚡" }
  ];

  const missionDriven = [
    { name: "Muslim charities", icon: "🕌" },
    { name: "Faith organisations", icon: "✨" },
    { name: "Non-profits", icon: "💚" },
    { name: "Social enterprises", icon: "🌍" },
    { name: "Ethical SMEs", icon: "⚖️" },
    { name: "Community groups", icon: "🤝" }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="who-we-help" 
      className="relative min-h-screen py-20 bg-gradient-to-b from-slate-800 via-slate-900 to-black text-white overflow-hidden"
      style={{ 
        perspective: '1000px',
        opacity,
        rotateX,
        rotateY,
        scale
      }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        {/* Tech Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(255,165,0,0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(59,130,246,0.08) 0%, transparent 50%)
            `,
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`
          }}
        />
        
        {/* Hexagonal Grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,165,0,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,165,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />
      </motion.div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {['🚀', '💡', '🤖', '⚡', '💻', '🌍'].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            animate={{
              y: [-10, -30, -10],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.8
            }}
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${10 + (i % 2) * 70}%`,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Title */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          style={{ y: cardsY }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 80 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px, 0)`
            }}
          >
            <span className="text-white">Who's This </span>
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">For?</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            We work with two types of brilliant people: 
            <span className="text-orange-400 font-semibold"> tech innovators who build fast</span>, and 
            <span className="text-white font-semibold"> mission-driven organisations</span> who need software that serves their purpose.
          </motion.p>
        </motion.div>

        {/* Two Main Categories */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
          style={{ y: cardsY }}
        >
          {/* Tech Innovators & Founders */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            animate={titleInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 h-full">
              {/* Category Header */}
              <motion.div className="mb-8">
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="text-4xl mr-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    🚀
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Tech Innovators & Founders
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  You're AI-native. You build fast. You want to 
                  <span className="text-orange-400 font-semibold"> own your stack</span> and ship real products.
                </p>
              </motion.div>

              {/* Tech Categories Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {techInnovators.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-4 bg-slate-700/30 rounded-xl border border-orange-500/10 hover:border-orange-400/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 + (index * 0.1) }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <motion.span 
                      className="text-2xl mr-3"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mission-Driven Organisations */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            animate={titleInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            whileHover={{ scale: 1.02, rotateY: -2 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 h-full">
              {/* Category Header */}
              <motion.div className="mb-8">
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="text-4xl mr-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    💚
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Charities & Mission-Driven Orgs
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  You're tired of expensive SaaS that doesn't fit. You want 
                  <span className="text-blue-400 font-semibold"> technology that serves your mission</span>.
                </p>
              </motion.div>

              {/* Mission-Driven Categories Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {missionDriven.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-4 bg-slate-700/30 rounded-xl border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.6 + (index * 0.1) }}
                    whileHover={{ scale: 1.05, x: -5 }}
                  >
                    <motion.span 
                      className="text-2xl mr-3"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true });

  // 3D transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const cardsY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -60]);
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const services = [
    {
      title: "Free Strategy Call",
      description: "30-minute consultation to review your prototype and plan the fastest route to production.",
      icon: "📞",
      color: "from-emerald-400 to-teal-600",
      borderColor: "emerald-400/30",
      delay: 0.2
    },
    {
      title: "Co-Creation Sprints",
      description: "Collaborative workshops to refine your vision and design the perfect production architecture.",
      icon: "🚀",
      color: "from-blue-400 to-indigo-600",
      borderColor: "blue-400/30",
      delay: 0.4
    },
    {
      title: "Vibe-to-Prod Engineering",
      description: "Rapid transformation from prototype to production-ready app, typically in 1-3 weeks.",
      icon: "⚡",
      color: "from-orange-400 to-red-600",
      borderColor: "orange-400/30",
      delay: 0.6
    },
    {
      title: "Last-Mile DevOps",
      description: "Secure hosting, monitoring, backups, and maintenance so your app runs smoothly 24/7.",
      icon: "🛡️",
      color: "from-purple-400 to-pink-600",
      borderColor: "purple-400/30",
      delay: 0.8
    },
    {
      title: "SaaS Liberation Pack",
      description: "Replace multiple expensive SaaS tools with integrated custom solutions you own forever.",
      icon: "🔓",
      color: "from-cyan-400 to-blue-600",
      borderColor: "cyan-400/30",
      delay: 1.0
    },
    {
      title: "Pod as Your Tech Team",
      description: "Ongoing development support as your flexible, affordable in-house tech team.",
      icon: "👥",
      color: "from-yellow-400 to-orange-600",
      borderColor: "yellow-400/30",
      delay: 1.2
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="services" 
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white overflow-hidden"
      style={{ 
        perspective: '1200px',
        opacity,
        rotateX,
        rotateY,
        scale
      }}
    >
      {/* Futuristic Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ y: backgroundY }}
      >
        {/* Cyberpunk Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 25% 25%, rgba(255,165,0,0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(147,51,234,0.15) 0%, transparent 50%)
            `,
            backgroundSize: '50px 50px, 50px 50px, 400px 400px, 400px 400px',
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
          }}
        />
        
        {/* Floating Tech Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                y: [-20, -100, -20],
                x: [0, Math.sin(i) * 30, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Holographic Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: floatingY }}
      >
        {['◊', '◈', '◇', '◆', '○', '□', '△'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/30 text-3xl font-thin"
            animate={{
              y: [-30, -60, -30],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8
            }}
            style={{
              left: `${5 + (i * 14)}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Title */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-20"
          style={{ y: cardsY }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
            }}
          >
            <span className="block text-white mb-4">From Prototype To</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-orange-400 to-purple-600 bg-clip-text text-transparent">
              Production-Ready Product
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            We take your AI-generated code and transform it into a 
            <span className="text-orange-400 font-semibold"> secure, scalable application </span>
            that you <span className="text-cyan-400 font-semibold">own and control</span>.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          style={{ y: cardsY }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group relative p-8 bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-${service.borderColor} hover:border-${service.borderColor.replace('/30', '/60')} transition-all duration-700 overflow-hidden`}
              initial={{ opacity: 0, y: 120, rotateX: -20 }}
              animate={titleInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 1, 
                delay: 1 + service.delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.08,
                rotateY: 8,
                rotateX: 5,
                z: 50,
                boxShadow: '0 30px 60px rgba(0,255,255,0.2)'
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Holographic Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
              
              {/* Animated Border Glow */}
              <motion.div 
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-30 blur-xl`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
              
              {/* Icon with 3D effect */}
              <motion.div 
                className="relative z-10 text-5xl mb-6 flex items-center justify-center w-20 h-20 mx-auto"
                animate={{ 
                  rotateY: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  delay: index * 0.8
                }}
                whileHover={{
                  scale: 1.3,
                  rotateZ: 15
                }}
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur-lg opacity-50`} />
                  <div className="relative bg-slate-700/50 rounded-2xl p-3 backdrop-blur-sm">
                    {service.icon}
                  </div>
                </div>
              </motion.div>
              
              {/* Title with gradient */}
              <motion.h3 
                className="relative z-10 text-2xl md:text-3xl font-bold mb-6 text-center"
                whileHover={{
                  scale: 1.05
                }}
              >
                <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-500`}>
                  {service.title}
                </span>
              </motion.h3>
              
              {/* Description */}
              <p className="relative z-10 text-gray-400 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed text-center">
                {service.description}
              </p>

              {/* Interactive Particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${service.color} rounded-full`}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.sin(i) * 10, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: `${10 + (i % 3) * 30}%`,
                    }}
                  />
                ))}
              </div>

              {/* Bottom Glow Effect */}
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true });

  // 3D transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 6]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const stepsY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const connectorsY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 35;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 35;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const steps = [
    {
      number: "1",
      title: "You Build With AI",
      description: "Create your prototype using v0, Claude, Cursor, or any AI coding tool.",
      icon: "🤖",
      color: "from-purple-400 to-indigo-600",
      borderColor: "purple-400/40",
      bgGlow: "purple-500/20"
    },
    {
      number: "2",
      title: "We Audit & Refactor",
      description: "Review your code for security, performance, and production readiness.",
      icon: "🔍",
      color: "from-orange-400 to-red-600",
      borderColor: "orange-400/40",
      bgGlow: "orange-500/20"
    },
    {
      number: "3",
      title: "We Add Production Features",
      description: "Authentication, APIs, databases, monitoring — everything you need.",
      icon: "⚙️",
      color: "from-cyan-400 to-blue-600",
      borderColor: "cyan-400/40",
      bgGlow: "cyan-500/20"
    },
    {
      number: "4",
      title: "We Deploy It Live",
      description: "Secure hosting and deployment — fully yours, no vendor lock-in.",
      icon: "🚀",
      color: "from-green-400 to-emerald-600",
      borderColor: "green-400/40",
      bgGlow: "green-500/20"
    },
    {
      number: "5",
      title: "Optional Long-Term Support",
      description: "Ongoing maintenance and enhancements as your product grows.",
      icon: "🛠️",
      color: "from-pink-400 to-rose-600",
      borderColor: "pink-400/40",
      bgGlow: "pink-500/20"
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="how-it-works" 
      className="relative min-h-screen py-20 bg-gradient-to-b from-slate-800 via-slate-900 to-black text-white overflow-hidden"
      style={{ 
        perspective: '1500px',
        opacity,
        rotateX,
        rotateY,
        scale
      }}
    >
      {/* Futuristic Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        {/* Tech Circuit Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.08) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0,255,255,0.08) 2px, transparent 2px),
              radial-gradient(circle at 20% 40%, rgba(147,51,234,0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, rgba(59,130,246,0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(16,185,129,0.12) 0%, transparent 50%)
            `,
            backgroundSize: '80px 80px, 80px 80px, 600px 600px, 600px 600px, 600px 600px',
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`
          }}
        />
        
        {/* Data Flow Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-24 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
              animate={{
                y: [-100, window.innerHeight + 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-100px`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Process Icons */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: connectorsY }}
      >
        {['◢', '◣', '◤', '◥', '▼', '▲'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400/20 text-4xl font-bold"
            animate={{
              y: [-20, -50, -20],
              rotate: [0, 180, 360],
              scale: [0.9, 1.3, 0.9],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              delay: i * 1.2
            }}
            style={{
              left: `${10 + (i * 16)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Title */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-20"
          style={{ y: stepsY }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
            }}
          >
            <span className="block text-white mb-4">How It</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Our proven process takes you from 
            <span className="text-purple-400 font-semibold"> AI prototype </span>
            to <span className="text-cyan-400 font-semibold">production-ready product</span> in record time.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div 
          className="relative max-w-6xl mx-auto"
          style={{ y: stepsY }}
        >
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/30 via-cyan-500/30 to-pink-500/30 transform -translate-x-1/2 hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-purple-400 via-cyan-400 to-pink-400"
              initial={{ height: 0 }}
              animate={titleInView ? { height: '100%' } : {}}
              transition={{ duration: 2, delay: 1 }}
            />
          </div>

          {/* Steps Grid */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200, rotateY: index % 2 === 0 ? -20 : 20 }}
                animate={titleInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: 1.2 + (index * 0.3),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Step Number Circle */}
                <motion.div
                  className="relative z-20 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.2,
                    rotateY: 15,
                    z: 50
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`relative w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-${step.borderColor} bg-gradient-to-br ${step.color} backdrop-blur-sm shadow-2xl`}>
                    {/* Pulsing Glow Effect */}
                    <motion.div 
                      className={`absolute inset-0 rounded-full bg-${step.bgGlow} blur-xl`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                    />
                    
                    {/* Number */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-3xl lg:text-4xl font-black text-white">
                      {step.number}
                    </div>
                    
                    {/* Icon Overlay */}
                    <motion.div
                      className="absolute -top-2 -right-2 text-2xl"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.6
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Step Content */}
                <motion.div
                  className={`flex-1 text-center lg:text-left ${
                    index % 2 === 1 ? 'lg:text-right' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`relative p-8 lg:p-12 bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-${step.borderColor} hover:border-${step.borderColor.replace('/40', '/80')} transition-all duration-700 overflow-hidden group`}>
                    {/* Background Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                    
                    {/* Animated Border Lines */}
                    <motion.div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`}
                      initial={{ scaleX: 0 }}
                      animate={titleInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1, delay: 1.5 + (index * 0.2) }}
                    />
                    
                    <div className="relative z-10">
                      <motion.h3 
                        className="text-2xl lg:text-4xl font-bold mb-6"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-500`}>
                          {step.title}
                        </span>
                      </motion.h3>
                      
                      <p className="text-lg lg:text-xl text-gray-400 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover Particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`}
                          animate={{
                            y: [0, -30, 0],
                            x: [0, Math.sin(i) * 20, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                          style={{
                            left: `${20 + (i * 15)}%`,
                            top: `${15 + (i % 2) * 70}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true });

  // 3D transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -60]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const testimonials = [
    {
      quote: "Cloud Surge took my AI-coded prototype and had it live in five days. It's saving us over £30k/year compared to SaaS fees. The team understood exactly what we needed.",
      author: "Startup Founder",
      gradient: "from-emerald-400 to-teal-600",
      icon: "🚀"
    },
    {
      quote: "We're a charity, and they built exactly what we needed instead of forcing us into generic tools. Our community management system is perfect for how we actually work.",
      author: "Non-Profit Director",
      gradient: "from-blue-400 to-purple-600",
      icon: "💚"
    }
  ];

  const stats = [
    { value: "£2M+", label: "Saved in SaaS Costs", gradient: "from-green-400 to-emerald-600", icon: "💰" },
    { value: "100+", label: "Apps Shipped", gradient: "from-cyan-400 to-blue-600", icon: "📦" },
    { value: "98%", label: "Client Satisfaction", gradient: "from-purple-400 to-pink-600", icon: "⭐" },
    { value: "2 weeks", label: "Average Ship Time", gradient: "from-orange-400 to-red-600", icon: "⚡" }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white overflow-hidden"
      style={{ perspective: '1300px', opacity, rotateX, rotateY, scale }}
    >
      {/* Holographic Background */}
      <motion.div 
        className="absolute inset-0 opacity-25"
        style={{ y: backgroundY }}
      >
        {/* Success Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px),
              radial-gradient(circle at 15% 35%, rgba(59,130,246,0.12) 0%, transparent 50%),
              radial-gradient(circle at 85% 65%, rgba(147,51,234,0.12) 0%, transparent 50%)
            `,
            backgroundSize: '60px 60px, 60px 60px, 500px 500px, 500px 500px',
            transform: `translate(${mousePosition.x * 0.25}px, ${mousePosition.y * 0.25}px)`
          }}
        />
        {/* Success Sparkles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              animate={{
                scale: [0.8, 1.4, 0.8],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {['✨', '⭐', '💫', '🌟'][i % 4]}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="relative z-10 container mx-auto px-4">
        {/* Main Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
          style={{ y: contentY }}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px, 0)`
            }}
          >
            <span className="block text-white mb-4">Real Results From</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Real People
            </span>
          </motion.h2>
        </motion.div>
        {/* Testimonials */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20"
          style={{ y: contentY }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative p-8 lg:p-10 bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-slate-600/30 hover:border-emerald-400/50 transition-all duration-700 overflow-hidden group"
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              animate={titleInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.8 + (index * 0.3),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 3,
                boxShadow: '0 25px 50px rgba(16,185,129,0.15)'
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Holographic Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
              {/* Quote Icon */}
              <motion.div
                className="absolute -top-4 -left-4 text-6xl opacity-20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                "
              </motion.div>
              <div className="relative z-10">
                {/* Testimonial Icon */}
                <motion.div
                  className="text-3xl mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {testimonial.icon}
                </motion.div>
                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-gray-300 group-hover:text-gray-200 transition-colors duration-500 mb-8 leading-relaxed italic">
                  {testimonial.quote}
                </blockquote>
                {/* Author */}
                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-cyan-600 mr-4 rounded-full" />
                  <cite className={`text-lg font-semibold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent not-italic`}>
                    — {testimonial.author}
                  </cite>
                </motion.div>
              </div>
              {/* Hover Particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                    animate={{
                      y: [0, -25, 0],
                      x: [0, Math.sin(i) * 15, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      left: `${20 + (i * 20)}%`,
                      top: `${20 + (i % 2) * 60}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Statistics */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          style={{ y: contentY }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative text-center p-6 lg:p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/20 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden group"
              initial={{ opacity: 0, y: 80, rotateY: -10 }}
              animate={titleInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.4 + (index * 0.15),
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.08,
                rotateY: 8,
                boxShadow: '0 20px 40px rgba(6,182,212,0.15)'
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
              {/* Icon */}
              <motion.div
                className="text-3xl mb-3"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: index * 0.7
                }}
              >
                {stat.icon}
              </motion.div>
              {/* Value */}
              <motion.div
                className={`text-3xl lg:text-4xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              {/* Label */}
              <div className="text-sm lg:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                {stat.label}
              </div>
              {/* Bottom Line Effect */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true });

  // 3D transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 6]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 25;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 25;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-gradient-to-b from-slate-800 via-slate-900 to-black text-white overflow-hidden flex items-center"
      style={{ perspective: '1000px', opacity, rotateX, rotateY, scale }}
    >
      {/* Energetic Background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ y: backgroundY }}
      >
        {/* Call-to-Action Energy Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255,165,0,0.15) 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, rgba(6,182,212,0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(147,51,234,0.15) 0%, transparent 50%)
            `,
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        />
        {/* Pulsing Energy Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-orange-400/20 rounded-full"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.8
              }}
            />
          ))}
        </div>
        {/* Action Sparks */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              animate={{
                y: [-30, -60, -30],
                x: [0, Math.sin(i) * 40, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {['🚀', '⚡', '🔥', '💫'][i % 4]}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          ref={titleRef}
          style={{ y: contentY }}
        >
          {/* Main CTA Title */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`
            }}
          >
            <span className="block text-white mb-4">Ready To Ship</span>
            <span className="block bg-gradient-to-r from-orange-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              What AI Started?
            </span>
          </motion.h2>
          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Stop letting brilliant prototypes gather digital dust. Let's turn your 
            <span className="text-orange-400 font-semibold"> AI-generated code </span>
            into a <span className="text-cyan-400 font-semibold">production-ready product</span> you own and control.
          </motion.p>
          {/* CTA Button */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.button
              className="relative group px-12 py-6 text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-2xl border-2 border-orange-400/50 hover:border-orange-300 transition-all duration-500 transform-gpu overflow-hidden"
              whileHover={{
                boxShadow: '0 20px 40px rgba(251,146,60,0.3)',
                rotateX: -5
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              {/* Button Text */}
              <span className="relative z-10 flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📞
                </motion.span>
                Book Your Free Strategy Call
              </span>
              {/* Animated Particles inside button */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    animate={{
                      x: [0, 20, 0],
                      y: [0, -10, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    style={{
                      left: `${20 + (i * 30)}%`,
                      top: `${50}%`,
                    }}
                  />
                ))}
              </div>
            </motion.button>
          </motion.div>
          {/* CTA Benefits */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-8 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {[{
              icon: "🆓",
              text: "Free 30-minute consultation"
            },
            {
              icon: "🎯",
              text: "Immediate next steps"
            },
            {
              icon: "✨",
              text: "No obligation"
            }].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05, color: '#f3f4f6' }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {benefit.icon}
                </motion.span>
                <span className="text-sm md:text-base">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export { AICanCodeFastSection, WhoWeHelpSection, ServicesSection, HowItWorksSection, TestimonialsSection, CTASection }
