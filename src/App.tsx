import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Users, Star, ChevronDown, ChevronUp, MessageCircle, Navigation, TowerControl as GameController, Trophy, Sparkles, MapPinned, ArrowRight, CheckCircle } from 'lucide-react';

// ─── Intersection Observer ────────────────────────────────────────────────────
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);
  return [ref, isVisible] as const;
};

// ─── City Selector Landing ────────────────────────────────────────────────────
const CitySelector: React.FC<{ onSelect: (city: 'pucon' | 'temuco') => void }> = ({ onSelect }) => {
  const [hovered, setHovered] = useState<'pucon' | 'temuco' | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50 flex flex-col">
      {/* Header */}
      <div className={`relative z-20 text-center px-4 pt-10 pb-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
        <p className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase mb-3">Escape Room Araucanía</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
          ¿Quieres vivir tu aventura en{' '}
          <span className="text-[#D4AF37]">Temuco</span> o en{' '}
          <span className="text-[#D4AF37]">Pucón</span>?
        </h1>
        <p className="text-white/45 text-sm max-w-xl mx-auto leading-relaxed">
          En Escape Room Araucanía avanzamos para que el entretenimiento potencie tu pensamiento y cerebro.{' '}
          <span className="text-white/65">¡Tú eliges dónde reservar!</span>
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-12 bg-[#D4AF37]/40" />
          <span className="text-[#D4AF37]/60 text-xs tracking-widest uppercase">Elige tu destino</span>
          <div className="h-px w-12 bg-[#D4AF37]/40" />
        </div>
      </div>

      {/* Panels */}
      <div className="flex flex-1 min-h-0">
        {/* Temuco panel */}
        <div
          className="relative overflow-hidden cursor-pointer transition-all duration-600 ease-in-out"
          style={{ flex: hovered === 'temuco' ? '1.6' : hovered === 'pucon' ? '0.4' : '1' }}
          onMouseEnter={() => setHovered('temuco')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('temuco')}
        >
          <img src="/CAFETERIA1.jpeg" alt="Temuco"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{ filter: `brightness(${hovered === 'temuco' ? '0.45' : '0.25'})`, transform: hovered === 'temuco' ? 'scale(1.04)' : 'scale(1.1)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(139,0,0,0.25), transparent 60%)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
              <MapPin className="text-[#D4AF37] mx-auto mb-3" size={28} />
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-1">Temuco</h2>
              <p className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-2">La Araucanía</p>
              <p className="text-white/50 text-xs max-w-xs mx-auto mb-6 leading-relaxed">
                Nueva sede — Vivir la experiencia de escape room en el corazón de Temuco
              </p>
              <div
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-7 py-3 rounded-xl font-bold text-sm transition-all duration-400"
                style={{ opacity: hovered === 'temuco' ? 1 : 0, transform: hovered === 'temuco' ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)' }}
              >
                Reservar en Temuco <ArrowRight size={14} />
              </div>
            </div>
          </div>
          {/* Border glow on hover */}
          <div className="absolute inset-0 border-2 border-transparent transition-all duration-500"
            style={{ borderColor: hovered === 'temuco' ? 'rgba(212,175,55,0.3)' : 'transparent' }} />
        </div>

        {/* Divider */}
        <div className="relative w-px flex-shrink-0 z-10" style={{ background: 'rgba(212,175,55,0.2)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-black">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          </div>
        </div>

        {/* Pucón panel */}
        <div
          className="relative overflow-hidden cursor-pointer transition-all duration-600 ease-in-out"
          style={{ flex: hovered === 'pucon' ? '1.6' : hovered === 'temuco' ? '0.4' : '1' }}
          onMouseEnter={() => setHovered('pucon')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('pucon')}
        >
          <img src="/familiazoologico.jpeg" alt="Pucón"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{ filter: `brightness(${hovered === 'pucon' ? '0.45' : '0.25'})`, transform: hovered === 'pucon' ? 'scale(1.04)' : 'scale(1.1)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(225deg, rgba(212,175,55,0.1), transparent 60%)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
              <MapPin className="text-[#D4AF37] mx-auto mb-3" size={28} />
              {/* Mysterious title */}
              <div className="mb-3">
                <span className="misterios-text block text-3xl md:text-5xl font-bold">Los Misterios</span>
                <span className="casona-text block text-2xl md:text-4xl font-semibold">de la Casona</span>
              </div>
              <p className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-2">Pucón — Origen</p>
              <p className="text-white/50 text-xs max-w-xs mx-auto mb-6 leading-relaxed">
                El primer escape room de Pucón — Misterio, adrenalina y aventura junto al lago Villarrica
              </p>
              <div
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-7 py-3 rounded-xl font-bold text-sm transition-all duration-400"
                style={{ opacity: hovered === 'pucon' ? 1 : 0, transform: hovered === 'pucon' ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)' }}
              >
                Reservar en Pucón <ArrowRight size={14} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 border-2 border-transparent transition-all duration-500"
            style={{ borderColor: hovered === 'pucon' ? 'rgba(212,175,55,0.3)' : 'transparent' }} />
        </div>
      </div>

      {/* Mobile tap hint */}
      <div className="md:hidden text-center py-3 text-white/30 text-xs tracking-widest">
        TOCA PARA ELEGIR TU DESTINO
      </div>
    </div>
  );
};

// ─── Temuco Banner ────────────────────────────────────────────────────────────
const TemucoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 40%, #8B0000 60%, #1a0000 80%, #0a0a0a 100%)' }}>
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <MapPinned className="text-[#D4AF37] flex-shrink-0" size={32} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded uppercase tracking-widest">Nuevo</span>
                  <span className="text-[#D4AF37] text-sm font-semibold tracking-wide uppercase">Temuco</span>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  ¡Ya estamos en Temuco atendiendo!
                </h3>
                <p className="text-[#D4AF37] font-medium text-base mt-1">
                  Reserva tu nueva aventura — Nuevas experiencias para la Araucanía
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Elige y visítanos en <span className="text-[#D4AF37] font-semibold">Temuco</span> y <span className="text-[#D4AF37] font-semibold">Pucón</span>
                </p>
              </div>
            </div>
            <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20en%20Temuco."
              className="flex-shrink-0 flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}>
              Reservar ahora <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsTextVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <iframe
          src="https://www.youtube.com/embed/AIo9RV-m1wA?autoplay=1&mute=1&loop=1&playlist=AIo9RV-m1wA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          className="w-full h-full"
          style={{ filter: 'brightness(0.4)', transform: 'scale(1.08)', pointerEvents: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.97) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

      {/* Logo */}
      <div className="absolute top-6 right-6 z-20">
        <img src="/logoescaperoom.jpg" alt="Logo Los Misterios de la Casona"
          className="h-24 w-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
          style={{ boxShadow: '0 0 30px rgba(212,175,55,0.2)' }} />
      </div>

      {/* Change city */}
      <button onClick={onChangeCity}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/40 hover:text-[#D4AF37] transition-all duration-300 text-xs font-medium tracking-widest uppercase">
        <MapPin size={14} />
        Cambiar ciudad
      </button>

      <div className="relative z-10 min-h-screen flex flex-col justify-end px-4 pb-20">
        <div className="max-w-4xl mx-auto w-full">
          <div className={`transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">El Primer Escape Room en Pucón</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-none tracking-tight">
              <span className="misterios-text text-5xl md:text-7xl">Los Misterios</span>
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-none">
              <span className="casona-text text-4xl md:text-6xl">de la Casona</span>
            </h1>
          </div>
          <p className={`text-white/70 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '500ms' }}>
            Sumérgete en una aventura única de misterio y adrenalina. Resuelve acertijos, descubre pistas ocultas y escapa antes de que el tiempo se agote.
          </p>
          <div className={`flex flex-wrap gap-4 transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '800ms' }}>
            <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
              className="group flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 rounded-xl text-base font-bold hover:bg-white transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}>
              Reservar Ahora
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a href="#rooms" className="flex items-center gap-3 border border-white/25 text-white px-8 py-4 rounded-xl text-base font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-sm">
              Ver Salas
            </a>
          </div>
          <div className={`flex gap-8 mt-12 pt-8 border-t border-white/10 transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '1100ms' }}>
            {[['60', 'minutos de aventura'], ['2-8', 'jugadores'], ['2', 'salas temáticas']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-[#D4AF37]">{num}</div>
                <div className="text-white/45 text-xs uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── About ────────────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} className="py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Nuestra Historia</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Tu próxima aventura comienza <span className="text-[#D4AF37]">aquí</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Ubicados en una antigua casona en el corazón de Pucón, nuestras salas temáticas están diseñadas para hacerte vivir una historia emocionante, llena de misterio y adrenalina. Ideal para grupos de amigos, parejas, familias o actividades corporativas.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Transformamos el entretenimiento en una experiencia inmersiva. Diseñamos desafíos únicos que ponen a prueba tu lógica, creatividad y trabajo en equipo.
            </p>
            {['Modalidad indoor, disponible todo el año', 'Disponible en español e inglés', 'Game Master presente en cada sesión'].map(item => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <CheckCircle className="text-[#D4AF37] flex-shrink-0" size={18} />
                <span className="text-white/65 text-sm">{item}</span>
              </div>
            ))}
            <a href="https://wa.me/56996543715?text=Hola%2C%20quiero%20reservar%20mi%20pr%C3%B3xima%20aventura."
              className="inline-flex items-center gap-2 mt-8 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
              Contáctanos y reserva <ArrowRight size={16} />
            </a>
          </div>
          <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl opacity-20" style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
              <img src="/familiazoologico.jpeg" alt="Grupo disfrutando el escape room"
                className="w-full h-96 object-cover rounded-2xl relative z-10"
                style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
              <div className="absolute -bottom-4 -right-4 bg-[#D4AF37] text-black p-4 rounded-xl z-20 font-bold text-center"
                style={{ boxShadow: '0 10px 30px rgba(212,175,55,0.4)' }}>
                <div className="text-2xl font-black">#1</div>
                <div className="text-xs uppercase tracking-wide">en Pucón</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Room Card ────────────────────────────────────────────────────────────────
const RoomCard: React.FC<{
  title: string; description: string; difficulty: string;
  players: string; image: string; alt: string; delay: number;
  cardType: 'pirate' | 'zombie';
}> = ({ title, description, difficulty, players, image, alt, delay, cardType }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const accent = cardType === 'pirate' ? '#D4AF37' : '#8B0000';

  return (
    <div ref={ref}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms`, background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="relative overflow-hidden h-72">
        <img src={image} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
            style={{ background: accent, color: cardType === 'pirate' ? '#000' : '#fff' }}>
            {difficulty === 'Media' ? 'Dificultad Media' : 'Dificultad Alta'}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <Users size={12} className="text-white/70" />
          <span className="text-white/70 text-xs font-medium">{players} personas</span>
        </div>
      </div>
      <div className="p-8">
        <div className="w-8 h-0.5 mb-4" style={{ background: accent }} />
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/50 leading-relaxed text-sm mb-6">{description}</p>
        <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20una%20sala."
          className="group/btn inline-flex items-center gap-2 font-semibold text-sm transition-all duration-300 hover:gap-3"
          style={{ color: accent }}>
          Reservar esta sala
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </a>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  );
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
const RoomsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} id="rooms" className="py-28" style={{ background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Nuestras Salas</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Elige tu <span className="text-[#D4AF37]">Mundo</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <RoomCard title="Sala El Pirata Pinwine"
            description="Una aventura de misterio pirata llena de puzzles de lógica. Desentraña los secretos del Capitán Pinwine para cumplir tu misión. Ideal para grupos de amigos, parejas y familias. Disponible en español e inglés."
            difficulty="Media" players="2-8" image="/pirata.png" alt="Sala del Pirata Pinwine" delay={200} cardType="pirate" />
          <RoomCard title="Sala El Elixir Zombie"
            description="Una aventura post-apocalíptica donde deben encontrar la cura para un virus zombie. Investiga el laboratorio y colabora bajo presión antes de que los zombies regresen. Disponible en inglés y español."
            difficulty="Alta" players="2-8" image="/zombie.png" alt="Sala El Elixir Zombie" delay={400} cardType="zombie" />
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
const HowItWorksSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const steps = [
    { label: '1er Paso', title: 'Reserva', desc: 'Contáctanos por WhatsApp para asegurar tu aventura en la fecha y sala que prefieras.', icon: <MessageCircle size={22} />, link: 'https://wa.me/56996543715', phone: true },
    { label: '2do Paso', title: 'Llega', desc: 'Arriba 15 minutos antes de tu horario para la introducción y briefing con tu Game Master.', icon: <Navigation size={22} />, link: '#contact', phone: false },
    { label: '3er Paso', title: 'Juega', desc: 'Sumérgete en la historia. Tienes 60 minutos para resolver todos los enigmas y escapar.', icon: <GameController size={22} />, link: '#rooms', phone: false },
    { label: '4to Paso', title: 'Escapa', desc: '¡Celebra tu victoria o aprende de los puzzles restantes! Foto grupal de recuerdo incluida.', icon: <Trophy size={22} />, link: '#testimonials', phone: false },
  ];

  return (
    <section ref={ref} className="py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">El Proceso</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">4 pasos para <span className="text-[#D4AF37]">la aventura</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ label, title, desc, icon, link, phone }, i) => (
            <a key={label} href={link}
              className={`group relative p-8 rounded-2xl border transition-all duration-700 ease-out hover:border-[#D4AF37]/50 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150}ms`, background: '#111', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="absolute top-4 right-4 text-xs font-black text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-all duration-300 tracking-widest uppercase">
                {label}
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-black transition-all duration-300 group-hover:scale-110"
                style={{ background: '#D4AF37' }}>
                {icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              {phone && <p className="text-[#D4AF37] text-xs font-semibold mt-3">+56 9 9654 3715</p>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TestimonialsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    { text: '¡Una experiencia increíble! Logramos completar la aventura en 50:46. Los puzzles son desafiantes y la ambientación es de 10.', author: 'Los Jabalíes', image: '/jabaliesytablas.jpeg' },
    { text: '¡Qué experiencia tan divertida! Somos un equipo pequeño pero poderoso. Definitivamente volveremos con más amigos.', author: 'Pichitos', image: '/pichitos.jpeg' },
    { text: 'La atención fue fantástica y la sala del pirata es genial. Nuestro tiempo fue 51:50. ¡Volveremos!', author: '16 Ojos', image: '/16ojos.jpeg' },
    { text: 'Fuimos con amigos y nos reímos muchísimo. ¡Totalmente recomendado para cualquier grupo!', author: 'Los Pifiados', image: '/lospifiados.jpeg' },
    { text: 'El mejor escape room que hemos hecho. ¡Ya queremos probar otra sala! Una experiencia única.', author: 'Ganya Team', image: '/ganyateam.jpeg' },
    { text: '¡Las Indomitas conquistamos el escape room en 58:33! Una experiencia llena de adrenalina y diversión. ¡Totalmente recomendado!', author: 'Las Indomitas', image: '/lasindomitas.jpeg' },
    { text: 'Las Rafitas vivimos una aventura increíble. El trabajo en equipo fue clave para resolver todos los misterios. ¡Volveremos!', author: 'Las Rafitas', image: '/lasrafitas.jpeg' },
    { text: '¡El Club de Checho logró escapar en 54:47! Una experiencia que combina diversión, desafío y mucha emoción. ¡Imperdible!', author: 'Club de Checho', image: '/clubdechecho.jpeg' },
  ];

  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={ref} id="testimonials" className="py-28 overflow-hidden" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Opiniones</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Lo que dicen nuestros <span className="text-[#D4AF37]">aventureros</span>
          </h2>
        </div>
      </div>
      <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute left-0 top-0 w-20 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #080808, transparent)' }} />
        <div className="absolute right-0 top-0 w-20 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #080808, transparent)' }} />
        <div className="flex gap-5" style={{ width: `${doubled.length * 340}px`, animation: isPaused ? 'none' : 'scroll 35s linear infinite' }}>
          {doubled.map((t, i) => (
            <div key={i} className="min-w-[320px] p-6 rounded-2xl border border-white/6 flex flex-col gap-4" style={{ background: '#111' }}>
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => <Star key={s} size={12} fill="#D4AF37" className="text-[#D4AF37]" />)}
              </div>
              <p className="text-white/60 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                <img src={t.image} alt={t.author} className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#D4AF37]/40" />
                <span className="text-[#D4AF37] font-semibold text-sm">{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    { question: '¿Qué es un Escape Room?', answer: 'Es una experiencia de juego en vivo donde tú y tu equipo son "encerrados" temáticamente en una sala y tienen 60 minutos para resolver acertijos, encontrar pistas y completar una misión para "escapar" antes de que se acabe el tiempo.' },
    { question: '¿Estamos realmente encerrados?', answer: '¡No! Por seguridad, nunca estás realmente encerrado. Siempre habrá una salida de emergencia accesible. Nuestro Game Master te explicará cómo funciona antes de empezar.' },
    { question: '¿Necesitamos alguna habilidad especial?', answer: '¡Absolutamente no! Nuestros juegos están diseñados para poner a prueba tu lógica, observación, creatividad y trabajo en equipo. No necesitas fuerza física ni conocimientos previos.' },
    { question: '¿Qué pasa si no logramos escapar a tiempo?', answer: 'No te preocupes. El Game Master entrará para explicarte las soluciones de los puzzles restantes y celebrar tu esfuerzo. Lo importante es la diversión y la experiencia.' },
    { question: '¿Se puede jugar con movilidad reducida?', answer: 'Sí, nuestras salas están diseñadas para ser accesibles en general. Te recomendamos contactarnos por WhatsApp antes de reservar para confirmar la adaptabilidad según tus necesidades.' },
    { question: '¿Cuántas personas pueden jugar?', answer: 'Nuestras salas están diseñadas para grupos de 2 hasta 8 personas. Para grupos más grandes recomendamos reservar sesiones consecutivas.' },
    { question: '¿Hay edad mínima para participar?', answer: 'Sala del Capitán Pinwine: recomendada para mayores de 8 años. Los menores de 14 deben ir con un adulto. Sala Zombie: edad mínima recomendada 12-14 años, menores deben ir acompañados.' },
    { question: '¿Cuál es el precio por persona?', answer: 'El precio es de $10.000 CLP por persona.' },
    { question: '¿Cómo puedo reservar?', answer: 'Las reservas se realizan vía WhatsApp al +56 9 9654 3715. Envíanos un mensaje con la fecha, hora y sala que te interesa y te confirmamos disponibilidad.' },
    { question: '¿Con cuánta anticipación debo llegar?', answer: 'Te pedimos llegar 10-15 minutos antes de la hora reservada para la introducción y para asegurar que tu juego comience a tiempo.' },
    { question: '¿Cuánto dura la experiencia total?', answer: 'El juego dura 60 minutos. Considera 10-15 minutos antes para introducción y 5-10 minutos después para foto y comentarios. En total, unas 80-90 minutos.' },
    { question: '¿Cómo funciona la cancelación?', answer: 'Para reservar se necesita el 50% del valor total al momento de reservar. En caso de cancelación, ese 50% no se reembolsa. Puedes modificar tu reserva avisando con 24-48 horas de anticipación.' },
    { question: '¿Puedo usar mi celular dentro de la sala?', answer: 'No se permite el uso de celulares dentro de la sala para una inmersión completa y por confidencialidad de los puzzles. Habrá un lugar seguro para guardarlos.' },
    { question: '¿Tienen estacionamiento?', answer: 'Estamos en Ramón Quezada 0470, La Casona Pucón. Contamos con estacionamiento en el lugar o en las cercanías.' },
    // SEO - Temuco
    { question: '¿Qué hacer en Temuco con amigos?', answer: 'Si buscas una actividad diferente y emocionante en Temuco, el escape room es una de las mejores opciones. En Escape Room Araucanía – Los Misterios de la Casona, ya estamos atendiendo en Temuco para que tú y tus amigos vivan una aventura de misterio, puzzles y adrenalina. Ideal para grupos de 2 a 8 personas. ¡Reserva directamente por WhatsApp!' },
    { question: '¿Qué planes de entretenimiento hay en Temuco?', answer: 'Temuco ofrece cada vez más opciones de entretenimiento indoor. Una de las más innovadoras es visitar nuestro escape room en Temuco — Escape Room Araucanía. Una experiencia única que combina lógica, trabajo en equipo y narrativa inmersiva. Perfecta para cualquier época del año.' },
    { question: '¿Qué hacer en la Araucanía?', answer: 'Además del turismo natural, la Araucanía ya cuenta con experiencias de entretenimiento únicas como Escape Room Araucanía, disponible en Temuco y Pucón. Vive la emoción de resolver acertijos en equipo dentro de salas temáticas ambientadas. Una actividad perfecta para complementar tu visita a la región.' },
    { question: '¿Actividades para grupos corporativos o team building en Temuco?', answer: 'El escape room es una de las actividades de team building más efectivas y divertidas. En Escape Room Araucanía — Temuco, ofrecemos experiencias diseñadas para fortalecer la comunicación, la confianza y el trabajo en equipo de tu empresa. Contáctanos para coordinar tu evento corporativo al +56 9 9654 3715.' },
    { question: '¿Qué hacer en Pucón más allá del turismo tradicional?', answer: 'Pucón no es solo volcán y lago. Los Misterios de la Casona, el primer escape room de Pucón, te ofrece una experiencia indoor única de misterio y aventura que puedes disfrutar en cualquier temporada. Está ubicado en La Casona Pucón junto a cafetería con vista al lago y tiendas concept store.' },
    { question: '¿Hay escape rooms en Temuco o en la Araucanía?', answer: 'Sí, Escape Room Araucanía – Los Misterios de la Casona es el escape room de referencia en la región, con presencia en Pucón (el primero y único por años) y ahora también con sede en Temuco. Tenemos dos salas temáticas: El Pirata Pinwine (dificultad media) y El Elixir Zombie (dificultad alta).' },
    { question: '¿Dónde llevar a mi familia de visita en Temuco?', answer: 'Si tienes visitas o simplemente quieres un plan diferente con tu familia en Temuco, el escape room es una excelente opción para todas las edades (desde 8 años con adulto). Escape Room Araucanía en Temuco ofrece una experiencia inmersiva, educativa y divertida. ¡Reserva ahora por WhatsApp!' },
    { question: '¿Qué actividades hay para hacer en Pucón cuando llueve?', answer: 'Pucón tiene clima variable y los días de lluvia pueden sorprenderte. Para esos momentos, Los Misterios de la Casona — Escape Room Pucón es la actividad indoor perfecta. Disfruta 60 minutos de adrenalina, misterio y puzzles en equipo sin importar el clima. Luego relájate en la cafetería Calma con vista al lago.' },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-3xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">FAQ</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            ¿Tienes <span className="text-[#D4AF37]">preguntas?</span>
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl overflow-hidden border border-white/6 transition-all duration-300 hover:border-[#D4AF37]/20"
              style={{ background: activeIndex === index ? '#161616' : '#111' }}>
              <button onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-5 px-6 text-left flex justify-between items-center gap-4">
                <span className="text-white font-medium text-sm">{faq.question}</span>
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: activeIndex === index ? '#D4AF37' : 'rgba(212,175,55,0.15)' }}>
                  {activeIndex === index
                    ? <ChevronUp className="text-black" size={12} />
                    : <ChevronDown className="text-[#D4AF37]" size={12} />}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5">
                  <p className="text-white/50 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GallerySection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const images = [
    { src: '/jabaliesytablas.jpeg', alt: 'Los Jabalíes' },
    { src: '/pichitos.jpeg', alt: 'Pichitos' },
    { src: '/16ojos.jpeg', alt: '16 Ojos' },
    { src: '/lospifiados.jpeg', alt: 'Los Pifiados' },
    { src: '/ganyateam.jpeg', alt: 'Ganya Team' },
    { src: '/lasindomitas.jpeg', alt: 'Las Indomitas' },
    { src: '/lasrafitas.jpeg', alt: 'Las Rafitas' },
    { src: '/clubdechecho.jpeg', alt: 'Club de Checho' },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Galería</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Galería de <span className="text-[#D4AF37]">aventureros</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={i}
              className={`group relative aspect-square overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">{img.alt}</span>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/40 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>
        <div className={`text-center mt-12 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://wa.me/56996543715?text=Hola%2C%20quiero%20reservar%20y%20ser%20parte%20de%20la%20galería."
            className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
            ¡Reserva y sé parte de nuestra galería! <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── La Casona ────────────────────────────────────────────────────────────────
const LaCasonaSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [conceptIdx, setConceptIdx] = useState(0);
  const [cafeteriaIdx, setCafeteriaIdx] = useState(0);

  const conceptImgs = ['/TIENDACONCEPT1.jpeg', '/TIENDACONCEPT.jpeg'];
  const cafeteriaImgs = ['/CAFETERIA1.jpeg', '/CAFETERIA.jpeg', '/CAFETERIA2.jpeg'];

  useEffect(() => {
    const t1 = setInterval(() => setConceptIdx(p => (p + 1) % conceptImgs.length), 4000);
    const t2 = setInterval(() => setCafeteriaIdx(p => (p + 1) % cafeteriaImgs.length), 4000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const modules = [
    { title: 'Tienda Concept Store', subtitle: 'Un mundo de descubrimientos', description: 'Descubre una variada selección de productos y marcas, ideales para encontrar ese detalle especial, un regalo único o algo que te encante. Desde artículos de diseño y decoración hasta moda y artesanía local.', images: conceptImgs, currentIdx: conceptIdx, setIdx: setConceptIdx, isCarousel: true, alt: 'Tienda concept store La Casona Pucón' },
    { title: 'Cafetería Calma', subtitle: 'Vistas inolvidables al lago', description: 'Situada a la orilla del lago Villarrica, Calma ofrece el mejor café y una deliciosa selección de pastelería y snacks, con una vista espectacular. El spot ideal para recargar energías y contemplar la belleza de Pucón.', images: cafeteriaImgs, currentIdx: cafeteriaIdx, setIdx: setCafeteriaIdx, isCarousel: true, alt: 'Cafetería Calma con vista al lago' },
    { title: 'Actividades y Talleres', subtitle: 'Un espacio siempre vivo', description: 'Regularmente somos anfitriones de exposiciones de arte, charlas culturales, workshops creativos y eventos comunitarios. ¡Mantente atento a nuestras redes sociales para conocer la programación!', image: '/ACTIVIDADES1.jpeg', isCarousel: false, alt: 'Actividades y talleres en La Casona' },
    { title: 'Paseo a Orilla del Lago', subtitle: 'Un agradable recorrido peatonal', description: 'Disfruta de un relajante paseo por la hermosa orilla del lago Villarrica, justo al salir de La Casona. El complemento perfecto para tu día de aventura en Pucón.', image: '/CAFETERIA.jpeg', isCarousel: false, alt: 'Orilla del lago Villarrica' },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">El Lugar</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Más allá del <span className="text-[#D4AF37]">Escape Room</span></h2>
          <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
            Ubicados en la histórica La Casona Pucón, un espacio vibrante con opciones únicas para relajarte, comprar y disfrutar.
          </p>
        </div>
        <div className="space-y-20">
          {modules.map((m, i) => (
            <div key={i}
              className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''}`}
              style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="relative">
                {m.isCarousel ? (
                  <div className="relative h-80 rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
                    {m.images?.map((img, idx) => (
                      <img key={idx} src={img} alt={`${m.alt} ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${idx === m.currentIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} />
                    ))}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {m.images?.map((_, idx) => (
                        <button key={idx} onClick={() => m.setIdx?.(idx)}
                          className={`rounded-full transition-all duration-300 ${idx === m.currentIdx ? 'w-6 h-2 bg-[#D4AF37]' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <img src={m.image} alt={m.alt} className="w-full h-80 object-cover rounded-2xl" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
                )}
              </div>
              <div>
                <div className="w-8 h-0.5 bg-[#D4AF37] mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{m.title}</h3>
                <p className="text-[#D4AF37] font-medium mb-4 text-sm">{m.subtitle}</p>
                <p className="text-white/50 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20conocer%20La%20Casona%20Puc%C3%B3n."
            className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
            Descubre todo lo que tenemos <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <>
      <TemucoBanner />
      <section ref={ref} id="contact" className="py-28 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Contacto</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Encuéntranos y <span className="text-[#D4AF37]">contáctanos</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <MapPin size={20} />, label: 'Dirección', value: 'Ramón Quezada 0470, Pucón', href: null },
                  { icon: <Phone size={20} />, label: 'WhatsApp', value: '+56 9 9654 3715', href: 'https://wa.me/56996543715' },
                  { icon: <Mail size={20} />, label: 'Email', value: 'escaperoompucon@gmail.com', href: 'mailto:escaperoompucon@gmail.com' },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-5 rounded-xl border border-white/6 hover:border-[#D4AF37]/30 transition-all duration-300" style={{ background: '#111' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-black flex-shrink-0" style={{ background: '#D4AF37' }}>{icon}</div>
                    <div>
                      <p className="text-white/35 text-xs uppercase tracking-wide mb-1">{label}</p>
                      {href ? <a href={href} className="text-white hover:text-[#D4AF37] transition-colors duration-300 font-medium">{value}</a>
                        : <p className="text-white font-medium">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mb-8">
                <p className="text-white/35 text-sm">Síguenos en</p>
                <a href="https://www.instagram.com/escaperoom_pucon/?hl=es" className="flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors duration-300">
                  <Instagram size={20} />
                  <span className="text-sm font-medium">@escaperoom_pucon</span>
                </a>
              </div>
              <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
                className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
                Reservar por WhatsApp <ArrowRight size={16} />
              </a>
            </div>
            <div className={`transition-all duration-1000 ease-out delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="rounded-2xl overflow-hidden border border-white/6" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.234567890123!2d-71.9762225!3d-39.2666282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96147f4838ebcf1d:0x5f6543199a9b5c15!2sEscape+room+pucon!5e0!3m2!1ses!2scl!4v1678901234567!5m2!1ses!2scl"
                  width="100%" height="400"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Escape Room Pucón"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── Temuco Site ──────────────────────────────────────────────────────────────
const TemucoPuconSite: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Temuco Hero */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src="/CAFETERIA1.jpeg" alt="Temuco"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3)', transform: 'scale(1.05)' }} />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.97) 100%)' }} />

        <div className="absolute top-6 right-6 z-20">
          <img src="/logoescaperoom.jpg" alt="Logo" className="h-20 w-auto rounded-xl" style={{ boxShadow: '0 0 30px rgba(212,175,55,0.2)' }} />
        </div>
        <button onClick={onChangeCity}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/40 hover:text-[#D4AF37] transition-all duration-300 text-xs font-medium tracking-widest uppercase">
          <MapPin size={14} /> Cambiar ciudad
        </button>

        <div className="relative z-10 min-h-screen flex flex-col justify-end px-4 pb-20">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Escape Room Araucanía — Temuco</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 leading-none">
              <span className="misterios-text text-5xl md:text-7xl">Los Misterios</span>
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-none">
              <span className="casona-text text-4xl md:text-6xl">en Temuco</span>
            </h1>
            <p className="text-white/65 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
              Ya estamos atendiendo en Temuco. La misma experiencia de misterio, adrenalina y puzzles que conquista la Araucanía, ahora en el corazón de la capital regional.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20en%20Temuco."
                className="group flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 rounded-xl text-base font-bold hover:bg-white transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}>
                Reservar en Temuco <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a href="#temuco-rooms" className="flex items-center gap-3 border border-white/25 text-white px-8 py-4 rounded-xl text-base font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
                Ver Salas
              </a>
            </div>
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[['60', 'minutos de aventura'], ['2-8', 'jugadores'], ['2', 'salas disponibles']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-[#D4AF37]">{num}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section ref={ref} id="temuco-rooms" className="py-28" style={{ background: '#0d0d0d' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Salas en Temuco</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Elige tu <span className="text-[#D4AF37]">Mundo</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <RoomCard title="Sala El Pirata Pinwine"
              description="Una aventura de misterio pirata llena de puzzles de lógica. Desentraña los secretos del Capitán Pinwine para cumplir tu misión. Disponible en español e inglés."
              difficulty="Media" players="2-8" image="/pirata.png" alt="Sala del Pirata Pinwine" delay={200} cardType="pirate" />
            <RoomCard title="Sala El Elixir Zombie"
              description="Una aventura post-apocalíptica donde deben encontrar la cura para un virus zombie. Investiga el laboratorio y colabora bajo presión antes de que los zombies regresen."
              difficulty="Alta" players="2-8" image="/zombie.png" alt="Sala El Elixir Zombie" delay={400} cardType="zombie" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorksSection />

      {/* Contact Temuco */}
      <section className="py-28 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Contacto Temuco</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Reserva en <span className="text-[#D4AF37]">Temuco</span></h2>
          </div>
          <div className="max-w-lg mx-auto space-y-4">
            {[
              { icon: <Phone size={20} />, label: 'WhatsApp', value: '+56 9 9654 3715', href: 'https://wa.me/56996543715' },
              { icon: <Mail size={20} />, label: 'Email', value: 'escaperoompucon@gmail.com', href: 'mailto:escaperoompucon@gmail.com' },
              { icon: <Instagram size={20} />, label: 'Instagram', value: '@escaperoom_pucon', href: 'https://www.instagram.com/escaperoom_pucon/?hl=es' },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-xl border border-white/6 hover:border-[#D4AF37]/30 transition-all duration-300" style={{ background: '#111' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-black flex-shrink-0" style={{ background: '#D4AF37' }}>{icon}</div>
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-wide mb-1">{label}</p>
                  <a href={href} className="text-white hover:text-[#D4AF37] transition-colors duration-300 font-medium">{value}</a>
                </div>
              </div>
            ))}
            <div className="pt-4 text-center">
              <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20en%20Temuco."
                className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
                Reservar ahora en Temuco <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/8" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white/25 text-sm">© 2026 Los Misterios de la Casona — Escape Room Araucanía</p>
          <button onClick={onChangeCity} className="mt-3 text-[#D4AF37]/40 hover:text-[#D4AF37] text-xs transition-colors duration-300 underline underline-offset-4">
            Ir a la sede de Pucón
          </button>
        </div>
      </footer>
    </div>
  );
};

// ─── Pucón Site ───────────────────────────────────────────────────────────────
const PuconSite: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => (
  <div className="min-h-screen bg-[#080808] text-white">
    <HeroSection onChangeCity={onChangeCity} />
    <TemucoBanner />
    <AboutSection />
    <RoomsSection />
    <HowItWorksSection />
    <ContactSection />
    <TestimonialsSection />
    <FAQSection />
    <GallerySection />
    <LaCasonaSection />
    <footer className="py-10 border-t border-white/8" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logoescaperoom.jpg" alt="Los Misterios de la Casona" className="h-10 w-auto rounded-lg" />
            <div>
              <p className="text-white font-semibold text-sm">Los Misterios de la Casona</p>
              <p className="text-white/30 text-xs">Escape Room — Pucón & Temuco</p>
            </div>
          </div>
          <p className="text-white/25 text-sm">© 2026 Los Misterios de la Casona. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/25 hover:text-[#D4AF37] text-xs transition-colors duration-300">Política de Privacidad</a>
            <a href="#" className="text-white/25 hover:text-[#D4AF37] text-xs transition-colors duration-300">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [city, setCity] = useState<null | 'pucon' | 'temuco'>(null);

  if (city === null) return <CitySelector onSelect={setCity} />;
  if (city === 'temuco') return <TemucoPuconSite onChangeCity={() => setCity(null)} />;
  return <PuconSite onChangeCity={() => setCity(null)} />;
}

export default App;
