import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Users, Star, ChevronDown, ChevronUp, MessageCircle, Navigation, TowerControl as GameController, Trophy, MapPinned, ArrowRight, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';
import TemucoPuconSite from './TemucoPuconSite';
import CorporateSite from './CorporateSite';
import translations, { LangContext, Lang, useLang } from './translations';
import LangSwitcher from './LangSwitcher';

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

const CitySelector: React.FC<{ onSelect: (city: Dest) => void }> = ({ onSelect }) => {
  const { t } = useLang();
  const [hovered, setHovered] = useState<Dest | null>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 540 : false
  );
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    const mq = window.matchMedia('(max-width: 539px)');
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', fn);
    return () => { clearTimeout(timer); mq.removeEventListener('change', fn); };
  }, []);

  const handleTouchStart = (id: Dest) => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    setHovered(id);
    touchTimerRef.current = setTimeout(() => {
      onSelect(id);
    }, 420);
  };

  const panels = [
    {
      id: 'temuco' as const,
      image: '/foto_temuco_escaperoom.jpeg',
      accent: '#00FF88',
      glow: 'rgba(0,255,136,0.4)',
      tint: 'rgba(0,255,136,0.08)',
      label: t.selector.panels.temuco.label,
      titleEl: <span className="font-black text-white">{t.selector.panels.temuco.title}</span>,
      desc: t.selector.panels.temuco.desc,
      btnText: t.selector.panels.temuco.btn,
    },
    {
      id: 'pucon' as const,
      image: '/familiazoologico.jpeg',
      accent: '#D4AF37',
      glow: 'rgba(212,175,55,0.4)',
      tint: 'rgba(212,175,55,0.08)',
      label: t.selector.panels.pucon.label,
      titleEl: (
        <>
          <span className="misterios-text block leading-tight" style={{ fontSize: 'inherit' }}>{t.selector.panels.pucon.titleLine1}</span>
          <span className="casona-text block leading-tight" style={{ fontSize: '0.78em' }}>{t.selector.panels.pucon.titleLine2}</span>
        </>
      ),
      desc: t.selector.panels.pucon.desc,
      btnText: t.selector.panels.pucon.btn,
    },
    {
      id: 'corporativo' as const,
      image: '/foto_coorporativa_escaperoom.jpeg',
      accent: '#60A5FA',
      glow: 'rgba(96,165,250,0.4)',
      tint: 'rgba(96,165,250,0.08)',
      label: t.selector.panels.corporativo.label,
      titleEl: <span className="font-black text-white">{t.selector.panels.corporativo.title}</span>,
      desc: t.selector.panels.corporativo.desc,
      btnText: t.selector.panels.corporativo.btn,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50">

      {/* ── Brand header overlay (desktop only) ── */}
      <div className="hidden md:block absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div className="flex flex-col items-center pt-7 px-4"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)', paddingBottom: '3rem' }}>
          <div className={`text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <p className="text-[#D4AF37] text-[9px] font-black tracking-[0.55em] uppercase mb-3">{t.selector.brand}</p>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug">
              {t.selector.heading}
            </h1>
            {/* Logo with glow */}
            <div className={`flex justify-center mb-2 pointer-events-none transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: '300ms' }}>
              <img src="/logoescaperoom.jpg" alt="Escape Room Araucanía"
                className="h-20 w-auto rounded-2xl"
                style={{ animation: 'logoGlow 3s ease-in-out infinite' }} />
            </div>
            <p className="text-white/35 text-xs max-w-sm mx-auto">
              {t.selector.sub}
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: 3 panels horizontal ── */}
      {!isMobile && (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
          {panels.map((p, idx) => {
            const isHov = hovered === p.id;
            const otherHov = hovered !== null && !isHov;
            return (
              <React.Fragment key={p.id}>
                {idx > 0 && (
                  <div className="relative flex-none w-px z-20 pointer-events-none"
                    style={{ background: `linear-gradient(to bottom, transparent 0%, ${panels[idx-1].accent}44 35%, ${p.accent}44 65%, transparent 100%)` }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center bg-black"
                      style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: hovered === panels[idx-1].id ? panels[idx-1].accent : hovered === p.id ? p.accent : '#555' }} />
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
                  onTouchStart={() => handleTouchStart(p.id)}
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
          <div className={`flex-none z-20 px-3 py-2.5 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
            style={{ background: 'rgba(0,0,0,0.90)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[#D4AF37] text-[8px] font-black tracking-[0.4em] uppercase mb-0.5 text-center">{t.selector.brand}</p>
            <p className="text-white font-bold text-xs leading-tight mb-2 text-center">{t.selector.heading}</p>
            <div className="flex items-center justify-center gap-3">
              <img src="/logoescaperoom.jpg" alt="Escape Room Araucanía"
                className="h-12 w-auto rounded-xl"
                style={{ animation: 'logoGlow 3s ease-in-out infinite' }} />
              <LangSwitcher compact />
            </div>
          </div>
          {panels.map((p, idx) => (
            <div key={p.id}
              className="relative flex-1 cursor-pointer overflow-hidden"
              onTouchStart={() => handleTouchStart(p.id)}
              onClick={() => onSelect(p.id)}>
              <img src={p.image} alt={p.id}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.30)' }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${p.tint}, transparent 55%)` }} />
              <div className={`absolute inset-0 flex items-end px-4 pb-4 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${200 + idx * 120}ms` }}>
                <div className="flex items-end justify-between w-full">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-px w-4 flex-shrink-0" style={{ background: p.accent }} />
                      <span className="text-[8px] font-black tracking-[0.25em] uppercase truncate" style={{ color: p.accent }}>{p.label}</span>
                    </div>
                    <div className="text-xl leading-none mb-1" style={{ textShadow: `0 0 20px ${p.glow}` }}>
                      {p.titleEl}
                    </div>
                    <p className="text-white/40 text-[10px] leading-snug max-w-[190px] mt-0.5 line-clamp-2">{p.desc}</p>
                  </div>
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ml-2"
                    style={{ background: p.accent, boxShadow: `0 0 16px ${p.glow}` }}>
                    <ArrowRight size={14} className="text-black" />
                  </div>
                </div>
              </div>
              {idx > 0 && (
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${panels[idx-1].accent}50, ${p.accent}50, transparent)` }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Bottom: hint + language switcher (desktop only) ── */}
      <div className={`hidden md:flex absolute bottom-5 left-0 right-0 z-30 flex-col items-center gap-3 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '900ms' }}>
        <LangSwitcher />
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="w-8 h-px bg-white/10" />
          <span className="text-white/18 text-[8px] tracking-[0.35em] uppercase">{t.selector.hint}</span>
          <div className="w-8 h-px bg-white/10" />
        </div>
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection: React.FC<{ onChangeCity: () => void }> = ({ onChangeCity }) => {
  const { t } = useLang();
  const h = t.pucon.hero;
  const [isTextVisible, setIsTextVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsTextVisible(true), 300);
    return () => clearTimeout(timer);
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

      <div className="absolute top-6 right-6 z-20">
        <img src="/logoescaperoom.jpg" alt="Los Misterios de la Casona"
          className="h-20 w-auto rounded-xl hover:scale-105 transition-transform duration-300"
          style={{ boxShadow: '0 0 30px rgba(0,0,0,0.6), 0 0 15px rgba(212,175,55,0.1)' }} />
      </div>
      <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
        <button onClick={onChangeCity}
          className="flex items-center gap-2 text-white/30 hover:text-[#D4AF37] transition-all duration-300 text-[10px] font-bold tracking-[0.25em] uppercase">
          <MapPin size={13} /> {t.shared.changeCity}
        </button>
        <LangSwitcher compact />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-20">
        <div className="max-w-4xl">
          <div className={`transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.35em] uppercase">{h.label}</span>
            </div>
            <h1 className="leading-none mb-1">
              <span className="misterios-text block text-5xl md:text-7xl lg:text-8xl">{h.titleLine1}</span>
            </h1>
            <h1 className="leading-none mb-7">
              <span className="casona-text block text-4xl md:text-6xl lg:text-7xl">{h.titleLine2}</span>
            </h1>
          </div>

          <p className={`text-white/65 text-lg md:text-xl max-w-xl mb-9 leading-relaxed transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '500ms' }}>
            {h.subtitle} <span className="text-white font-semibold">{h.subtitleHighlight}</span>.
          </p>

          <div className={`flex flex-wrap gap-3 mb-12 transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '750ms' }}>
            <a href="https://wa.me/56961898877?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
              className="group flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 rounded-xl text-sm font-bold hover:bg-white transition-all duration-300"
              style={{ boxShadow: '0 0 30px rgba(212,175,55,0.35)' }}>
              {h.cta}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a href="#rooms"
              onClick={(e) => { e.preventDefault(); document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-3 border border-white/20 text-white/80 px-8 py-4 rounded-xl text-sm font-semibold hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all duration-300">
              {h.ctaSecondary}
            </a>
          </div>

          <div className={`flex gap-10 pt-6 border-t border-white/8 transition-all duration-1000 ease-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '1000ms' }}>
            {[['60', h.stat1], ['2-8', h.stat2], ['2', h.stat3]].map(([num, label]) => (
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
  const { t } = useLang();
  const a = t.pucon.about;
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <SectionLabel text={a.label} />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              {a.title1} <span className="text-[#D4AF37]">{a.title2}</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-5">{a.desc1}</p>
            <p className="text-white/55 text-base leading-relaxed mb-8">{a.desc2}</p>
            <div className="space-y-3 mb-9">
              {[a.item2Title, a.item3Title].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-[#D4AF37] flex-shrink-0" size={16} />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <a href="https://wa.me/56961898877?text=Hola%2C%20quiero%20reservar%20mi%20pr%C3%B3xima%20aventura."
              className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
              {t.pucon.contact.reserveBtn} <ArrowRight size={15} />
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
  difficultyLabel: string; playersLabel: string; reserveLabel: string; comingSoon?: boolean; comingSoonLabel?: string;
}> = ({ title, description, difficulty, players, image, alt, delay, cardType, difficultyLabel, playersLabel, reserveLabel, comingSoon, comingSoonLabel }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const accent = cardType === 'pirate' ? '#D4AF37' : '#8B0000';

  return (
    <div ref={ref}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms`, background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        <img src={image} alt={alt}
          className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-110"
          style={{ filter: comingSoon ? 'brightness(0.3) grayscale(0.5)' : undefined }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
            style={{ background: accent, color: cardType === 'pirate' ? '#000' : '#fff' }}>
            {difficultyLabel}: {difficulty}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Users size={11} className="text-white/60" />
          <span className="text-white/60 text-xs font-medium">{players} {playersLabel}</span>
        </div>
        {comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/70 text-white/50 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border border-white/10">
              {comingSoonLabel}
            </span>
          </div>
        )}
      </div>
      <div className="p-7">
        <div className="w-6 h-0.5 mb-4" style={{ background: accent }} />
        <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
        <p className="text-white/45 leading-relaxed text-sm mb-6">{description}</p>
        {comingSoon ? (
          <span className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest text-white/25 cursor-not-allowed">
            {comingSoonLabel}
          </span>
        ) : (
          <a href="https://wa.me/56961898877?text=Hola%2C%20me%20interesa%20reservar%20una%20sala."
            className="group/btn inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:gap-3"
            style={{ color: accent }}>
            {reserveLabel}
            <ChevronRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  );
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
const RoomsSection: React.FC = () => {
  const { t } = useLang();
  const r = t.pucon.rooms;
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} id="rooms" className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text={r.label} />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {r.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-7">
          <RoomCard title="Elixir Zombie"
            description="Una aventura post-apocalíptica donde deben encontrar la cura para un virus zombie. Investiga el laboratorio y colabora bajo presión antes de que los zombies regresen."
            difficulty="8/10" players="2-8" image="/elixir_zombie.png" alt="Sala El Elixir Zombie" delay={200} cardType="zombie"
            difficultyLabel={r.difficulty} playersLabel={r.players} reserveLabel={r.reserve} />
          <RoomCard title="Refugio 42"
            description="Un refugio secreto esconde oscuros secretos. Descifra los códigos, sigue las pistas y logra escapar antes de que sea demasiado tarde."
            difficulty="7/10" players="2-8" image="/refugio_42.png" alt="Sala Refugio 42" delay={400} cardType="pirate"
            difficultyLabel={r.difficulty} playersLabel={r.players} reserveLabel={r.reserve} />
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────
const HowItWorksSection: React.FC = () => {
  const { t } = useLang();
  const h = t.pucon.howItWorks;
  const [ref, isVisible] = useIntersectionObserver();
  const icons = [<MessageCircle size={20} />, <Navigation size={20} />, <GameController size={20} />, <Trophy size={20} />];
  const links = [
    'https://wa.me/56961898877',
    'https://maps.google.com/?q=Ramón+Quezada+0470+Pucón+Chile',
    '#rooms',
    '#testimonials',
  ];
  return (
    <section ref={ref} className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text={h.label} />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {h.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {h.steps.map((step, i) => (
            <a key={step.title} href={links[i]}
              onClick={(e) => { if (links[i].startsWith('#')) { e.preventDefault(); document.getElementById(links[i].slice(1))?.scrollIntoView({ behavior: 'smooth' }); } }}
              className={`group relative p-7 rounded-2xl border transition-all duration-700 ease-out hover:border-[#D4AF37]/40 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 130}ms`, background: '#0f0f0f', borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="absolute top-5 right-5 text-[10px] font-black tracking-[0.15em] uppercase text-[#D4AF37]/20 group-hover:text-[#D4AF37]/50 transition-all duration-400">
                0{i + 1}
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-black transition-all duration-300 group-hover:scale-110"
                style={{ background: '#D4AF37' }}>
                {icons[i]}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
              {i === 0 && <p className="text-[#D4AF37] text-xs font-bold mt-3">+56 9 6189 8877</p>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Pricing (Pucón) ──────────────────────────────────────────────────────────
const PuconPricingSection: React.FC = () => {
  const { t } = useLang();
  const [ref, isVisible] = useIntersectionObserver();
  const lang = t === translations.en ? 'en' : t === translations.pt ? 'pt' : 'es';

  const slots = lang === 'en' ? [
    { time: '10:00 – 12:00', label: 'Escape Coffee', price: '$12.000', note: 'per person' },
    { time: '12:00 – 17:00', label: 'Afternoon', price: '$10.000', note: 'per person' },
    { time: '18:00 – 21:00', label: 'Evening', price: '$12.000', note: 'per person' },
    { time: '22:00 – 00:00', label: 'Night', price: '$15.000', note: 'per person', highlight: true },
  ] : lang === 'pt' ? [
    { time: '10:00 – 12:00', label: 'Escape Coffee', price: '$12.000', note: 'por pessoa' },
    { time: '12:00 – 17:00', label: 'Tarde', price: '$10.000', note: 'por pessoa' },
    { time: '18:00 – 21:00', label: 'Noite', price: '$12.000', note: 'por pessoa' },
    { time: '22:00 – 00:00', label: 'Madrugada', price: '$15.000', note: 'por pessoa', highlight: true },
  ] : [
    { time: '10:00 – 12:00', label: 'Escape Coffee', price: '$12.000', note: 'por persona' },
    { time: '12:00 – 17:00', label: 'Tarde', price: '$10.000', note: 'por persona' },
    { time: '18:00 – 21:00', label: 'Noche', price: '$12.000', note: 'por persona' },
    { time: '22:00 – 00:00', label: 'Noche Oscura', price: '$15.000', note: 'por persona', highlight: true },
  ];

  return (
    <section ref={ref} id="precios" className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text={lang === 'en' ? 'Pricing' : lang === 'pt' ? 'Preços' : 'Precios'} />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {lang === 'en' ? 'Choose your moment' : lang === 'pt' ? 'Escolha seu momento' : 'Elige tu momento'}
          </h2>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {slots.map((slot, i) => (
            <div key={i} className="relative p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                background: slot.highlight ? 'linear-gradient(135deg, #1a0000, #2d0000)' : '#0f0f0f',
                border: `1px solid ${slot.highlight ? 'rgba(139,0,0,0.5)' : 'rgba(212,175,55,0.12)'}`,
                boxShadow: slot.highlight ? '0 0 30px rgba(139,0,0,0.2)' : 'none',
              }}>
              {slot.highlight && (
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #8B0000, transparent)' }} />
              )}
              <p className="text-[#D4AF37] text-[9px] font-black tracking-[0.3em] uppercase mb-1">{slot.time}</p>
              <p className="text-white/60 text-xs mb-3 font-medium">{slot.label}</p>
              <div className="text-3xl font-black text-white mb-1" style={{ color: slot.highlight ? '#ff4444' : '#D4AF37' }}>
                {slot.price}
              </div>
              <p className="text-white/30 text-[10px] uppercase tracking-wider">{slot.note}</p>
            </div>
          ))}
        </div>

        {/* Escape Party callout */}
        <div className={`relative p-8 rounded-2xl overflow-hidden transition-all duration-1000 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ background: 'linear-gradient(100deg, #0a0a0a, #180000 40%, #8B0000 60%, #180000 80%, #0a0a0a)', border: '1px solid rgba(212,175,55,0.2)' }}>
          <div className="absolute top-0 w-full h-px left-0" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 50%, transparent)' }} />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase mb-2">
                {lang === 'en' ? 'Special Package' : lang === 'pt' ? 'Pacote Especial' : 'Paquete Especial'}
              </p>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Escape Party</h3>
              <p className="text-white/50 text-sm max-w-md">
                {lang === 'en'
                  ? 'Celebrate your birthday or special occasion with a private session + decorations + photos. Ask for your personalized quote.'
                  : lang === 'pt'
                  ? 'Celebre seu aniversário ou ocasião especial com sessão privada + decoração + fotos. Solicite seu orçamento personalizado.'
                  : 'Celebra tu cumpleaños u ocasión especial con sesión privada + decoración + fotos. Consulta tu cotización personalizada.'}
              </p>
            </div>
            <a href="https://wa.me/56961898877?text=Hola%2C%20me%20interesa%20el%20paquete%20Escape%20Party."
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#D4AF37] text-black px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 24px rgba(212,175,55,0.3)' }}>
              {lang === 'en' ? 'Request a quote' : lang === 'pt' ? 'Solicitar orçamento' : 'Consultar precio'} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TestimonialsSection: React.FC = () => {
  const { t } = useLang();
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
          <SectionLabel text={t.pucon.testimonials.label} />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {t.pucon.testimonials.title}
          </h2>
        </div>
      </div>
      <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className="absolute left-0 top-0 w-24 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #080808, transparent)' }} />
        <div className="absolute right-0 top-0 w-24 h-full z-10 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #080808, transparent)' }} />
        <div className="flex gap-5" style={{ width: `${doubled.length * 340}px`, animation: isPaused ? 'none' : 'scroll 38s linear infinite' }}>
          {doubled.map((item, i) => (
            <div key={i} className="min-w-[310px] p-6 rounded-2xl flex flex-col gap-4"
              style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => <Star key={s} size={11} fill="#D4AF37" className="text-[#D4AF37]" />)}
              </div>
              <p className="text-white/55 text-sm leading-relaxed flex-1">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                <img src={item.image} alt={item.author} className="w-9 h-9 rounded-full object-cover object-top border border-[#D4AF37]/30" />
                <span className="text-[#D4AF37] font-semibold text-xs">{item.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`text-center mt-10 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <a href="https://www.google.com/search?q=escape+room+pucon+los+misterios+de+la+casona#lrd=0x0:0x0,1"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#D4AF37]/40 text-[#D4AF37] px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#D4AF37]/10 transition-all duration-300">
          Ver reseñas en Google <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQSection: React.FC = () => {
  const { t, lang } = useLang();
  const [ref, isVisible] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const esFaqs = [
    { q: '¿Qué es un Escape Room?', a: 'Es una experiencia de juego en vivo donde tú y tu equipo son "encerrados" temáticamente en una sala y tienen 60 minutos para resolver acertijos, encontrar pistas y completar una misión para "escapar" antes de que se acabe el tiempo.' },
    { q: '¿Estamos realmente encerrados?', a: '¡No! Por seguridad, nunca estás realmente encerrado. Siempre habrá una salida de emergencia accesible. Nuestro Game Master te explicará cómo funciona antes de empezar.' },
    { q: '¿Necesitamos alguna habilidad especial?', a: '¡Absolutamente no! Nuestros juegos están diseñados para poner a prueba tu lógica, observación, creatividad y trabajo en equipo. No necesitas fuerza física ni conocimientos previos.' },
    { q: '¿Qué pasa si no logramos escapar a tiempo?', a: 'No te preocupes. El Game Master entrará para explicarte las soluciones de los puzzles restantes y celebrar tu esfuerzo. Lo importante es la diversión.' },
    { q: '¿Se puede jugar con movilidad reducida?', a: 'Sí, nuestras salas están diseñadas para ser accesibles en general. Te recomendamos contactarnos por WhatsApp antes de reservar para confirmar la adaptabilidad.' },
    { q: '¿Cuántas personas pueden jugar?', a: 'Nuestras salas están diseñadas para grupos de 2 hasta 8 personas. Para grupos más grandes recomendamos reservar sesiones consecutivas.' },
    { q: '¿Hay edad mínima para participar?', a: 'Recomendamos el escape room para personas de 12 años en adelante. Los menores de edad deben ir acompañados de un adulto.' },
    { q: '¿Cuál es el precio por persona?', a: 'Los precios varían según el horario: desde $10.000 CLP (tarde) hasta $15.000 CLP (noche). Consulta la sección de Precios para todos los detalles.' },
    { q: '¿Cómo puedo reservar?', a: 'Las reservas se realizan vía WhatsApp al +56 9 6189 8877. Envíanos un mensaje con la fecha, hora y sala que te interesa.' },
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
    { q: '¿Hay escape rooms en Temuco o en la Araucanía?', a: 'Sí, Escape Room Araucanía – Los Misterios de la Casona es el escape room de referencia en la región, con presencia en Pucón (el primero y único por años) y ahora también con sede en Temuco.' },
    { q: '¿Dónde llevar a mi familia de visita en Temuco?', a: 'Si tienes visitas o simplemente quieres un plan diferente con tu familia en Temuco, el escape room es una excelente opción para todas las edades (desde 8 años con adulto). ¡Reserva por WhatsApp!' },
    { q: '¿Qué actividades hay en Pucón cuando llueve?', a: 'Para los días de lluvia en Pucón, Los Misterios de la Casona es la actividad indoor perfecta. Disfruta 60 minutos de adrenalina, misterio y puzzles en equipo sin importar el clima.' },
  ];

  const faqs = lang === 'es' ? esFaqs : t.pucon.faq.items;

  return (
    <section ref={ref} className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text={t.pucon.faq.label} />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {t.pucon.faq.title}
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
  const { t } = useLang();
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
          <SectionLabel text={t.pucon.gallery.label} />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {t.pucon.gallery.title}
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
        <div className={`text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://wa.me/56961898877?text=Hola%2C%20quiero%20reservar%20y%20ser%20parte%20de%20la%20galería."
            className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
            {t.pucon.contact.reserveBtn} <ArrowRight size={15} />
          </a>
          <a href="https://www.google.com/search?q=escape+room+pucon+los+misterios+de+la+casona"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#D4AF37]/40 text-[#D4AF37] px-7 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37]/10 transition-all duration-300">
            Ver galería en Google <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── La Casona ────────────────────────────────────────────────────────────────
const LaCasonaSection: React.FC = () => {
  const { t } = useLang();
  const lc = t.pucon.lacasona;
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
    { title: lc.feature2Title, subtitle: lc.feature2Desc, description: lc.desc1, images: conceptImgs, currentIdx: conceptIdx, setIdx: setConceptIdx, isCarousel: true },
    { title: lc.feature1Title, subtitle: lc.feature1Desc, description: lc.desc2, images: cafeteriaImgs, currentIdx: cafeteriaIdx, setIdx: setCafeteriaIdx, isCarousel: true },
    { title: lc.feature3Title, subtitle: lc.feature3Desc, description: lc.desc1, image: '/ACTIVIDADES1.jpeg', isCarousel: false },
  ];

  return (
    <section ref={ref} className="py-28" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text={lc.label} />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Cinzel', serif" }}>
            {lc.title}
          </h2>
          <p className="text-white/45 text-base max-w-2xl mx-auto leading-relaxed">{lc.desc1}</p>
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
          <a href="https://wa.me/56961898877?text=Hola%2C%20me%20interesa%20conocer%20La%20Casona%20Puc%C3%B3n."
            className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
            {t.pucon.contact.reserveBtn} <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const { t } = useLang();
  const c = t.pucon.contact;
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <section ref={ref} id="contact" className="py-28" style={{ background: '#0c0c0c' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionLabel text={c.label} />
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {c.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-3 mb-8">
              {[
                { icon: <MapPin size={18} />, label: c.location, value: 'Ramón Quezada 0470, Pucón', href: null },
                { icon: <Phone size={18} />, label: c.phone, value: '+56 9 6189 8877', href: 'https://wa.me/56961898877' },
                { icon: <Mail size={18} />, label: c.email, value: 'escaperoomaraucania@gmail.com', href: 'mailto:escaperoomaraucania@gmail.com' },
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
              <p className="text-white/30 text-xs">{c.instagram}</p>
              <a href="https://www.instagram.com/Escaperoom_araucania/"
                className="flex items-center gap-2 text-white/45 hover:text-[#D4AF37] transition-colors duration-300">
                <Instagram size={18} />
                <span className="text-xs font-semibold">@Escaperoom_araucania</span>
              </a>
            </div>
            <a href="https://wa.me/56961898877?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
              className="inline-flex items-center gap-2 bg-[#8B0000] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105">
              {c.whatsappBtn} <ArrowRight size={15} />
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
  );
};

// ─── Cross-site CTA ───────────────────────────────────────────────────────────
const GoTemucoCTA: React.FC<{ onSelect: (city: 'temuco') => void }> = ({ onSelect }) => {
  const { t } = useLang();
  const lang = t === translations.en ? 'en' : t === translations.pt ? 'pt' : 'es';
  return (
    <div className="relative overflow-hidden py-10 px-6"
      style={{ background: 'linear-gradient(100deg, #080808, #0d1f12 40%, #0a2010 60%, #080808)', borderTop: '1px solid rgba(0,255,136,0.1)', borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(0,255,136,0.04), transparent 65%)' }} />
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left relative z-10">
        <div>
          <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-1" style={{ color: '#00FF88' }}>
            {lang === 'en' ? 'New Location' : lang === 'pt' ? 'Nova Sede' : 'Nueva Sede'}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            {lang === 'en' ? 'Now also in ' : lang === 'pt' ? 'Agora também em ' : 'Ahora también en '}
            <span style={{ color: '#00FF88' }}>Temuco</span>
          </h3>
          <p className="text-white/40 text-sm mt-1">
            {lang === 'en' ? 'Same adrenaline, new city — two different escape room experiences'
              : lang === 'pt' ? 'A mesma adrenalina, nova cidade — duas experiências diferentes'
              : 'La misma adrenalina, nueva ciudad — dos experiencias distintas de escape room'}
          </p>
        </div>
        <button onClick={() => onSelect('temuco')}
          className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
          style={{ background: '#00FF88', color: '#000', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
          {lang === 'en' ? 'Go to Temuco' : lang === 'pt' ? 'Ir a Temuco' : 'Ir a la sede Temuco'} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

// ─── Pucón Footer ─────────────────────────────────────────────────────────────
const SiteFooter: React.FC<{ onChangeCity: () => void; city: string }> = ({ onChangeCity }) => {
  const { t } = useLang();
  return (
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
          <p className="text-white/20 text-xs">© 2026 Los Misterios de la Casona. {t.pucon.footer.rights}</p>
          <div className="flex items-center gap-4">
            <LangSwitcher compact />
            <button onClick={onChangeCity} className="text-[#D4AF37]/30 hover:text-[#D4AF37] text-[10px] transition-colors duration-300 underline underline-offset-2">
              {t.shared.changeCity}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── Pucón Site ───────────────────────────────────────────────────────────────
const PuconSite: React.FC<{ onChangeCity: () => void; onSelectCity: (city: 'temuco') => void }> = ({ onChangeCity, onSelectCity }) => (
  <div className="min-h-screen bg-[#080808] text-white">
    <HeroSection onChangeCity={onChangeCity} />
    <AboutSection />
    <RoomsSection />
    <PuconPricingSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <FAQSection />
    <GallerySection />
    <LaCasonaSection />
    <ContactSection />
    <GoTemucoCTA onSelect={onSelectCity} />
    <SiteFooter onChangeCity={onChangeCity} city="pucon" />
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [city, setCity] = useState<null | 'pucon' | 'temuco' | 'corporativo'>(null);
  const [lang, setLang] = useState<Lang>('es');
  const t = translations[lang];

  // Browser back-button: restore city from history state, or show selector
  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      const c = e.state?.city as typeof city | undefined;
      setCity(c === 'pucon' || c === 'temuco' || c === 'corporativo' ? c : null);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Keyboard back: Escape returns to selector (Backspace excluded to avoid nav conflicts)
  useEffect(() => {
    if (!city) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      goBack();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [city]);

  const selectCity = (c: typeof city) => {
    if (c) window.history.pushState({ city: c }, '', `#${c}`);
    setCity(c);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      {city === null && <CitySelector onSelect={selectCity} />}
      {city === 'temuco' && <TemucoPuconSite onChangeCity={goBack} />}
      {city === 'corporativo' && <CorporateSite onChangeCity={goBack} />}
      {city === 'pucon' && <PuconSite onChangeCity={goBack} onSelectCity={(c) => selectCity(c)} />}
    </LangContext.Provider>
  );
}

export default App;
