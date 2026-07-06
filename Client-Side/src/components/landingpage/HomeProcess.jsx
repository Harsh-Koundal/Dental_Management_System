import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container, SectionHead } from '@/UI/Section';
import { PROCESS, B } from '@/data/constants';
import { motion } from 'framer-motion';
const PROCESS_IMAGES = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
];

function ProcessStep({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
        <img
          src={PROCESS_IMAGES[i]}
          alt={p.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
          style={{ background: B.blue }}
        >
          {i + 1}
        </div>
      </div>

      <div className="mt-4 px-2 md:mt-5">
        <h4 className="text-base md:text-xl font-black mb-1.5 md:mb-2 uppercase tracking-tight" style={{ color: B.text }}>
          {p.title}
        </h4>
        <p className="text-sm md:text-base leading-relaxed text-slate-600">
          {p.desc}
        </p>
      </div>
    </motion.div>
  );
}

function MobileSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PROCESS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? PROCESS.length - 1 : prevIndex - 1));
  };

  return (
    <div className="md:hidden mt-8 relative px-2">
      <div className="overflow-hidden rounded-2xl pb-4">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROCESS.map((p, i) => (
            <div key={i} className="min-w-full px-2">
              <ProcessStep p={p} i={i} />
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute top-[35%] -left-1 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1565c0] z-10 hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute top-[35%] -right-1 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1565c0] z-10 hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center gap-2 mt-2">
        {PROCESS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-[#f37121]' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomeProcess() {
  return (
    <Section id="process" className="bg-white">
      <Container>
        <SectionHead
          tag="Patient Journey"
          title="Your Path to a Perfect Smile"
          sub="A clear, step-by-step clinical process — from your first visit to your final smile reveal."
        />
        
        <MobileSlider />

        <div className="hidden md:flex flex-wrap justify-center gap-8 md:gap-12 mt-14 max-w-7xl mx-auto px-4">
          {PROCESS.map((p, i) => (
            <div key={i} className="w-full sm:w-[calc(50%-16px)] md:w-[calc(40%-24px)] lg:w-[calc(33.333%-32px)] max-w-[480px]">
              <ProcessStep p={p} i={i} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default HomeProcess;