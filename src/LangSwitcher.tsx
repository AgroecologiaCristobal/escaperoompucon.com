import React from 'react';
import { LANGS, useLang } from './translations';

const LangSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { lang, setLang } = useLang();

  if (compact) {
    return (
      <div className="flex items-center gap-0.5 flex-shrink-0">
        {LANGS.map(({ code, flag, label }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            title={label}
            className={`lang-compact-btn px-1 py-1 rounded flex items-center justify-center ${
              lang === code
                ? 'active bg-[#D4AF37]/10'
                : 'opacity-40 hover:opacity-70'
            }`}
            style={{ lineHeight: 1 }}
          >
            <span style={{ fontSize: '16px', lineHeight: 1 }}>{flag}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {LANGS.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={label}
          className={`lang-pill flex items-center justify-center px-3 py-2 rounded-xl ${
            lang === code ? 'active' : ''
          }`}
          style={
            lang === code
              ? {
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.08))',
                  border: '1px solid rgba(212,175,55,0.35)',
                }
              : {
                  opacity: 0.4,
                  border: '1px solid transparent',
                }
          }
        >
          <span style={{ fontSize: '20px', lineHeight: 1 }}>{flag}</span>
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;
