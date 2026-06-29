import React from 'react';
import { LANGS, useLang } from './translations';

const LangSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { lang, setLang } = useLang();

  if (compact) {
    return (
      <div className="flex items-center gap-0.5 flex-shrink-0 p-0.5 rounded-lg"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
        {LANGS.map(({ code, flag, short }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`lang-compact-btn flex items-center gap-1 rounded-md px-1.5 py-1 transition-all duration-200 ${lang === code ? 'active' : ''}`}
            style={{
              color: lang === code ? '#D4AF37' : 'rgba(255,255,255,0.45)',
              background: lang === code ? 'rgba(212,175,55,0.12)' : 'transparent',
            }}
          >
            <span style={{ fontSize: '13px', lineHeight: 1 }}>{flag}</span>
            <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1 }}>{short}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 p-1.5 rounded-2xl"
      style={{
        background: 'rgba(0,0,0,0.55)',
        border: '1px solid rgba(212,175,55,0.25)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)',
      }}
    >
      {LANGS.map(({ code, flag, label, short }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={label}
          className={`lang-pill flex flex-col items-center justify-center px-4 py-2.5 rounded-xl transition-all duration-300 ${lang === code ? 'active' : ''}`}
          style={
            lang === code
              ? {
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  boxShadow: '0 0 14px rgba(212,175,55,0.2)',
                }
              : {
                  border: '1px solid transparent',
                  opacity: 0.5,
                }
          }
        >
          <span style={{ fontSize: '24px', lineHeight: 1 }}>{flag}</span>
          <span style={{
            fontSize: '9px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            marginTop: '3px',
            lineHeight: 1,
            color: lang === code ? '#D4AF37' : 'rgba(255,255,255,0.6)',
          }}>{short}</span>
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;
