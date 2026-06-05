import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Award, 
  Users, 
  ChevronRight,
  ChevronLeft,
  Activity,
  Heart,
  Zap,
  Coffee,
  ShoppingBag,
  Stethoscope,
  MessageSquare,
  ClipboardList,
  Sparkles,
  Globe,
  Truck
} from 'lucide-react';
import { Product, PackageData, BlogPost } from '../types';
import { CONFIG } from '../config';
import { ProductCard } from './ProductCard';
import { PackageCard } from './PackageCard';
import { ComboCard } from './ComboCard';
import { Testimonials } from './Testimonials';
import { getOptimizedImageUrl } from '../utils/cloudinary';

interface HomeProps {
  products: Product[];
  comboPackages: PackageData[];
  recommendedPackages?: PackageData[];
  onNavigate: (tab: string) => void;
  onOrderProduct: (product: Product) => void;
  onOrderPackage: (pkg: PackageData) => void;
  onOrderComboItem?: (item: any, type: 'package' | 'product', qty: number) => void;
  onViewProduct: (product: Product) => void;
  onSelectBlog: (id: string) => void;
  onOpenChat: () => void;
}

export function Home({ 
  products, 
  comboPackages, 
  recommendedPackages = [],
  onNavigate, 
  onOrderProduct, 
  onOrderPackage, 
  onOrderComboItem,
  onViewProduct,
  onSelectBlog,
  onOpenChat
}: HomeProps) {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const trendingScrollRef = useRef<HTMLDivElement>(null);
  const recScrollRef = useRef<HTMLDivElement>(null);
  const comboScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setRecentBlogs(data.slice(0, 3));
        }
      } catch (e) {
        console.error("Failed to fetch blogs", e);
      }
    };
    fetchBlogs();
  }, []);

  // Auto-scroll for Trending Products
  useEffect(() => {
    if (products.length <= 4) return;
    const timer = setInterval(() => {
      if (trendingScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = trendingScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          trendingScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          trendingScrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [products.length]);

  // Auto-scroll for Recommended Packages
  useEffect(() => {
    if (recommendedPackages.length <= 1) return;
    const timer = setInterval(() => {
      if (recScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = recScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          recScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          recScrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [recommendedPackages.length]);

  // Auto-scroll for Combo Packages
  useEffect(() => {
    if (comboPackages.length <= 1) return;
    const timer = setInterval(() => {
      if (comboScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = comboScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          comboScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          comboScrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [comboPackages.length]);

  const scrollPrev = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -ref.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: ref.current.clientWidth, behavior: 'smooth' });
    }
  };

  // Get top 4 products for bestsellers
  const bestSellers = products.slice(0, 4);

  const heroImages = CONFIG.heroImages;

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="space-y-8 md:space-y-10 pb-12">
      
      {/* 1. Hero Section - Majestic Editorial Split Brand Grid */}
      <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 flex items-center py-10 md:py-16">
        {/* Subtle atmospheric ambient glow effects */}
        <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden pointer-events-none z-0 opacity-40">
          <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[160px]"></div>
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-teal-600 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Brand Column (Editorial Text & Main Call To Action) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-400/25 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-emerald-400"
            >
              <Sparkles size={12} className="animate-pulse" />
              <span>Global Wellness Portfolio</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-sans font-black tracking-tight text-white leading-[1.05]">
                RECLAIM <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-serif font-black italic">YOUR VITALITY</span> <br />
                CONQUER CHRONIC <br />
                AILMENTS.
              </h1>
              <p className="text-base md:text-xl text-slate-200 font-semibold leading-relaxed max-w-2xl bg-slate-950/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5">
                Join over <span className="text-emerald-400 underline decoration-2 decoration-teal-400">45,000+ healthy Nigerians</span>. Professional-grade Traditional Chinese Medicine & NAFDAC-approved herbal formulations targeting cells to heal disease from the roots up.
              </p>
            </motion.div>

            {/* Crucial Trust Selling Bullet Points */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2.5 text-slate-300 text-sm font-bold w-full"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-emerald-500/20 border border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center text-xs shrink-0 font-extrabold">✓</span>
                <span>NAFDAC Certified Formulas: 100% Safe, Tested, and Non-Toxic</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-emerald-500/20 border border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center text-xs shrink-0 font-extrabold">✓</span>
                <span>Premium Traditional Chinese Medicine (TCM) with Bio-Active Organic Extracts</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-emerald-500/20 border border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center text-xs shrink-0 font-extrabold">✓</span>
                <span>Pay on Delivery across Nigeria, with Free Express Delivery and real Tracking support</span>
              </div>
            </motion.div>

            {/* Interactive Symptom Helper - Instantly connect users to the right product */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-slate-900/40 p-4 rounded-3xl border border-white/10 w-full space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-400 tracking-wider">
                <Activity size={14} className="animate-pulse" />
                <span>What health solution are you looking for?</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Diabetes & Blood Sugar", searchKey: "dia" },
                  { label: "High Blood Pressure", searchKey: "tension" },
                  { label: "Fibroids & Infertility", searchKey: "female" },
                  { label: "Prostate Health", searchKey: "men" },
                  { label: "Ulcers & Stomach", searchKey: "sto" },
                  { label: "Detox & Total Purifying", searchKey: "tea" }
                ].map((ailment, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate('products');
                      // Wait short moment to allow tab state to mount input search box
                      setTimeout(() => {
                        const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
                        if (input) {
                          input.value = ailment.searchKey;
                          input.dispatchEvent(new Event('input', { bubbles: true }));
                          input.focus();
                        }
                      }, 100);
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-white text-slate-300 border border-white/10 transition-all duration-300 shadow-sm"
                  >
                    + {ailment.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-base tracking-wide hover:from-emerald-400 hover:to-teal-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_10px_35px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2"
              >
                <span>Shop Certified Formulas</span>
                <ShoppingBag size={18} />
              </button>
              <button
                onClick={() => onNavigate('consultation')}
                className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-extrabold text-base tracking-wide border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Ask Doctor / Consultation</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* Dynamic Real-time Marketing Stock alert */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xs font-bold text-amber-400/95 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>🔥 17 packages dispatched to Lagos, Port Harcourt, and Abuja in the last 2 hours of today! Stock is limited.</span>
            </motion.div>

            {/* Integrated Authority Badges below the CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Globe size={18} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase text-white tracking-wider leading-none mb-0.5">Free Delivery</h4>
                  <p className="text-[10px] text-slate-400/90 font-medium font-bold">Nigeria & Worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Leaf size={18} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase text-white tracking-wider leading-none mb-0.5">100% Organic</h4>
                  <p className="text-[10px] text-slate-400/90 font-medium font-bold">Bio-active herbal extracts</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase Rotating supplementing images */}
          <div className="lg:col-span-6 w-full flex flex-col items-center justify-center relative">
            <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] lg:aspect-square max-w-[520px] rounded-3xl overflow-hidden bg-slate-900/40 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm flex items-center justify-center p-4 group/carousel">
              
              {/* Image Track */}
              <div className="absolute inset-0">
                {heroImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center p-6 md:p-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: index === currentHeroIndex ? 1 : 0,
                      scale: index === currentHeroIndex ? 1 : 0.95
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Atmospheric Blurred backdrop overlay */}
                    <img 
                      src={getOptimizedImageUrl(img, 600)} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* Main transparent / product display */}
                    <img 
                      src={getOptimizedImageUrl(img, 800)} 
                      alt={`Featured Formula ${index + 1}`} 
                      className="relative max-w-full max-h-full object-contain z-10 select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/supplement-hero-${index}/800/600`;
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Slider Controls */}
              <button 
                onClick={() => setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-20 hover:scale-105"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-20 hover:scale-105"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>

              {/* Carousel Indicators overlaying the visual */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentHeroIndex ? "bg-emerald-400 w-8" : "bg-white/20 w-3 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Authority Bar (Mobile Only) */}
      <section className="lg:hidden bg-white py-6 shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Globe, title: "Free Delivery", desc: "Across Nigeria", highlight: true },
              { icon: Truck, title: "Worldwide", desc: "Any country", highlight: true },
              { icon: Leaf, title: "100% Organic", desc: "Pure herbal" },
              { icon: Award, title: "Expert Formulated", desc: "Backed by science" }
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 p-3 rounded-xl transition-all ${item.highlight ? 'bg-emerald-600 text-white shadow-lg' : 'bg-emerald-50 text-emerald-600'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.highlight ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <h4 className={`font-black text-[10px] uppercase tracking-tight leading-none mb-0.5 truncate ${item.highlight ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                  <p className={`text-[8px] font-bold truncate ${item.highlight ? 'text-emerald-100' : 'text-slate-500'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Individual Products */}
      <section className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-end justify-between mb-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Trending Now</h2>
            <div className="h-2 w-24 bg-emerald-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('products')} 
              className="hidden md:flex text-emerald-600 font-black text-lg items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest mr-4"
            >
              View All <ArrowRight size={24} />
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollPrev(trendingScrollRef)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scrollNext(trendingScrollRef)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
        <div 
          ref={trendingScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 pb-4"
        >
          {products.map(product => (
            <div 
              key={product.id} 
              className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <ProductCard 
                product={product}
                onQuickView={onViewProduct}
                onOrder={() => onOrderProduct(product)}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center md:hidden">
          <button 
            onClick={() => onNavigate('products')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-sm shadow-lg"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* 4. Expert Recommended Packages */}
      {recommendedPackages.length > 0 && (
        <section className="bg-slate-50 py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-6">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Health Solutions</h2>
                <p className="text-xl text-slate-500 font-bold">Curated packages for specific health needs.</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate('recommended')} 
                  className="hidden md:flex text-emerald-600 font-black text-lg items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest mr-4"
                >
                  View All <ArrowRight size={24} />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollPrev(recScrollRef)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => scrollNext(recScrollRef)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
            <div 
              ref={recScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-8 pb-8"
            >
              {recommendedPackages.map(pkg => (
                <div 
                  key={pkg.id} 
                  className="snap-start flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.3333%-1.5rem)]"
                >
                  <PackageCard 
                    data={pkg} 
                    allPackages={recommendedPackages} 
                    onOrder={() => onOrderPackage(pkg)} 
                    onViewProduct={onViewProduct} 
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 text-center md:hidden">
              <button 
                onClick={() => onNavigate('recommended')}
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-sm shadow-lg"
              >
                View All Solutions
              </button>
            </div>
          </div>
        </section>
      )}


      {/* 5. Combo Packs - Elderly Accessible Design */}
      {comboPackages.length > 0 && (
        <section className="bg-emerald-950 py-8 md:py-10 rounded-[3rem] mx-4 md:mx-8">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-10 space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Ultimate <span className="text-emerald-400">Combo Packs</span>
              </h2>
              <p className="text-2xl md:text-3xl text-emerald-100/80 max-w-4xl mx-auto font-bold leading-relaxed">
                Maximum value bundles designed for complete body restoration. Perfect for long-term wellness.
              </p>
              <div className="h-1.5 w-48 bg-emerald-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              {comboPackages.map(pkg => (
                <div key={pkg.id} className="w-full">
                  <ComboCard 
                    data={pkg} 
                    onOrder={onOrderComboItem || ((item) => onOrderPackage(item))} 
                    onProductClick={onViewProduct} 
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <button 
                onClick={() => onNavigate('combo')} 
                className="bg-emerald-500 text-white px-16 py-6 rounded-full font-black text-2xl hover:bg-emerald-400 transition-all shadow-3xl shadow-emerald-900/50 uppercase tracking-widest"
              >
                View All Master Kits
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 6. Testimonials Section */}
      <Testimonials onViewAll={() => onNavigate('testimonials')} />

      {/* 7. Ask Virtual Guide Teaser */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center border-4 border-emerald-100 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-300 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-10">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto shadow-2xl text-white mb-4 md:mb-8 rotate-3">
              <Sparkles size={32} className="md:hidden" />
              <Sparkles size={48} className="hidden md:block" />
            </div>
            <h2 className="text-3xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              Instant <span className="text-emerald-600">Health Chat</span>
            </h2>
            <p className="text-lg md:text-3xl text-slate-600 font-bold leading-relaxed">
              Have a quick question? Our Virtual Health Guide is available 24/7 for immediate guidance.
            </p>
            <div className="pt-4 md:pt-6">
              <button 
                onClick={onOpenChat}
                className="bg-emerald-600 text-white px-8 md:px-16 py-4 md:py-6 rounded-full font-black text-lg md:text-2xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 uppercase tracking-widest flex items-center justify-center gap-3 md:gap-4 mx-auto"
              >
                Chat with Virtual Guide <MessageSquare size={24} className="md:hidden" />
                <MessageSquare size={32} className="hidden md:block" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Education & Lifestyle (Blog) */}
      {recentBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Latest Health Insights</h2>
            <button onClick={() => onNavigate('blog')} className="text-emerald-600 font-bold flex items-center gap-1 hover:text-emerald-700 transition-colors">
              Read Journal <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {recentBlogs.map((post) => (
              <div 
                key={post.id} 
                className="group cursor-pointer"
                onClick={() => onSelectBlog(post.id)}
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-4 relative">
                  <img 
                    src={getOptimizedImageUrl(post.image_url || `https://picsum.photos/seed/supplement-blog-${post.id}/600/400`, 600)} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/healthcare-blog-${post.id}/600/400`;
                    }}
                  />
                  {post.category && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                      {post.category}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 font-medium">
                  {post.meta_description || post.content.substring(0, 100).replace(/[#*`]/g, '') + '...'}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
