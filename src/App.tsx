import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Users, Star, ChevronDown, ChevronUp, MessageCircle, Navigation, TowerControl as GameController, Trophy, MapPinned, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import TemucoPuconSite from './TemucoPuconSite';
import CorporateSite from './CorporateSite';

// ─── Intersection Observer ────────────────────────────────────────────────────
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, [threshold]);
  return [ref, isVisible] as const;
};

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center justify-center gap-3 mb-5">
    <div className="h-px w-10 bg-[#D4AF37]/60" />
    <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.35em] uppercase">{text}</span>
    <div className="h-px w-10 bg-[#D4AF37]/60" />
  </div>
);

// ─── City Selector ────────────────────────────────────────────────────────────
type Dest = 'temuco' | 'pucon' | 'corporativo';

const PANELS: Array<{
  id: Dest;
  image: string;
  accent: string;
  glow: string;
  tint: string;
  label: string;
  titleEl: React.ReactNode;
  desc: string;
  btnText: string;
}> = [
  {
    id: 'temuco',
    image: '/CAFETERIA1.jpeg',
    accent: '#00FF88',
    glow: 'rgba(0,255,136,0.4)',
    tint: 'rgba(0,255,136,0.08)',
    label: 'La Araucanía',
    titleEl: <span className="font-black text-white">Temuco</span>,
    desc: 'Nueva sede — Vive la experiencia de escape room en el corazón de Temuco',
    btnText: 'Ir a Temuco',
  },
  {
    id: 'pucon',
    image: '/familiazoologico.jpeg',
    accent: '#D4AF37',
    glow: 'rgba(212,175,55,0.4)',
    tint: 'rgba(212,175,55,0.08)',
    label: 'Pucón — Origen',
    titleEl: (
      <>
        <span className="misterios-text block leading-tight" style={{ fontSize: 'inherit' }}>Los Misterios</span>
        <span className="casona-text block leading-tight" style={{ fontSize: '0.78em' }}>de la Casona</span>
      </>
    ),
    desc: 'El primer escape room de Pucón — Misterio y adrenalina junto al lago Villarrica',
    btnText: 'Ir a Pucón',
  },
  {
    id: 'corporativo',
    image: '/ganyateam.jpeg',
    accent: '#60A5FA',
    glow: 'rgba(96,165,250,0.4)',
    tint: 'rgba(96,165,250,0.08)',
    label: 'Team Building & Eventos',
    titleEl: <span className="font-black text-white">Corporativo</span>,
    desc: 'Fortalece tu equipo con la experiencia más intensa de trabajo colaborativo',
    btnText: 'Ver opciones',
  },
];

const CitySelector: React.FC<{ onSelect: (city: Dest) => void }> = ({ onSelect }) => {
  const [hovered, setHovered] = useState<Dest | null>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 540 : false
  );

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    const mq = window.matchMedia('(max-width: 539px)');
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', fn);
    return () => { clearTimeout(t); mq.removeEventListener('change', fn); };
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50">

      {/* ── Brand header overlay (desktop only) ── */}
      <div className="hidden md:block absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div className="flex flex-col items-center pt-7 px-4"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)', paddingBottom: '3rem' }}>
          <div className={`text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <p className="text-[#D4AF37] text-[9px] font-black tracking-[0.55em] uppercase mb-3">Escape Room Araucanía</p>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-snug">
              ¿A dónde quieres ir hoy?
            </h1>
            <p className="text-white/35 text-xs max-w-sm mx-auto">
              Elige tu destino y vive la experiencia que más se adapta a ti
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: 3 panels horizontal ── */}
      {!isMobile && (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
          {PANELS.map((p, idx) => {
            const isHov = hovered === p.id;
            const otherHov = hovered !== null && !isHov;
            return (
              <React.Fragment key={p.id}>
                {idx > 0 && (
                  <div className="relative flex-none w-px z-20 pointer-events-none"
                    style={{ background: `linear-gradient(to bottom, transparent 0%, ${PANELS[idx-1].accent}44 35%, ${p.accent}44 65%, transparent 100%)` }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center bg-black"
                      style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: hovered === PANELS[idx-1].id ? PANELS[idx-1].accent : hovered === p.id ? p.accent : '#555' }} />
                    </div>
                  </div>
                )}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  style={{
                    width: isHov ? '58%' : otherHov ? '21%' : '33.33%',
                    flexShrink: 0,
                    transition: 'width 0.65s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(p.id)}
                >
                  <img src={p.image} alt={p.id}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: `brightness(${isHov ? 0.52 : 0.24})`,
                      transform: isHov ? 'scale(1.04)' : 'scale(1.12)',
                      transition: 'filter 0.65s ease, transform 0.9s ease',
                    }} />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, transparent 70%)' }} />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 80%, ${p.tint}, transparent 65%)`, opacity: isHov ? 1 : 0, transition: 'opacity 0.65s' }} />

                  {/* Content — bottom center */}
                  <div className="absolute bottom-0 left-0 right-0 pb-10 flex flex-col items-center text-center"
                    style={{ opacity: isHov ? 1 : otherHov ? 0.3 : 0.75, transition: 'opacity 0.5s', padding: '0 clamp(6px, 2.5%, 24px) 40px' }}>

                    <div className={`flex items-center justify-center gap-2 mb-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                      style={{ transitionDelay: `${300 + idx * 100}ms` }}>
                      <div className="h-px w-4 flex-shrink-0" style={{ background: p.accent, opacity: 0.8 }} />
                      <span className="text-[8px] font-black tracking-[0.28em] uppercase whitespace-nowrap overflow-hidden" style={{ color: p.accent }}>{p.label}</span>
                      <div className="h-px w-4 flex-shrink-0" style={{ background: p.accent, opacity: 0.8 }} />
                    </div>

                    <div className={`mb-3 tracking-tight transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      style={{
                        transitionDelay: `${420 + idx * 100}ms`,
                        textShadow: isHov ? `0 0 30px ${p.glow}` : 'none',
                        transition: 'text-shadow 0.6s, opacity 0.7s, transform 0.7s',
                        fontSize: 'clamp(18px, 3vw, 50px)',
                        lineHeight: 1.05,
                      }}>
                      {p.titleEl}
                    </div>

                    <div style={{ opacity: isHov ? 1 : 0, transform: isHov ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.4s, transform 0.4s', pointerEvents: isHov ? 'auto' : 'none' }}>
                      <p className="text-white/40 text-xs leading-relaxed mx-auto mb-5" style={{ maxWidth: 'min(200px, 80%)' }}>{p.desc}</p>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-black"
                        style={{ background: p.accent, boxShadow: `0 0 20px ${p.glow}` }}>
                        {p.btnText} <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 border-2 pointer-events-none"
                    style={{ borderColor: isHov ? `${p.accent}44` : 'transparent', transition: 'border-color 0.5s' }} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* ── MOBILE: 3 panels vertical ── */}
      {isMobile && (
        <div className="flex flex-col h-full">
          {/* Brand header mobile */}
          <div className={`flex-none z-20 text-center px-4 py-4 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[#D4AF37] text-[9px] font-black tracking-[0.45em] uppercase mb-1">Escape Room Araucanía</p>
            <p className="text-white font-bold text-sm">¿A dónde quieres ir hoy?</p>
          </div>

          {PANELS.map((p, idx) => (
            <div key={p.id}
              className="relative flex-1 cursor-pointer overflow-hidden"
              onClick={() => onSelect(p.id)}
            >
              <img src={p.image} alt={p.id}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.30)' }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${p.tint}, transparent 55%)` }} />

              {/* Content */}
              <div className={`absolute inset-0 flex items-end px-5 pb-5 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${200 + idx * 120}ms` }}>
                <div className="flex items-end justify-between w-full">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="h-px w-5" style={{ background: p.accent }} />
                      <span className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: p.accent }}>{p.label}</span>
                    </div>
                    <div className="text-2xl leading-none mb-1" style={{ textShadow: `0 0 20px ${p.glow}` }}>
                      {p.titleEl}
                    </div>
                    <p className="text-white/45 text-[11px] leading-relaxed max-w-[200px] mt-1">{p.desc}</p>
                  </div>
                  {/* Arrow CTA */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ml-3"
                    style={{ background: p.accent, boxShadow: `0 0 16px ${p.glow}` }}>
                    <ArrowRight size={16} className="text-black" />
                  </div>
                </div>
              </div>

              {/* Top separator line */}
              {idx > 0 && (
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${PANELS[idx-1].accent}50, ${p.accent}50, transparent)` }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Desktop bottom hint ── */}
      <div className="hidden md:flex absolute bottom-4 left-0 right-0 z-30 justify-center pointer-events-none">
        <div className={`flex items-center gap-2 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
          <div className="w-10 h-px bg-white/12" />
          <span className="text-white/20 text-[9px] tracking-[0.35em] uppercase">Pasa el cursor para explorar</span>
          <div className="w-10 h-px bg-white/12" />
        </div>
      </div>
    </div>
  );
};

// ─── Temuco Banner ────────────────────────────────────────────────────────────
const TemucoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(100deg, #0a0a0a 0%, #180000 35%, #8B0000 55%, #180000 75%, #0a0a0a 100%)' }}>
      <div className="absolute top-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 50%, transparent)' }} />
      <div className="absolute bottom-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 50%, transparent)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-5">
        <div className={`transition-all duration-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 text-center md:text-left">
            <div className="flex items-center gap-4">
              <MapPinned className="text-[#D4AF37] flex-shrink-0 hidden md:block" size={28} />
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="bg-[#D4AF37] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Nuevo</span>
                  <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase">Temuco</span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">¡Ya estamos en Temuco atendiendo!</p>
                <p className="text-[#D4AF37] font-medium text-sm mt-0.5">
                  Reserva tu nueva aventura — Visítanos en <span className="font-bold">Temuco</span> y <span className="font-bold">Pucón</span>
                </p>
              </div>
            </div>
            <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20en%20Temuco."
              className="flex-shrink-0 flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-white transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 24px rgba(212,175,55,0.35)' }}>
              Reservar ahora <ArrowRight size={14} />
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
          style={{ filter: 'brightness(0.38)', transform: 'scale(1.08)', pointerEvents: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 35%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.98) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)' }} />

      {/* Logo */}
      <div className="absolute top-6 right-6 z-20">
        <img src="/logoescaperoom.jpg" alt="Los Misterios de la Casona"
          className="h-20 w-auto rounded-xl hover:scale-105 transition-transform duration-300"
          style={{ boxShadow: '0 0 30px rgba(0,0,0,0.6), 0 0 15px rgba(212,175,55,0.1)' }} />
      </div>
      <button onClick={onChangeCity}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/30 hover:text-[#D4AF37] transition-all duration-300 text-[10px] font-bold tracking-[0.25em] uppercase">
        <MapPin size={13} /> Cambiar ciudad
      </button>

      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-20">
        <div className="max-w-4xl">
          <div className={`transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.35em] uppercase">El Primer Escape Room en Pucón</span>
            </div>
            <h1 className="leading-none mb-1">
              <span className="misterios-text block text-5xl md:text-7xl lg:text-8xl">Los Misterios</span>
            </h1>
            <h1 className="leading-none mb-7">
              <span className="casona-text block text-4xl md:text-6xl lg:text-7xl">de la Casona</span>
            </h1>
          </div>

          <p className={`text-white/65 text-lg md:text-xl max-w-xl mb-9 leading-relaxed transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '500ms' }}>
            Sumérgete en una aventura única de misterio y adrenalina. Resuelve acertijos, descubre pistas ocultas y escapa antes de que el tiempo se agote.
          </p>

          <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '750ms' }}>
            <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
              className="group flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 rounded-xl text-sm font-bold hover:bg-white transition-all duration-300"
              style={{ boxShadow: '0 0 30px rgba(212,175,55,0.35)' }}>
              Reservar Ahora
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a href="#rooms" className="flex items-center gap-3 border border-white/20 text-white/80 px-8 py-4 rounded-xl text-sm font-semibold hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all duration-300">
              Ver Salas
            </a>
          </div>

          <div className={`flex gap-10 pt-6 border-t border-white/8 transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '1000ms' }}>
            {[['60', 'min de aventura'], ['2-8', 'jugadores'], ['2', 'salas temáticas']].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-[#D4AF37]">{num}</div>
                <div className="text-white/35 text-xs uppercase tracking-wide mt-0.5">{label}</div>
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
    <section ref={ref} className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <SectionLabel text="Nuestra Historia" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              Tu próxima aventura comienza <span className="text-[#D4AF37]">aquí</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-5">
              Ubicados en una antigua casona en el corazón de Pucón, nuestras salas temáticas están diseñadas para hacerte vivir una historia emocionante, llena de misterio y adrenalina. Ideal para grupos de amigos, parejas, familias o actividades corporativas.
            </p>
            <p className="text-white/55 text-base leading-relaxed mb-8">
              Transformamos el entretenimiento en una experiencia inmersiva. Diseñamos desafíos únicos que ponen a prueba tu lógica, creatividad y trabajo en equipo.
            </p>
            <div className="space-y-3 mb-9">
              {['Modalidad indoor, disponible todo el año', 'Disponible en español e inglés', 'Game Master presente en cada sesión'].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-[#D4AF37] flex-shrink-0" size={16} />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <a href="https://wa.me/56996543715?text=Hola%2C%20quiero%20reservar%20mi%20pr%C3%B3xima%20aventura."
              className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
              Contáctanos y reserva <ArrowRight size={15} />
            </a>
          </div>
          <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute -inset-5 rounded-2xl opacity-15" style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
              <img src="/familiazoologico.jpeg" alt="Grupo disfrutando el escape room"
                className="w-full h-96 object-cover rounded-2xl relative z-10"
                style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }} />
              <div className="absolute -bottom-5 -right-5 bg-[#D4AF37] text-black p-5 rounded-2xl z-20 text-center"
                style={{ boxShadow: '0 15px 35px rgba(212,175,55,0.45)' }}>
                <div className="text-3xl font-black leading-none">#1</div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-1">en Pucón</div>
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
  players: string; image: string; alt: string; delay: number; cardType: 'pirate' | 'zombie';
}> = ({ title, description, difficulty, players, image, alt, delay, cardType }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const accent = cardType === 'pirate' ? '#D4AF37' : '#8B0000';

  return (
    <div ref={ref}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms`, background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)' }}>

      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        <img src={image} alt={alt}
          className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-110"
          style={{ objectPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}22, transparent 60%)`, opacity: 0 }}
          ref={(el) => { if (el) el.style.opacity = '0'; }} />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
            style={{ background: accent, color: cardType === 'pirate' ? '#000' : '#fff' }}>
            Dificultad {difficulty}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Users size={11} className="text-white/60" />
          <span className="text-white/60 text-xs font-medium">{players} personas</span>
        </div>
      </div>

      <div className="p-7">
        <div className="w-6 h-0.5 mb-4" style={{ background: accent }} />
        <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
        <p className="text-white/45 leading-relaxed text-sm mb-6 line-clamp-3">{description}</p>
        <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20una%20sala."
          className="group/btn inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:gap-3"
          style={{ color: accent }}>
          Reservar esta sala
          <ChevronRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  );
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
const RoomsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} id="rooms" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text="Nuestras Salas" />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            Elige tu <span className="text-[#D4AF37]">mundo</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-7">
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
    { label: '1er Paso', title: 'Reserva', desc: 'Contáctanos por WhatsApp para asegurar tu aventura en la fecha y sala que prefieras.', icon: <MessageCircle size={20} />, link: 'https://wa.me/56996543715', phone: true },
    { label: '2do Paso', title: 'Llega', desc: 'Arriba 15 minutos antes de tu horario para la introducción y briefing con tu Game Master.', icon: <Navigation size={20} />, link: '#contact', phone: false },
    { label: '3er Paso', title: 'Juega', desc: 'Sumérgete en la historia. Tienes 60 minutos para resolver todos los enigmas y escapar.', icon: <GameController size={20} />, link: '#rooms', phone: false },
    { label: '4to Paso', title: 'Escapa', desc: '¡Celebra tu victoria o descubre los puzzles restantes! Foto grupal de recuerdo incluida.', icon: <Trophy size={20} />, link: '#testimonials', phone: false },
  ];
  return (
    <section ref={ref} className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text="El Proceso" />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            4 pasos para <span className="text-[#D4AF37]">la aventura</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ label, title, desc, icon, link, phone }, i) => (
            <a key={label} href={link}
              className={`group relative p-7 rounded-2xl border transition-all duration-700 ease-out hover:border-[#D4AF37]/40 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 130}ms`, background: '#0f0f0f', borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="absolute top-5 right-5 text-[10px] font-black tracking-[0.15em] uppercase text-[#D4AF37]/20 group-hover:text-[#D4AF37]/50 transition-all duration-400">
                {label}
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-black transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ background: '#D4AF37', boxShadow: '0 0 0 rgba(212,175,55,0)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(212,175,55,0.4)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 rgba(212,175,55,0)'; }}>
                {icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              {phone && <p className="text-[#D4AF37] text-xs font-bold mt-3">+56 9 9654 3715</p>}
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
    { text: 'Las Rafitas vivimos una aventura increíble. El trabajo en equipo fue clave. ¡Volveremos!', author: 'Las Rafitas', image: '/lasrafitas.jpeg' },
    { text: '¡El Club de Checho logró escapar en 54:47! Diversión, desafío y mucha emoción. ¡Imperdible!', author: 'Club de Checho', image: '/clubdechecho.jpeg' },
  ];
  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={ref} id="testimonials" className="py-28 overflow-hidden" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text="Opiniones" />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            Lo que dicen nuestros <span className="text-[#D4AF37]">aventureros</span>
          </h2>
        </div>
      </div>
      <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute left-0 top-0 w-24 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #080808, transparent)' }} />
        <div className="absolute right-0 top-0 w-24 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #080808, transparent)' }} />
        <div className="flex gap-5" style={{ width: `${doubled.length * 340}px`, animation: isPaused ? 'none' : 'scroll 38s linear infinite' }}>
          {doubled.map((t, i) => (
            <div key={i} className="min-w-[310px] p-6 rounded-2xl flex flex-col gap-4"
              style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => <Star key={s} size={11} fill="#D4AF37" className="text-[#D4AF37]" />)}
              </div>
              <p className="text-white/55 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                <img src={t.image} alt={t.author} className="w-9 h-9 rounded-full object-cover object-top border border-[#D4AF37]/30" />
                <span className="text-[#D4AF37] font-semibold text-xs">{t.author}</span>
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
    { q: '¿Qué es un Escape Room?', a: 'Es una experiencia de juego en vivo donde tú y tu equipo son "encerrados" temáticamente en una sala y tienen 60 minutos para resolver acertijos, encontrar pistas y completar una misión para "escapar" antes de que se acabe el tiempo.' },
    { q: '¿Estamos realmente encerrados?', a: '¡No! Por seguridad, nunca estás realmente encerrado. Siempre habrá una salida de emergencia accesible. Nuestro Game Master te explicará cómo funciona antes de empezar.' },
    { q: '¿Necesitamos alguna habilidad especial?', a: '¡Absolutamente no! Nuestros juegos están diseñados para poner a prueba tu lógica, observación, creatividad y trabajo en equipo. No necesitas fuerza física ni conocimientos previos.' },
    { q: '¿Qué pasa si no logramos escapar a tiempo?', a: 'No te preocupes. El Game Master entrará para explicarte las soluciones de los puzzles restantes y celebrar tu esfuerzo. Lo importante es la diversión.' },
    { q: '¿Se puede jugar con movilidad reducida?', a: 'Sí, nuestras salas están diseñadas para ser accesibles en general. Te recomendamos contactarnos por WhatsApp antes de reservar para confirmar la adaptabilidad.' },
    { q: '¿Cuántas personas pueden jugar?', a: 'Nuestras salas están diseñadas para grupos de 2 hasta 8 personas. Para grupos más grandes recomendamos reservar sesiones consecutivas.' },
    { q: '¿Hay edad mínima para participar?', a: 'Sala del Capitán Pinwine: recomendada para mayores de 8 años. Los menores de 14 deben ir con un adulto. Sala Zombie: edad mínima recomendada 12-14 años.' },
    { q: '¿Cuál es el precio por persona?', a: 'El precio es de $10.000 CLP por persona.' },
    { q: '¿Cómo puedo reservar?', a: 'Las reservas se realizan vía WhatsApp al +56 9 9654 3715. Envíanos un mensaje con la fecha, hora y sala que te interesa.' },
    { q: '¿Con cuánta anticipación debo llegar?', a: 'Te pedimos llegar 10-15 minutos antes de la hora reservada para la introducción y para asegurar que tu juego comience a tiempo.' },
    { q: '¿Cuánto dura la experiencia total?', a: 'El juego dura 60 minutos. Considera 10-15 minutos antes para introducción y 5-10 minutos después para foto. En total, unas 80-90 minutos.' },
    { q: '¿Cómo funciona la cancelación?', a: 'Para reservar se necesita el 50% del valor total. En caso de cancelación, ese 50% no se reembolsa. Puedes modificar tu reserva avisando con 24-48 horas de anticipación.' },
    { q: '¿Puedo usar mi celular dentro de la sala?', a: 'No se permite el uso de celulares dentro de la sala de juego para una inmersión completa y por confidencialidad de los puzzles.' },
    { q: '¿Tienen estacionamiento?', a: 'Estamos en Ramón Quezada 0470, La Casona Pucón. Contamos con estacionamiento en el lugar o en las cercanías.' },
    { q: '¿Qué hacer en Temuco con amigos?', a: 'Si buscas una actividad diferente y emocionante en Temuco, el escape room es una de las mejores opciones. En Escape Room Araucanía – Los Misterios de la Casona, ya estamos atendiendo en Temuco para que tú y tus amigos vivan una aventura de misterio, puzzles y adrenalina. Ideal para grupos de 2 a 8 personas. ¡Reserva directamente por WhatsApp!' },
    { q: '¿Qué planes de entretenimiento hay en Temuco?', a: 'Temuco ofrece cada vez más opciones de entretenimiento indoor. Una de las más innovadoras es visitar nuestro escape room en Temuco — Escape Room Araucanía. Una experiencia única que combina lógica, trabajo en equipo y narrativa inmersiva. Perfecta para cualquier época del año.' },
    { q: '¿Qué hacer en la Araucanía?', a: 'Además del turismo natural, la Araucanía ya cuenta con experiencias de entretenimiento únicas como Escape Room Araucanía, disponible en Temuco y Pucón. Vive la emoción de resolver acertijos en equipo dentro de salas temáticas ambientadas. Una actividad perfecta para complementar tu visita a la región.' },
    { q: '¿Actividades para team building en Temuco o Pucón?', a: 'El escape room es una de las actividades de team building más efectivas y divertidas. En Escape Room Araucanía ofrecemos experiencias en Temuco y Pucón diseñadas para fortalecer la comunicación, confianza y trabajo en equipo de tu empresa. Contáctanos para coordinar tu evento corporativo.' },
    { q: '¿Qué hacer en Pucón más allá del turismo tradicional?', a: 'Pucón no es solo volcán y lago. Los Misterios de la Casona, el primer escape room de Pucón, te ofrece una experiencia indoor única de misterio y aventura que puedes disfrutar en cualquier temporada, ubicado en La Casona Pucón junto a cafetería con vista al lago.' },
    { q: '¿Hay escape rooms en Temuco o en la Araucanía?', a: 'Sí, Escape Room Araucanía – Los Misterios de la Casona es el escape room de referencia en la región, con presencia en Pucón (el primero y único por años) y ahora también con sede en Temuco. Tenemos dos salas: El Pirata Pinwine (dificultad media) y El Elixir Zombie (dificultad alta).' },
    { q: '¿Dónde llevar a mi familia de visita en Temuco?', a: 'Si tienes visitas o simplemente quieres un plan diferente con tu familia en Temuco, el escape room es una excelente opción para todas las edades (desde 8 años con adulto). Escape Room Araucanía en Temuco ofrece una experiencia inmersiva, educativa y divertida. ¡Reserva por WhatsApp!' },
    { q: '¿Qué actividades hay en Pucón cuando llueve?', a: 'Para los días de lluvia en Pucón, Los Misterios de la Casona es la actividad indoor perfecta. Disfruta 60 minutos de adrenalina, misterio y puzzles en equipo sin importar el clima. Luego relájate en la cafetería Calma con vista al lago Villarrica.' },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text="FAQ" />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            ¿Tienes <span className="text-[#D4AF37]">preguntas?</span>
          </h2>
        </div>
        <div className="space-y-1.5">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl overflow-hidden border transition-all duration-300"
              style={{ background: activeIndex === index ? '#161616' : '#0f0f0f', borderColor: activeIndex === index ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.04)' }}>
              <button onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-4 px-6 text-left flex justify-between items-center gap-4 hover:bg-white/2 transition-colors duration-200">
                <span className="text-white/80 font-medium text-sm">{faq.q}</span>
                <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: activeIndex === index ? '#D4AF37' : 'rgba(212,175,55,0.12)' }}>
                  {activeIndex === index
                    ? <ChevronUp className="text-black" size={11} />
                    : <ChevronDown className="text-[#D4AF37]" size={11} />}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-400 ease-in-out ${activeIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5">
                  <p className="text-white/45 text-sm leading-relaxed">{faq.a}</p>
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
    <section ref={ref} className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text="Galería" />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            Galería de <span className="text-[#D4AF37]">aventureros</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {images.map((img, i) => (
            <div key={i}
              className={`group relative aspect-square overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 75}ms` }}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-400 flex items-end p-4">
                <span className="text-white font-semibold text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">{img.alt}</span>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/30 rounded-xl transition-all duration-400" />
            </div>
          ))}
        </div>
        <div className={`text-center mt-10 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://wa.me/56996543715?text=Hola%2C%20quiero%20reservar%20y%20ser%20parte%20de%20la%20galería."
            className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
            ¡Reserva y sé parte de nuestra galería! <ArrowRight size={15} />
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
    const t1 = setInterval(() => setConceptIdx(p => (p + 1) % conceptImgs.length), 4500);
    const t2 = setInterval(() => setCafeteriaIdx(p => (p + 1) % cafeteriaImgs.length), 4500);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const modules = [
    { title: 'Tienda Concept Store', subtitle: 'Un mundo de descubrimientos', description: 'Descubre una variada selección de productos y marcas, ideales para encontrar ese detalle especial, un regalo único o algo que te encante. Desde artículos de diseño hasta moda y artesanía local.', images: conceptImgs, currentIdx: conceptIdx, setIdx: setConceptIdx, isCarousel: true },
    { title: 'Cafetería Calma', subtitle: 'Vistas inolvidables al lago', description: 'Situada a la orilla del lago Villarrica, Calma ofrece el mejor café y una deliciosa selección de pastelería y snacks, con una vista espectacular. El spot ideal para recargar energías tras la aventura.', images: cafeteriaImgs, currentIdx: cafeteriaIdx, setIdx: setCafeteriaIdx, isCarousel: true },
    { title: 'Actividades y Talleres', subtitle: 'Un espacio siempre vivo', description: 'Regularmente somos anfitriones de exposiciones de arte, charlas culturales, workshops creativos y eventos comunitarios. ¡Mantente atento a nuestras redes para conocer la programación!', image: '/ACTIVIDADES1.jpeg', isCarousel: false },
    { title: 'Paseo a Orilla del Lago', subtitle: 'Un agradable recorrido peatonal', description: 'Disfruta de un relajante paseo por la hermosa orilla del lago Villarrica, justo al salir de La Casona. El complemento perfecto para tu día de aventura en Pucón.', image: '/CAFETERIA.jpeg', isCarousel: false },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text="El Lugar" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Cinzel', serif" }}>
            Más allá del <span className="text-[#D4AF37]">Escape Room</span>
          </h2>
          <p className="text-white/45 text-base max-w-2xl mx-auto leading-relaxed">
            Ubicados en la histórica La Casona Pucón, un espacio vibrante con opciones únicas para relajarte, comprar y disfrutar.
          </p>
        </div>
        <div className="space-y-20">
          {modules.map((m, i) => (
            <div key={i}
              className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''}`}
              style={{ transitionDelay: `${i * 180}ms` }}>
              <div>
                {m.isCarousel ? (
                  <div className="relative h-80 rounded-2xl overflow-hidden" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                    {m.images?.map((img, idx) => (
                      <img key={idx} src={img} alt={`${m.title} ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${idx === m.currentIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} />
                    ))}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {m.images?.map((_, idx) => (
                        <button key={idx} onClick={() => m.setIdx?.(idx)}
                          className={`rounded-full transition-all duration-300 ${idx === m.currentIdx ? 'w-5 h-1.5 bg-[#D4AF37]' : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/60'}`} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <img src={m.image} alt={m.title} className="w-full h-80 object-cover rounded-2xl"
                    style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }} />
                )}
              </div>
              <div>
                <div className="w-6 h-0.5 bg-[#D4AF37] mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>{m.title}</h3>
                <p className="text-[#D4AF37] font-medium mb-4 text-xs uppercase tracking-widest">{m.subtitle}</p>
                <p className="text-white/50 leading-relaxed text-sm">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20conocer%20La%20Casona%20Puc%C3%B3n."
            className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
            Descubre todo lo que tenemos <ArrowRight size={15} />
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
      <section ref={ref} id="contact" className="py-28" style={{ background: '#0c0c0c' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-14 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SectionLabel text="Contacto" />
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              Encuéntranos y <span className="text-[#D4AF37]">contáctanos</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-3 mb-8">
                {[
                  { icon: <MapPin size={18} />, label: 'Dirección', value: 'Ramón Quezada 0470, Pucón', href: null },
                  { icon: <Phone size={18} />, label: 'WhatsApp', value: '+56 9 9654 3715', href: 'https://wa.me/56996543715' },
                  { icon: <Mail size={18} />, label: 'Email', value: 'escaperoompucon@gmail.com', href: 'mailto:escaperoompucon@gmail.com' },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-[#D4AF37]/25 transition-all duration-300 group"
                    style={{ background: '#0f0f0f' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-black flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: '#D4AF37' }}>{icon}</div>
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">{label}</p>
                      {href ? <a href={href} className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300 font-medium text-sm">{value}</a>
                        : <p className="text-white/80 font-medium text-sm">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mb-8">
                <p className="text-white/30 text-xs">Síguenos en</p>
                <a href="https://www.instagram.com/escaperoom_pucon/?hl=es"
                  className="flex items-center gap-2 text-white/45 hover:text-[#D4AF37] transition-colors duration-300">
                  <Instagram size={18} />
                  <span className="text-xs font-semibold">@escaperoom_pucon</span>
                </a>
              </div>
              <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
                className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
                Reservar por WhatsApp <ArrowRight size={15} />
              </a>
            </div>
            <div className={`transition-all duration-1000 ease-out delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="rounded-2xl overflow-hidden border border-white/5" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
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

// ─── Pucón Footer ─────────────────────────────────────────────────────────────
const SiteFooter: React.FC<{ onChangeCity: () => void; city: string }> = ({ onChangeCity, city }) => (
  <footer className="py-9 border-t border-white/6" style={{ background: '#060606' }}>
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-3">
          <img src="/logoescaperoom.jpg" alt="Logo" className="h-9 w-auto rounded-lg opacity-80" />
          <div>
            <p className="text-white/70 font-semibold text-xs">Los Misterios de la Casona</p>
            <p className="text-white/25 text-[10px]">Escape Room — Pucón & Temuco</p>
          </div>
        </div>
        <p className="text-white/20 text-xs">© 2026 Los Misterios de la Casona. Todos los derechos reservados.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="text-white/20 hover:text-[#D4AF37] text-[10px] transition-colors duration-300">Privacidad</a>
          <a href="#" className="text-white/20 hover:text-[#D4AF37] text-[10px] transition-colors duration-300">Términos</a>
          <button onClick={onChangeCity} className="text-[#D4AF37]/30 hover:text-[#D4AF37] text-[10px] transition-colors duration-300 underline underline-offset-2">
            Cambiar ciudad
          </button>
        </div>
      </div>
    </div>
  </footer>
);


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
    <SiteFooter onChangeCity={onChangeCity} city="pucon" />
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [city, setCity] = useState<null | 'pucon' | 'temuco' | 'corporativo'>(null);

  if (city === null) return <CitySelector onSelect={setCity} />;
  if (city === 'temuco') return <TemucoPuconSite onChangeCity={() => setCity(null)} />;
  if (city === 'corporativo') return <CorporateSite onChangeCity={() => setCity(null)} />;
  return <PuconSite onChangeCity={() => setCity(null)} />;
}

export default App;
