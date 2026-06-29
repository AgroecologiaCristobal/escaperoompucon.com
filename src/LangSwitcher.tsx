import React from 'react';
import { LANGS, useLang } from './translations';

const LangSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { lang, setLang } = useLang();

  if (compact) {
    return (
      <div className="flex items-center gap-0.5 flex-shrink-0 p-0.5 rounded-lg"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {LANGS.map(({ code, flag, label }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            title={label}
            className="flex items-center justify-center rounded-md transition-all duration-200"
            style={{
              padding: '3px 5px',
              background: lang === code ? 'rgba(212,175,55,0.2)' : 'transparent',
              border: lang === code ? '1px solid rgba(212,175,55,0.4)' : '1px solid transparent',
              opacity: lang === code ? 1 : 0.5,
            }}
          >
            <span style={{ fontSize: '14px', lineHeight: 1 }}>{flag}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 p-1.5 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.09)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {LANGS.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={label}
          className="lang-pill flex items-center justify-center px-4 py-2.5 rounded-xl transition-all duration-200"
          style={
            lang === code
              ? {
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1))',
                  border: '1px solid rgba(212,175,55,0.45)',
                  boxShadow: '0 0 12px rgba(212,175,55,0.15)',
                }
              : {
                  opacity: 0.45,
                  border: '1px solid transparent',
                }
          }
        >
          <span style={{ fontSize: '22px', lineHeight: 1 }}>{flag}</span>
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;
