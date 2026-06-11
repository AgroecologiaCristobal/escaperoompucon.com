import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Phone, Mail, Instagram, Users, ArrowRight,
  CheckCircle, Star, Zap, Shield, Trophy, Heart, Menu, X
} from 'lucide-react';

const C = '#60A5FA';           // corporate neon blue
const C_DIM = 'rgba(96,165,250,0.10)';
const C_GLOW = 'rgba(96,165,250,0.35)';

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

const BlueBtn: React.FC<{ href: string; children: React.ReactNode; outline?: boolean; className?: string }> = ({
  href, children, outline, className = ''
}) => (
  <a href={href}
    className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${className}`}
    style={outline
      ? { border: `1.5px solid ${C}`, color: C, background: 'transparent', boxShadow: `0 0 12px ${C_GLOW}` }
      : { background: C, color: '#000', boxShadow: `0 0 20px ${C_GLOW}, 0 0 40px rgba(96,165,250,0.12)` }}>
    {children}
  </a>
);

const SecHeader: React.FC<{ label: string; title: React.ReactNode }> = ({ label, title }) => (
  <div className="text-center mb-14">
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${C})` }} />
      <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: C }}>{label}</span>
      <div className="h-px w-10" style={{ background: `linear-gradient(90deg, ${C}, transparent)` }} />
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
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo Funciona', href: '#como-funciona' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(8,8,12,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid rgba(96,165,250,0.08)` : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: C, boxShadow: `0 0 12px ${C_GLOW}` }}>
            <Shield size={16} className="text-black" />
          </div>
          <div>
            <span className="text-white font-black text-sm tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Escape Room
            </span>
            <span className="text-[10px] block tracking-[0.25em] uppercase" style={{ color: C }}>Corporativo — Araucanía</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a key={href} href={href}
              className="text-white/50 text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
              onMouseEnter={e => { (e.target as HTMLElement).style.color = C; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = ''; }}>
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={onChangeCity}
            className="text-white/25 hover:text-white/60 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 flex items-center gap-1.5">
            <MapPin size={11} /> Cambiar sede
          </button>
          <a href="#contacto"
            className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{ background: C, color: '#000', boxShadow: `0 0 18px ${C_GLOW}` }}>
            Cotizar
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={onChangeCity}
            className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 transition-colors duration-300"
            style={{ color: 'rgba(96,165,250,0.45)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(96,165,250,0.45)'; }}>
            <MapPin size={11} /> Cambiar
          </button>
          <button onClick={() => setOpen(!open)} className="text-white/60 hover:text-white">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-400 overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(8,8,12,0.98)', borderTop: `1px solid rgba(96,165,250,0.08)` }}>
        <div className="px-6 py-5 space-y-4">
          {links.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="block text-white/60 font-semibold text-sm uppercase tracking-widest hover:text-white transition-colors duration-300">
              {label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/8 flex gap-3">
            <a href="#contacto" onClick={() => setOpen(false)}
              className="flex-1 text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider"
              style={{ background: C, color: '#000' }}>
              Cotizar Ahora
            </a>
            <button onClick={() => { setOpen(false); onChangeCity(); }}
              className="flex-1 text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider border"
              style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}>
              Cambiar sede
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
      <div className="absolute inset-0">
        <img src="/ganyateam.jpeg" alt="Team corporativo"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25) saturate(0.6)', transform: 'scale(1.06)' }} />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,12,0.55) 0%, rgba(0,0,12,0.1) 40%, rgba(0,0,12,0.75) 80%, rgba(0,0,12,0.98) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(96,165,250,0.06) 0%, transparent 65%)' }} />

      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-16 pt-32">
        <div className="max-w-4xl mx-auto w-full">
          <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ background: C, boxShadow: `0 0 10px ${C_GLOW}` }} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: C }}>Team Building & Eventos Corporativos</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-4 tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              ESCAPE ROOM
              <br />
              <span style={{ color: C, textShadow: `0 0 30px ${C_GLOW}, 0 0 60px rgba(96,165,250,0.15)` }}>CORPORATIVO</span>
            </h1>
          </div>

          <p className={`text-white/60 text-xl md:text-2xl mb-9 max-w-2xl leading-relaxed transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '450ms' }}>
            Fortalece tu equipo a través de la experiencia más intensa de trabajo colaborativo. Misterio, adrenalina y resultados <span className="text-white/85">reales para tu empresa</span>.
          </p>

          <div className={`flex flex-wrap gap-3 mb-14 transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '700ms' }}>
            <BlueBtn href="#contacto">
              Cotizar para mi empresa <ArrowRight size={15} />
            </BlueBtn>
            <BlueBtn href="#servicios" outline>
              Ver Servicios
            </BlueBtn>
          </div>

          <div className={`flex flex-wrap gap-8 pt-7 border-t transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '950ms', borderColor: 'rgba(96,165,250,0.12)' }}>
            {[['2-50+', 'participantes'], ['60', 'min de desafío'], ['Pucón & Temuco', 'disponible']].map(([num, label]) => (
              <div key={label}>
                <div className="font-black text-sm" style={{ color: C }}>{num}</div>
                <div className="text-white/35 text-xs uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${C}, transparent)`, opacity: 0.25 }} />
    </section>
  );
};

// ─── Services ─────────────────────────────────────────────────────────────────
const Services: React.FC = () => {
  const [ref, vis] = useInView();
  const services = [
    {
      icon: <Users size={24} />,
      title: 'Team Building',
      desc: 'Actividad diseñada para fortalecer la comunicación, confianza y trabajo en equipo de tu organización. Resultados medibles, diversión garantizada.',
      features: ['Grupos de 6 a 50+ personas', 'Modalidad competitiva o colaborativa', 'Informe de desempeño del equipo'],
    },
    {
      icon: <Trophy size={24} />,
      title: 'Eventos Corporativos',
      desc: 'Celebra lanzamientos, aniversarios o logros de empresa con una experiencia única e inmersiva que tu equipo nunca olvidará.',
      features: ['Personalización con la identidad de tu marca', 'Coordinación integral del evento', 'Espacio exclusivo para grupos'],
    },
    {
      icon: <Zap size={24} />,
      title: 'Incentivos & Premios',
      desc: 'Premia a tus mejores talentos o motiva a tu fuerza de ventas con una experiencia diferente que demuestra cuánto valoras a tu gente.',
      features: ['Gift cards disponibles', 'Certificados de participación', 'Flexibilidad de fechas y horarios'],
    },
    {
      icon: <Heart size={24} />,
      title: 'Bienestar Laboral',
      desc: 'Rompe la rutina y revitaliza el ánimo de tu equipo. El escape room es una poderosa herramienta de bienestar organizacional.',
      features: ['Promueve el pensamiento lateral', 'Reduce el estrés de forma lúdica', 'Ideal para toda edad y condición física'],
    },
  ];

  return (
    <section ref={ref} id="servicios" className="py-28" style={{ background: '#0a0a0f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Servicios" title={<>Nuestros <span style={{ color: C }}>Servicios</span></>} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon, title, desc, features }, i) => (
            <div key={title}
              className={`group p-8 rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-1 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 120}ms`, background: '#0f0f18', borderColor: 'rgba(96,165,250,0.08)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px rgba(96,165,250,0.05)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.08)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: C_DIM, color: C, border: `1px solid rgba(96,165,250,0.2)` }}>
                {icon}
              </div>
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">{desc}</p>
              <div className="space-y-2">
                {features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle size={12} style={{ color: C, flexShrink: 0 }} />
                    <span className="text-white/50 text-xs">{f}</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, ${C}, transparent)` }} />
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
    { num: '01', title: 'Cotiza', desc: 'Cuéntanos el tamaño de tu equipo, la fecha y el objetivo. Preparamos una propuesta personalizada en 24 horas.' },
    { num: '02', title: 'Personaliza', desc: 'Adaptamos la experiencia a tu empresa: temática, narrativa, branding y nivel de dificultad según tu equipo.' },
    { num: '03', title: 'Vive la Experiencia', desc: '60 minutos de adrenalina colectiva. Tu equipo trabaja unido bajo presión real en un entorno controlado y seguro.' },
    { num: '04', title: 'Celebra', desc: 'Foto grupal, debriefing de liderazgo y análisis de cómo trabajó tu equipo. Resultados que se llevan al día a día.' },
  ];

  return (
    <section ref={ref} id="como-funciona" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="El Proceso" title={<>¿Cómo <span style={{ color: C }}>Funciona?</span></>} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ num, title, desc }, i) => (
            <div key={num}
              className={`group relative p-7 rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-2 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 120}ms`, background: '#0f0f18', borderColor: 'rgba(96,165,250,0.07)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.07)'; }}>
              <div className="text-6xl font-black leading-none mb-5 select-none"
                style={{ color: 'rgba(96,165,250,0.07)', fontFamily: "'Cinzel', serif" }}>
                {num}
              </div>
              <h3 className="font-black text-white text-sm uppercase tracking-wide mb-2">{title}</h3>
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
    { icon: <Shield size={20} />, label: 'Experiencia comprobada', desc: 'Años llevando el primer escape room de Pucón. Tu empresa merece la mejor experiencia.' },
    { icon: <Users size={20} />, label: 'Grupos grandes', desc: 'Capacidad para equipos de 6 hasta 50+ personas con sesiones personalizadas.' },
    { icon: <Star size={20} />, label: 'Personalización total', desc: 'Adaptamos la narrativa, dificultad y branding a los valores e identidad de tu empresa.' },
    { icon: <Trophy size={20} />, label: 'Resultados medibles', desc: 'Debriefing post-experiencia con análisis del desempeño del equipo.' },
    { icon: <Zap size={20} />, label: 'Pucón y Temuco', desc: 'Disponible en ambas sedes. Elige la que mejor se adapte a tu equipo.' },
    { icon: <Heart size={20} />, label: 'Atención dedicada', desc: 'Un coordinador asignado a tu evento desde la cotización hasta la experiencia final.' },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#0a0a0f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Diferencial" title={<>¿Por Qué <span style={{ color: C }}>Elegirnos?</span></>} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon, label, desc }, i) => (
            <div key={label}
              className={`flex gap-4 p-6 rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-1 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 80}ms`, background: '#0f0f18', borderColor: 'rgba(96,165,250,0.07)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.07)'; }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: C_DIM, color: C, border: `1px solid rgba(96,165,250,0.18)` }}>
                {icon}
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">{label}</p>
                <p className="text-white/38 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Gallery ──────────────────────────────────────────────────────────────────
const Gallery: React.FC = () => {
  const [ref, vis] = useInView();
  const imgs = [
    { src: '/ganyateam.jpeg', alt: 'Equipo corporativo' },
    { src: '/jabaliesytablas.jpeg', alt: 'Team building' },
    { src: '/familiazoologico.jpeg', alt: 'Grupo aventurero' },
    { src: '/clubdechecho.jpeg', alt: 'Club corporativo' },
    { src: '/lasindomitas.jpeg', alt: 'Equipo femenino' },
    { src: '/lospifiados.jpeg', alt: 'Grupo en acción' },
  ];

  return (
    <section ref={ref} id="galeria" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Galería" title={<>Empresas que <span style={{ color: C }}>Nos Eligieron</span></>} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {imgs.map((img, i) => (
            <div key={i}
              className={`group relative aspect-video overflow-hidden rounded-xl transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-400" />
              <div className="absolute inset-0 border border-transparent group-hover:rounded-xl transition-all duration-400"
                style={{ borderColor: 'rgba(96,165,250,0)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0)'; }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [ref, vis] = useInView();
  return (
    <section ref={ref} id="contacto" className="py-28" style={{ background: '#0a0a0f' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label="Contacto" title={<>Cotiza para <span style={{ color: C }}>tu Empresa</span></>} />
        </div>

        {/* CTA banner */}
        <div className={`p-8 md:p-12 rounded-2xl text-center mb-10 transition-all duration-1000 ease-out delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ background: '#0f0f18', border: `1px solid rgba(96,165,250,0.15)`, boxShadow: `0 0 60px rgba(96,165,250,0.05)` }}>
          <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${C}, transparent)`, opacity: 0.5 }} />
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">¿Listo para potenciar tu equipo?</p>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            Escríbenos y te preparamos una <span style={{ color: C }}>propuesta a medida</span>
          </h3>
          <p className="text-white/40 text-sm mb-7 max-w-md mx-auto leading-relaxed">
            Cuéntanos el tamaño de tu equipo y el objetivo del evento. Te respondemos en menos de 24 horas.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <BlueBtn href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20cotizar%20un%20evento%20corporativo%20de%20escape%20room.">
              Cotizar por WhatsApp <ArrowRight size={14} />
            </BlueBtn>
            <BlueBtn href="mailto:escaperoompucon@gmail.com" outline>
              Enviar Email
            </BlueBtn>
          </div>
        </div>

        {/* Contact cards */}
        <div className={`grid md:grid-cols-3 gap-4 transition-all duration-1000 ease-out delay-400 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { icon: <Phone size={18} />, label: 'WhatsApp', value: '+56 9 9654 3715', href: 'https://wa.me/56996543715' },
            { icon: <Mail size={18} />, label: 'Email', value: 'escaperoompucon@gmail.com', href: 'mailto:escaperoompucon@gmail.com' },
            { icon: <MapPin size={18} />, label: 'Sedes', value: 'Pucón & Temuco', href: null },
          ].map(({ icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-xl border"
              style={{ background: '#0f0f18', borderColor: 'rgba(96,165,250,0.07)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: C_DIM, color: C }}>
                {icon}
              </div>
              <div>
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5">{label}</p>
                {href ? (
                  <a href={href} className="text-white/70 text-sm font-medium transition-colors duration-300"
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = C; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = ''; }}>
                    {value}
                  </a>
                ) : <p className="text-white/70 text-sm font-medium">{value}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => (
  <footer className="py-10 border-t" style={{ background: '#060609', borderColor: 'rgba(96,165,250,0.07)' }}>
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C, boxShadow: `0 0 10px ${C_GLOW}` }}>
            <Shield size={13} className="text-black" />
          </div>
          <div>
            <p className="text-white/70 font-semibold text-xs">Escape Room Corporativo — Araucanía</p>
            <p className="text-white/22 text-[10px]">Pucón & Temuco</p>
          </div>
        </div>
        <p className="text-white/18 text-xs">© 2026 Escape Room Araucanía. Todos los derechos reservados.</p>
        <div className="flex items-center gap-5">
          <a href="https://www.instagram.com/escaperoom_pucon/?hl=es" className="text-white/22 hover:text-white/50 transition-colors duration-300">
            <Instagram size={16} />
          </a>
          <button onClick={onChangeCity} className="text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 underline underline-offset-2"
            style={{ color: 'rgba(96,165,250,0.35)' }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = C; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(96,165,250,0.35)'; }}>
            Cambiar sede
          </button>
        </div>
      </div>
    </div>
  </footer>
);

// ─── Corporate Site ───────────────────────────────────────────────────────────
const CorporateSite: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => (
  <div className="min-h-screen text-white" style={{ background: '#080808' }}>
    <Navbar onChangeCity={onChangeCity} />
    <Hero onChangeCity={onChangeCity} />
    <Services />
    <HowItWorks />
    <WhyUs />
    <Gallery />
    <Contact />
    <Footer onChangeCity={onChangeCity} />
  </div>
);

export default CorporateSite;
