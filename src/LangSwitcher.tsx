import React from 'react';
import { LANGS, useLang } from './translations';

const LangSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { lang, setLang } = useLang();
  if (compact) {
    return (
      <div className="flex items-center gap-0.5">
        {LANGS.map(({ code, flag, short }) => (
          <button key={code} onClick={() => setLang(code)}
            className={`px-2 py-1 rounded text-[9px] font-black tracking-wider uppercase transition-all duration-200 ${lang === code ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-white/25 hover:text-white/50'}`}>
            <span className="mr-0.5">{flag}</span>{short}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {LANGS.map(({ code, flag, label }) => (
        <button key={code} onClick={() => setLang(code)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-250 ${lang === code ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
          style={lang === code ? { background: 'rgba(212,175,55,0.18)', color: '#D4AF37' } : {}}>
          <span className="text-sm leading-none">{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;
