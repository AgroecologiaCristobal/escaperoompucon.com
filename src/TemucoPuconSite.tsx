import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Phone, Mail, Instagram, Facebook, Users, Clock,
  Star, ChevronDown, ChevronUp, MessageCircle, Lock,
  ArrowRight, CheckCircle, Menu, X, Zap, Shield, ChevronLeft, ChevronRight
} from 'lucide-react';

const N = '#00FF88';           // neon green
const N_DIM = 'rgba(0,255,136,0.12)';  // neon tint bg
const N_GLOW = 'rgba(0,255,136,0.35)'; // glow shadow

const useScrolled = (offset = 60) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > offset);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [offset]);
  return scrolled;
};

const useInView = (threshold = 0.1) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, [threshold]);
  return [ref, visible] as const;
};

// ─── Neon CTA Button ──────────────────────────────────────────────────────────
const NeonBtn: React.FC<{ href: string; children: React.ReactNode; outline?: boolean; className?: string }> = ({
  href, children, outline, className = ''
}) => (
  <a href={href}
    className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${className}`}
    style={outline
      ? { border: `1.5px solid ${N}`, color: N, background: 'transparent',
          boxShadow: `0 0 12px ${N_GLOW}`,
          textShadow: `0 0 8px ${N_GLOW}` }
      : { background: N, color: '#000',
          boxShadow: `0 0 20px ${N_GLOW}, 0 0 40px rgba(0,255,136,0.15)` }}>
    {children}
  </a>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SecHeader: React.FC<{ label: string; title: React.ReactNode }> = ({ label, title }) => (
  <div className="text-center mb-14">
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${N})` }} />
      <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: N }}>{label}</span>
      <div className="h-px w-10" style={{ background: `linear-gradient(90deg, ${N}, transparent)` }} />
    </div>
    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
      {title}
    </h2>
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Salas', href: '#salas' },
    { label: 'Cómo Funciona', href: '#como-funciona' },
    { label: 'Precios', href: '#precios' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid rgba(0,255,136,0.08)` : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: N, boxShadow: `0 0 12px ${N_GLOW}` }}>
            <Zap size={16} className="text-black" />
          </div>
          <div>
            <span className="text-white font-black text-sm tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Escape Room
            </span>
            <span className="text-[10px] block tracking-[0.25em] uppercase" style={{ color: N }}>Araucanía — Temuco</span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a key={href} href={href}
              className="text-white/50 hover:text-white text-xs font-semibold tracking-widest uppercase transition-colors duration-300 hover:text-opacity-100"
              style={{ transition: 'color 0.3s' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = N; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = ''; }}>
              {label}
            </a>
          ))}
        </div>

        {/* CTA + change city (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={onChangeCity}
            className="text-white/25 hover:text-white/60 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 flex items-center gap-1.5">
            <MapPin size={11} /> Cambiar sede
          </button>
          <a href="#precios"
            className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{ background: N, color: '#000', boxShadow: `0 0 18px ${N_GLOW}` }}>
            Reservar
          </a>
        </div>

        {/* Mobile: cambiar sede + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={onChangeCity}
            className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 transition-colors duration-300"
            style={{ color: 'rgba(0,255,136,0.45)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = N; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(0,255,136,0.45)'; }}>
            <MapPin size={11} /> Cambiar
          </button>
          <button onClick={() => setOpen(!open)} className="text-white/60 hover:text-white transition-colors duration-300">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-400 overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(8,8,8,0.98)', borderTop: `1px solid rgba(0,255,136,0.08)` }}>
        <div className="px-6 py-5 space-y-4">
          {links.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="block text-white/60 font-semibold text-sm uppercase tracking-widest hover:text-white transition-colors duration-300">
              {label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/8 flex gap-3">
            <a href="#precios" onClick={() => setOpen(false)}
              className="flex-1 text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider"
              style={{ background: N, color: '#000' }}>
              Reservar Ahora
            </a>
            <button onClick={() => { setOpen(false); onChangeCity(); }}
              className="flex-1 text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider border"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}>
              Ir a Pucón
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 200); }, []);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/zombie.png" alt="Escape Room Araucanía"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.22) saturate(0.8)', transform: 'scale(1.06)' }} />
      </div>
      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.98) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,255,136,0.04) 0%, transparent 60%)' }} />
      {/* Scanlines subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.15) 2px, rgba(0,255,136,0.15) 3px)', backgroundSize: '100% 4px' }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-16 pt-32">
        <div className="max-w-4xl mx-auto w-full">
          <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ background: N, boxShadow: `0 0 10px ${N_GLOW}` }} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: N }}>Temuco — Región de la Araucanía</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-4 tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              ESCAPE ROOM
              <br />
              <span style={{ color: N, textShadow: `0 0 30px ${N_GLOW}, 0 0 60px rgba(0,255,136,0.15)` }}>ARAUCANÍA</span>
            </h1>
          </div>

          <p className={`text-white/60 text-xl md:text-2xl mb-9 max-w-xl leading-relaxed transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '450ms' }}>
            ¿Podrás escapar antes de que sea <span className="text-white/85">demasiado tarde</span>?
          </p>

          <div className={`flex flex-wrap gap-3 mb-14 transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '700ms' }}>
            <NeonBtn href="#precios">
              Reservar Ahora <ArrowRight size={15} />
            </NeonBtn>
            <NeonBtn href="#salas" outline>
              Ver Salas
            </NeonBtn>
          </div>

          {/* Stats bar */}
          <div className={`flex flex-wrap gap-6 pt-7 border-t transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '950ms', borderColor: 'rgba(0,255,136,0.12)' }}>
            {[
              { icon: <Clock size={16} />, num: '60', label: 'Minutos' },
              { icon: <Users size={16} />, num: '2-6', label: 'Personas' },
              { icon: <MapPin size={16} />, num: '', label: 'Temuco' },
            ].map(({ icon, num, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div style={{ color: N }}>{icon}</div>
                <div>
                  {num && <span className="font-black text-white text-sm mr-1">{num}</span>}
                  <span className="text-white/40 text-xs uppercase tracking-widest">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${N}, transparent)`, opacity: 0.3 }} />
    </section>
  );
};

// ─── About ────────────────────────────────────────────────────────────────────
const About: React.FC = () => {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} className="py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: N }} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: N }}>Sobre la Experiencia</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              Sobre la <span style={{ color: N }}>Experiencia</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-8">
              Vive una experiencia inmersiva llena de misterio, acertijos y adrenalina. Tú y tu equipo tendrán <span className="text-white font-semibold">60 minutos</span> para resolver los enigmas y escapar. ¿Están listos para el desafío?
            </p>
            <div className="space-y-3 mb-9">
              {[
                'Ambientaciones únicas y realistas',
                'Acertijos diseñados para tu mente',
                'Ideal para amigos, familias y empresas',
                'Game Master en cada sesión',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={15} style={{ color: N, flexShrink: 0 }} />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <NeonBtn href="#salas">
              Ver Nuestras Salas <ArrowRight size={15} />
            </NeonBtn>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-300 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl opacity-20"
                style={{ background: `radial-gradient(circle, ${N}, transparent)` }} />
              <img src="/CAFETERIA1.jpeg" alt="Experiencia inmersiva"
                className="w-full h-96 object-cover rounded-2xl relative z-10"
                style={{ boxShadow: `0 30px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,136,0.06)` }} />
              {/* Overlay top */}
              <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.05), transparent 60%)' }} />
              <div className="absolute -bottom-5 -left-5 p-5 rounded-2xl z-30 text-center"
                style={{ background: '#0f0f0f', border: `1px solid rgba(0,255,136,0.2)`, boxShadow: `0 0 30px rgba(0,255,136,0.12)` }}>
                <div className="text-3xl font-black" style={{ color: N }}>60'</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Adrenalina</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
const Rooms: React.FC = () => {
  const [ref, vis] = useInView();

  const rooms = [
    {
      title: 'ELIXIR ZOMBIE',
      description: 'Un experimento fallido ha convertido todo en caos. Encuentra el antídoto y sobrevive antes de que la infección se propague.',
      image: '/zombie.png',
      difficulty: 'Alta',
      players: '2-6',
      available: true,
      diffColor: '#FF4444',
    },
    {
      title: 'REFUGIO 42',
      description: 'Un refugio secreto esconde oscuros secretos. Descifra los códigos, sigue las pistas y logra escapar antes de que sea tarde.',
      image: '/familiazooligico2.jpeg',
      difficulty: 'Media',
      players: '2-6',
      available: true,
      diffColor: N,
    },
    {
      title: 'REFUGIO 40',
      description: 'Muy pronto una nueva misión estará disponible. Prepárate para el mayor desafío de Escape Room Araucanía.',
      image: '/ACTIVIDADES1.jpeg',
      difficulty: '???',
      players: '2-6',
      available: false,
      diffColor: '#666',
    },
  ];

  return (
    <section ref={ref} id="salas" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Nuestras Salas" title={<>Nuestras <span style={{ color: N }}>Salas</span></>} />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <div key={room.title}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'} ${!room.available ? 'opacity-70' : ''}`}
              style={{
                transitionDelay: `${i * 130}ms`,
                background: '#0f0f0f',
                border: `1px solid ${room.available ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)'}`,
              }}>

              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img src={room.image} alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: room.available ? 'brightness(0.55)' : 'brightness(0.25) grayscale(0.7)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
                {!room.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Lock size={28} className="text-white/30 mx-auto mb-2" />
                      <span className="text-white/30 text-xs font-bold tracking-widest uppercase">Próximamente</span>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      background: room.available ? `${room.diffColor}20` : 'rgba(255,255,255,0.08)',
                      color: room.available ? room.diffColor : '#666',
                      border: `1px solid ${room.available ? `${room.diffColor}40` : 'rgba(255,255,255,0.08)'}`,
                    }}>
                    Dificultad {room.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 px-2.5 py-1.5 rounded-full">
                  <Users size={10} className="text-white/50" />
                  <span className="text-white/50 text-[10px] font-medium">{room.players}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="w-5 h-0.5 mb-3" style={{ background: room.available ? N : '#444' }} />
                <h3 className="text-lg font-black text-white mb-3 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                  {room.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed mb-5">{room.description}</p>
                {room.available ? (
                  <a href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20una%20sala%20en%20Temuco."
                    className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:gap-3"
                    style={{ color: N }}>
                    Ver más <ArrowRight size={12} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-white/20 cursor-not-allowed">
                    Próximamente
                  </span>
                )}
              </div>

              {/* Bottom glow on hover */}
              {room.available && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: `linear-gradient(90deg, ${N}, transparent)` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
const HowItWorks: React.FC = () => {
  const [ref, vis] = useInView();
  const steps = [
    { label: '1er Paso', title: 'Arma tu Equipo', desc: 'Reúne de 2 a 6 jugadores. Familia, amigos o compañeros de trabajo.', icon: <Users size={22} /> },
    { label: '2do Paso', title: 'Elige tu Sala', desc: 'Selecciona la misión que quieres vivir. Cada sala tiene su propia historia.', icon: <MapPin size={22} /> },
    { label: '3er Paso', title: 'Resuelve los Acertijos', desc: 'Usa tu ingenio, trabaja en equipo y encuentra las pistas ocultas.', icon: <Zap size={22} /> },
    { label: '4to Paso', title: 'Escapa a Tiempo', desc: 'Tienen 60 minutos. El reloj ya está corriendo. ¿Podrán lograrlo?', icon: <Clock size={22} /> },
  ];

  return (
    <section ref={ref} id="como-funciona" className="py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="El Proceso" title={<>Cómo <span style={{ color: N }}>Funciona</span></>} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ label, title, desc, icon }, i) => (
            <div key={label}
              className={`group relative p-7 rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-2 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{
                transitionDelay: `${i * 120}ms`,
                background: '#0f0f0f',
                borderColor: 'rgba(0,255,136,0.07)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px rgba(0,255,136,0.05)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.07)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>

              <div className="absolute top-5 right-5 text-[10px] font-black tracking-widest uppercase transition-all duration-300"
                style={{ color: 'rgba(0,255,136,0.15)' }}>
                {label}
              </div>

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: N_DIM, color: N, border: `1px solid rgba(0,255,136,0.2)` }}>
                {icon}
              </div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wide">{title}</h3>
              <p className="text-white/38 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Why Us ───────────────────────────────────────────────────────────────────
const WhyUs: React.FC = () => {
  const [ref, vis] = useInView();
  const items = [
    { icon: <Star size={24} />, title: 'INMERSIVO', desc: 'Historias y ambientaciones únicas y realistas que te atraparán desde el primer segundo.' },
    { icon: <Lock size={24} />, title: 'DESAFIANTE', desc: 'Acertijos diseñados para poner a prueba tu mente, lógica y trabajo en equipo.' },
    { icon: <Users size={24} />, title: 'PARA TODOS', desc: 'Amigos, familias, empresas y equipos de trabajo. Una aventura que une a las personas.' },
    { icon: <Clock size={24} />, title: '60 MINUTOS', desc: 'La cuenta regresiva ya comenzó. Cada segundo cuenta. ¿Están listos?' },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Ventajas" title={<>¿Por qué <span style={{ color: N }}>Elegirnos?</span></>} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon, title, desc }, i) => (
            <div key={title}
              className={`group p-8 rounded-2xl border text-center transition-all duration-700 ease-out hover:-translate-y-2 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 100}ms`, background: '#0f0f0f', borderColor: 'rgba(0,255,136,0.07)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px rgba(0,255,136,0.04)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.07)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: N_DIM, color: N, border: `1px solid rgba(0,255,136,0.2)` }}>
                {icon}
              </div>
              <h3 className="font-black text-white text-sm uppercase tracking-widest mb-3">{title}</h3>
              <p className="text-white/38 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const Testimonials: React.FC = () => {
  const [ref, vis] = useInView();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    { text: '¡Increíble experiencia, 100% recomendado! La ambientación y los puzzles son de otro mundo. Volvemos pronto.', author: 'Carla M.', role: 'Cliente' },
    { text: 'Los desafíos y la ambientación son de otro nivel. Nunca habíamos vivido algo así en Temuco. ¡Imperdible!', author: 'Tomás R.', role: 'Cliente' },
    { text: 'Volveremos sin duda, nos encantó. El Game Master fue genial y los acertijos nos hicieron pensar bastante.', author: 'Javiera P.', role: 'Cliente' },
    { text: 'Fuimos en grupo de trabajo y fue un team building increíble. Muy recomendado para empresas.', author: 'Carlos V.', role: 'Team Building' },
    { text: 'La sala Elixir Zombie es terrorífica en el buen sentido. ¡Adrenalina pura de principio a fin!', author: 'María J.', role: 'Cliente' },
  ];

  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(p => (p + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Opiniones" title={<>Lo que Dicen Nuestros <span style={{ color: N }}>Jugadores</span></>} />
        </div>

        <div className={`relative transition-all duration-1000 ease-out delay-300 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main testimonial */}
          <div className="p-8 md:p-12 rounded-2xl text-center mb-6"
            style={{ background: '#0f0f0f', border: `1px solid rgba(0,255,136,0.1)`, boxShadow: `0 0 40px rgba(0,255,136,0.04)` }}>
            <div className="flex gap-1 justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={N} style={{ color: N, filter: `drop-shadow(0 0 4px ${N_GLOW})` }} />
              ))}
            </div>
            <blockquote className="text-white/75 text-lg md:text-xl leading-relaxed mb-6 italic">
              "{testimonials[current].text}"
            </blockquote>
            <div>
              <p className="font-black text-white text-sm">— {testimonials[current].author}</p>
              <p className="text-xs uppercase tracking-widest mt-1" style={{ color: N }}>{testimonials[current].role}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5">
            <button onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110"
              style={{ borderColor: 'rgba(0,255,136,0.2)', color: N }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = N_DIM; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === current ? '24px' : '6px', height: '6px', background: i === current ? N : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>
            <button onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110"
              style={{ borderColor: 'rgba(0,255,136,0.2)', color: N }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = N_DIM; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Pricing ──────────────────────────────────────────────────────────────────
const Pricing: React.FC = () => {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} id="precios" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Tarifas" title={<>Precios y <span style={{ color: N }}>Reservas</span></>} />
        </div>
        <div className={`grid md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto transition-all duration-1000 ease-out delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Price card */}
          <div className="p-10 rounded-2xl text-center relative overflow-hidden"
            style={{ background: '#0f0f0f', border: `1px solid rgba(0,255,136,0.2)`, boxShadow: `0 0 50px rgba(0,255,136,0.07)` }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${N}, transparent)`, opacity: 0.5 }} />
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">Desde</p>
            <div className="mb-2">
              <span className="text-6xl font-black" style={{ color: N, textShadow: `0 0 20px ${N_GLOW}` }}>$18.000</span>
            </div>
            <p className="text-white/35 text-xs uppercase tracking-widest mb-8">Por Persona</p>
            <NeonBtn href="https://wa.me/56996543715?text=Hola%2C%20quiero%20reservar%20en%20Escape%20Room%20Araucania%20Temuco." className="w-full justify-center">
              Reservar Ahora <ArrowRight size={14} />
            </NeonBtn>
          </div>

          {/* Features list */}
          <div className="space-y-4">
            {[
              'Precio por persona',
              'Mínimo 2 jugadores',
              'Máximo 6 jugadores por sala',
              'Reserva online fácil y rápida',
              '60 minutos de aventura pura',
              'Game Master incluido',
              'Foto grupal al finalizar',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: N_DIM, border: `1px solid rgba(0,255,136,0.2)` }}>
                  <CheckCircle size={11} style={{ color: N }} />
                </div>
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
            <div className="pt-4">
              <NeonBtn href="https://wa.me/56996543715?text=Hola%2C%20quiero%20reservar%20en%20Escape%20Room%20Araucania%20Temuco." outline>
                Consultar por WhatsApp
              </NeonBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Location ─────────────────────────────────────────────────────────────────
const Location: React.FC = () => {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} id="contacto" className="py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Dónde Estamos" title={<>Nuestra <span style={{ color: N }}>Ubicación</span></>} />
        </div>
        <div className={`grid md:grid-cols-2 gap-12 items-start transition-all duration-1000 ease-out delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border"
            style={{ borderColor: 'rgba(0,255,136,0.1)', boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,255,136,0.04)` }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.234567890123!2d-71.9762225!3d-39.2666282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96147f4838ebcf1d:0x5f6543199a9b5c15!2sEscape+room+pucon!5e0!3m2!1ses!2scl!4v1678901234567!5m2!1ses!2scl"
              width="100%" height="380"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.5)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Escape Room Araucanía Temuco"
            />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                Escape Room Araucanía
              </h3>
              <p className="text-xs uppercase tracking-widest" style={{ color: N }}>Temuco — Región de La Araucanía</p>
            </div>

            {[
              { icon: <MapPin size={18} />, label: 'Ubicación', value: 'Temuco, Región de La Araucanía' },
              { icon: <MapPin size={18} />, label: 'Referencia', value: 'A pasos del centro de Temuco' },
              { icon: <Phone size={18} />, label: 'WhatsApp', value: '+56 9 9654 3715', href: 'https://wa.me/56996543715' },
              { icon: <Mail size={18} />, label: 'Email', value: 'escaperoompucon@gmail.com', href: 'mailto:escaperoompucon@gmail.com' },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: '#0f0f0f', border: '1px solid rgba(0,255,136,0.07)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: N_DIM, color: N, border: `1px solid rgba(0,255,136,0.15)` }}>
                  {icon}
                </div>
                <div>
                  <p className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-white/75 text-sm font-medium hover:transition-colors duration-300"
                      onMouseEnter={e => { (e.target as HTMLElement).style.color = N; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.color = ''; }}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-white/75 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <a href="https://maps.google.com/?q=Temuco,Araucania,Chile" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{ border: `1.5px solid ${N}`, color: N, boxShadow: `0 0 15px rgba(0,255,136,0.15)` }}>
              <MapPin size={15} /> Ver en Mapa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => (
  <footer className="py-16 border-t" style={{ background: '#060606', borderColor: 'rgba(0,255,136,0.07)' }}>
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-10 mb-10">

        {/* Col 1: Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: N, boxShadow: `0 0 12px ${N_GLOW}` }}>
              <Zap size={13} className="text-black" />
            </div>
            <span className="text-white font-black text-sm uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
              Escape Room Araucanía
            </span>
          </div>
          <p className="text-white/30 text-xs leading-relaxed">
            ¿Podrás escapar antes de que sea demasiado tarde?
          </p>
        </div>

        {/* Col 2: Nav */}
        <div>
          <p className="font-black text-white text-xs uppercase tracking-widest mb-4">Navegación</p>
          <ul className="space-y-2.5">
            {[['Inicio', '#inicio'], ['Salas', '#salas'], ['Cómo Funciona', '#como-funciona'], ['Precios', '#precios'], ['Contacto', '#contacto']].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-white/35 text-xs hover:transition-colors duration-300"
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = N; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = ''; }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <p className="font-black text-white text-xs uppercase tracking-widest mb-4">Contacto</p>
          <ul className="space-y-2.5">
            <li><a href="https://wa.me/56996543715" className="text-white/35 text-xs">+56 9 9654 3715</a></li>
            <li><a href="mailto:escaperoompucon@gmail.com" className="text-white/35 text-xs">escaperoompucon@gmail.com</a></li>
            <li><span className="text-white/35 text-xs">Temuco, Araucanía</span></li>
          </ul>
        </div>

        {/* Col 4: Social */}
        <div>
          <p className="font-black text-white text-xs uppercase tracking-widest mb-4">Síguenos</p>
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={16} />, href: 'https://www.instagram.com/escaperoom_pucon/?hl=es', label: 'Instagram' },
              { icon: <Facebook size={16} />, href: '#', label: 'Facebook' },
              { icon: <MessageCircle size={16} />, href: 'https://wa.me/56996543715', label: 'WhatsApp' },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href}
                className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110"
                style={{ borderColor: 'rgba(0,255,136,0.15)', color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = N; (e.currentTarget as HTMLElement).style.color = N; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${N_GLOW}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                {icon}
              </a>
            ))}
          </div>
          <button onClick={onChangeCity}
            className="mt-5 text-white/20 hover:text-white/60 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 underline underline-offset-2">
            Ir a la sede Pucón
          </button>
        </div>
      </div>

      <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p className="text-white/18 text-xs">© 2026 Escape Room Araucanía. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="#" className="text-white/18 hover:text-white/40 text-[10px] transition-colors duration-300">Privacidad</a>
          <a href="#" className="text-white/18 hover:text-white/40 text-[10px] transition-colors duration-300">Términos</a>
        </div>
      </div>
    </div>
  </footer>
);

// ─── Temuco Site ──────────────────────────────────────────────────────────────
const TemucoPuconSite: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => (
  <div className="min-h-screen text-white" style={{ background: '#080808' }}>
    <Navbar onChangeCity={onChangeCity} />
    <Hero onChangeCity={onChangeCity} />
    <About />
    <Rooms />
    <HowItWorks />
    <WhyUs />
    <Testimonials />
    <Pricing />
    <Location />
    <Footer onChangeCity={onChangeCity} />
  </div>
);

export default TemucoPuconSite;
