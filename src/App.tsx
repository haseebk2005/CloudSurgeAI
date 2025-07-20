
function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-black text-white py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,165,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,165,0,0.05) 1px, transparent 1px),
              radial-gradient(circle at 20% 50%, rgba(147,51,234,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)
            `,
            backgroundSize: '60px 60px, 60px 60px, 600px 600px, 600px 600px'
          }}
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {['◊', '◈', '◇', '○', '□'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-orange-400/20 text-2xl font-thin animate-pulse"
            style={{
              left: `${10 + (i * 20)}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Main Tagline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-purple-500 bg-clip-text text-transparent">
              Cloud Surge
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            The human bridge between AI code and real-world impact.
          </p>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Services */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 text-orange-400">Services</h3>
            <ul className="space-y-3">
              {[
                "Free Strategy Call",
                "Vibe-to-Prod Engineering", 
                "Co-Creation Sprints",
                "SaaS Liberation",
                "Pod as Your Tech Team"
              ].map((service, i) => (
                <li key={i} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                  <span className="text-orange-400 mr-2">▸</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Who We Help */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 text-purple-400">Who We Help</h3>
            <ul className="space-y-3">
              {[
                "Tech Innovators & Founders",
                "Charities & Non-Profits",
                "Faith-Based Organisations",
                "Social Enterprises",
                "Ethical SMEs"
              ].map((audience, i) => (
                <li key={i} className="text-gray-300 hover:text-white transition-colors duration-300">
                  <span className="text-purple-400 mr-2">▸</span>
                  {audience}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 text-cyan-400">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <p className="hover:text-white transition-colors duration-300">
                <span className="text-cyan-400 mr-2">📧</span>
                info@cloudsurge.uk
              </p>
              <p className="hover:text-white transition-colors duration-300">
                <span className="text-cyan-400 mr-2">📞</span>
                0121 212 5060
              </p>
              <p className="hover:text-white transition-colors duration-300 text-sm leading-relaxed">
                <span className="text-cyan-400 mr-2">📍</span>
                7 St James Place, Nechells,<br />
                Birmingham. B7 4JE.<br />
                United Kingdom
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="text-sm mb-4 md:mb-0">
            Cloud Surge Solutions Ltd trading as Cloud Surge is a company registered in England and Wales: company number 14421129.
          </p>
          <p className="text-sm">
            Copyright © 2025 Cloud Surge Solutions Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import { AICanCodeFastSection, WhoWeHelpSection, ServicesSection, HowItWorksSection, TestimonialsSection, CTASection } from './components/Sections'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <AICanCodeFastSection />
      <WhoWeHelpSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
