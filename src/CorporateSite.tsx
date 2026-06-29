import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Phone, Mail, Instagram, Users, ArrowRight,
  CheckCircle, Star, Zap, Shield, Trophy, Heart, Menu, X
} from 'lucide-react';
import { useLang } from './translations';
import LangSwitcher from './LangSwitcher';

const C = '#60A5FA';           // corporate neon blue
const C_DIM = 'rgba(96,165,250,0.10)';
const C_GLOW = 'rgba(96,165,250,0.35)';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

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
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollTo(href.slice(1));
    }
  };
  return (
    <a href={href} onClick={handleClick}
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${className}`}
      style={outline
        ? { border: `1.5px solid ${C}`, color: C, background: 'transparent', boxShadow: `0 0 12px ${C_GLOW}` }
        : { background: C, color: '#000', boxShadow: `0 0 20px ${C_GLOW}, 0 0 40px rgba(96,165,250,0.12)` }}>
      {children}
    </a>
  );
};

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
  const { t } = useLang();
  const cn = t.corporate.nav;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    { label: cn.services, href: '#servicios' },
    { label: cn.howItWorks, href: '#como-funciona' },
    { label: cn.gallery, href: '#galeria' },
    { label: cn.contact, href: '#contacto' },
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
              onClick={(e) => { e.preventDefault(); scrollTo(href.slice(1)); }}
              className="text-white/50 text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
              onMouseEnter={e => { (e.target as HTMLElement).style.color = C; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = ''; }}>
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher compact />
          <button onClick={onChangeCity}
            className="text-white/25 hover:text-white/60 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 flex items-center gap-1.5">
            <MapPin size={11} /> {cn.changeCity}
          </button>
          <a href="#contacto"
            onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }}
            className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{ background: C, color: '#000', boxShadow: `0 0 18px ${C_GLOW}` }}>
            {cn.quote}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LangSwitcher compact />
          <button onClick={onChangeCity}
            className="text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 transition-colors duration-300"
            style={{ color: 'rgba(96,165,250,0.45)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(96,165,250,0.45)'; }}>
            <MapPin size={11} />
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
            <a key={href} href={href}
              onClick={(e) => { e.preventDefault(); setOpen(false); scrollTo(href.slice(1)); }}
              className="block text-white/60 font-semibold text-sm uppercase tracking-widest hover:text-white transition-colors duration-300">
              {label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/8 flex gap-3">
            <a href="#contacto"
              onClick={(e) => { e.preventDefault(); setOpen(false); scrollTo('contacto'); }}
              className="flex-1 text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider"
              style={{ background: C, color: '#000' }}>
              {cn.quote}
            </a>
            <button onClick={() => { setOpen(false); onChangeCity(); }}
              className="flex-1 text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider border"
              style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}>
              {cn.changeCity}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => {
  const { t } = useLang();
  const h = t.corporate.hero;
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 200); }, []);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img src="/foto_coorporativa_escaperoom.jpeg" alt="Team corporativo"
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
              <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: C }}>{h.label}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-4 tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              {h.title1}
              <br />
              <span style={{ color: C, textShadow: `0 0 30px ${C_GLOW}, 0 0 60px rgba(96,165,250,0.15)` }}>{h.title2}</span>
            </h1>
          </div>

          <p className={`text-white/60 text-xl md:text-2xl mb-9 max-w-2xl leading-relaxed transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '450ms' }}>
            {h.subtitle} <span className="text-white/85">{h.subtitleHighlight}</span>.
          </p>

          <div className={`flex flex-wrap gap-3 mb-14 transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '700ms' }}>
            <BlueBtn href="#contacto">
              {h.cta} <ArrowRight size={15} />
            </BlueBtn>
            <BlueBtn href="#servicios" outline>
              {h.ctaSecondary}
            </BlueBtn>
          </div>

          <div className={`flex flex-wrap gap-8 pt-7 border-t transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '950ms', borderColor: 'rgba(96,165,250,0.12)' }}>
            {[
              { num: h.stat2, label: h.stat2Label },
              { num: h.stat3, label: h.stat3Label },
              { num: 'Pucón & Temuco', label: h.stat1Label },
            ].map(({ num, label }) => (
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
  const { t } = useLang();
  const sv = t.corporate.services;
  const [ref, vis] = useInView();
  const icons = [<Users size={24} />, <Trophy size={24} />, <Zap size={24} />, <Heart size={24} />];
  const featuresByLang: string[][] = t.corporate.services.items.map((item, i) => {
    const fallback = [
      ['Grupos de 6 a 50+ personas', 'Modalidad competitiva o colaborativa', 'Informe de desempeño del equipo'],
      ['Personalización con la identidad de tu marca', 'Coordinación integral del evento', 'Espacio exclusivo para grupos'],
      ['Gift cards disponibles', 'Certificados de participación', 'Flexibilidad de fechas y horarios'],
      ['Promueve el pensamiento lateral', 'Reduce el estrés de forma lúdica', 'Ideal para toda edad y condición física'],
    ];
    return fallback[i] ?? [];
  });

  return (
    <section ref={ref} id="servicios" className="py-28" style={{ background: '#0a0a0f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label={sv.label} title={<>{sv.title.split(' ').slice(0, -1).join(' ')} <span style={{ color: C }}>{sv.title.split(' ').slice(-1)[0]}</span></>} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {sv.items.map(({ title, desc }, i) => (
            <div key={title}
              className={`group relative p-8 rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-1 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 120}ms`, background: '#0f0f18', borderColor: 'rgba(96,165,250,0.08)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px rgba(96,165,250,0.05)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.08)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: C_DIM, color: C, border: `1px solid rgba(96,165,250,0.2)` }}>
                {icons[i]}
              </div>
              <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">{desc}</p>
              <div className="space-y-2">
                {featuresByLang[i].map(f => (
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
  const { t } = useLang();
  const hw = t.corporate.howItWorks;
  const [ref, vis] = useInView();

  return (
    <section ref={ref} id="como-funciona" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label={hw.label} title={<>¿Cómo <span style={{ color: C }}>{hw.title.split(' ').slice(1).join(' ') || 'Funciona?'}</span></>} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {hw.steps.map(({ title, desc }, i) => (
            <div key={title}
              className={`group relative p-7 rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-2 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 120}ms`, background: '#0f0f18', borderColor: 'rgba(96,165,250,0.07)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.07)'; }}>
              <div className="text-6xl font-black leading-none mb-5 select-none"
                style={{ color: 'rgba(96,165,250,0.07)', fontFamily: "'Cinzel', serif" }}>
                {String(i + 1).padStart(2, '0')}
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
  const { t } = useLang();
  const w = t.corporate.whyUs;
  const [ref, vis] = useInView();
  const icons = [<Shield size={20} />, <Users size={20} />, <Star size={20} />, <Trophy size={20} />, <Zap size={20} />, <Heart size={20} />];

  return (
    <section ref={ref} className="py-28" style={{ background: '#0a0a0f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label={w.label} title={<>¿Por Qué <span style={{ color: C }}>{w.title.split(' ').slice(-1)[0]}?</span></>} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {w.items.map(({ title, desc }, i) => (
            <div key={title}
              className={`flex gap-4 p-6 rounded-2xl border transition-all duration-700 ease-out hover:-translate-y-1 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 80}ms`, background: '#0f0f18', borderColor: 'rgba(96,165,250,0.07)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(96,165,250,0.07)'; }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: C_DIM, color: C, border: `1px solid rgba(96,165,250,0.18)` }}>
                {icons[i]}
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">{title}</p>
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
  const { t } = useLang();
  const g = t.corporate.gallery;
  const [ref, vis] = useInView();
  const imgs = [
    { src: '/ganyateam.jpeg', alt: 'Corporate team' },
    { src: '/jabaliesytablas.jpeg', alt: 'Team building' },
    { src: '/familiazoologico.jpeg', alt: 'Group adventure' },
    { src: '/clubdechecho.jpeg', alt: 'Corporate club' },
    { src: '/lasindomitas.jpeg', alt: 'Team experience' },
    { src: '/lospifiados.jpeg', alt: 'Group in action' },
  ];

  return (
    <section ref={ref} id="galeria" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label={g.label} title={<>{g.title.split(' ').slice(0, -1).join(' ')} <span style={{ color: C }}>{g.title.split(' ').slice(-1)[0]}</span></>} />
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
  const { t } = useLang();
  const c = t.corporate.contact;
  const [ref, vis] = useInView();
  return (
    <section ref={ref} id="contacto" className="py-28" style={{ background: '#0a0a0f' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className={`transition-all duration-1000 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SecHeader label={c.label} title={<>{c.title.split(' ').slice(0, -1).join(' ')} <span style={{ color: C }}>{c.title.split(' ').slice(-1)[0]}</span></>} />
        </div>

        <div className={`relative p-8 md:p-12 rounded-2xl text-center mb-10 transition-all duration-1000 ease-out delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ background: '#0f0f18', border: `1px solid rgba(96,165,250,0.15)`, boxShadow: `0 0 60px rgba(96,165,250,0.05)` }}>
          <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${C}, transparent)`, opacity: 0.5 }} />
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">{c.title}</p>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            {c.subtitle.split(' ').slice(0, 6).join(' ')} <span style={{ color: C }}>{c.subtitle.split(' ').slice(6).join(' ')}</span>
          </h3>
          <p className="text-white/40 text-sm mb-7 max-w-md mx-auto leading-relaxed">
            {c.messagePlaceholder}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <BlueBtn href="https://wa.me/56961898877?text=Hola%2C%20me%20interesa%20cotizar%20un%20evento%20corporativo%20de%20escape%20room.">
              {c.whatsappBtn} <ArrowRight size={14} />
            </BlueBtn>
            <BlueBtn href="mailto:escaperoomaraucania@gmail.com" outline>
              {c.sendBtn}
            </BlueBtn>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-4 transition-all duration-1000 ease-out delay-400 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { icon: <Phone size={18} />, label: c.whatsappBtn, value: '+56 9 6189 8877', href: 'https://wa.me/56961898877' },
            { icon: <Mail size={18} />, label: 'Email', value: 'escaperoomaraucania@gmail.com', href: 'mailto:escaperoomaraucania@gmail.com' },
            { icon: <MapPin size={18} />, label: t.shared.contact, value: 'Pucón & Temuco', href: null },
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
const Footer: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => {
  const { t } = useLang();
  const f = t.corporate.footer;
  return (
  <footer className="py-10 border-t" style={{ background: '#060609', borderColor: 'rgba(96,165,250,0.07)' }}>
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C, boxShadow: `0 0 10px ${C_GLOW}` }}>
            <Shield size={13} className="text-black" />
          </div>
          <div>
            <p className="text-white/70 font-semibold text-xs">Escape Room Corporativo — Araucanía</p>
            <p className="text-white/22 text-[10px]">{f.tagline}</p>
          </div>
        </div>
        <p className="text-white/18 text-xs">© 2026 Escape Room Araucanía. {f.rights}</p>
        <div className="flex items-center gap-5">
          <LangSwitcher compact />
          <a href="https://www.instagram.com/Escaperoom_araucania/" className="text-white/22 hover:text-white/50 transition-colors duration-300">
            <Instagram size={16} />
          </a>
          <button onClick={onChangeCity} className="text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 underline underline-offset-2"
            style={{ color: 'rgba(96,165,250,0.35)' }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = C; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(96,165,250,0.35)'; }}>
            {t.shared.changeCity}
          </button>
        </div>
      </div>
    </div>
  </footer>
  );
};

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
