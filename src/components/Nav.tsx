import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV, type PageKey } from '../data';
import logo from '../assets/anisha-logo.png';

type Props = {
  page: PageKey;
  onNavigate: (p: PageKey) => void;
};

export function Nav({ page, onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const activeLabel = NAV.find((n) => n.key === page)?.label ?? 'Menu';

  const handleNavigate = (key: PageKey) => {
    onNavigate(key);
    setOpen(false);
  };

  return (
    <div className="nav">
      <div className="nav__inner">
        <button
          type="button"
          className="nav__brand"
          onClick={() => handleNavigate('home')}
          aria-label="anisha.dev — home"
        >
          <img src={logo} alt="" />
          <span className="nav__brand-text">
            anisha<span className="nav__brand-dot">.</span>dev
          </span>
        </button>

        <nav className="nav__links nav__links--desktop" aria-label="Primary">
          {NAV.map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`nav__link${page === item.key ? ' is-active' : ''}`}
              aria-current={page === item.key ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className="nav__toggle-label">{activeLabel}</span>
          <span
            className={`nav__toggle-icon${open ? ' is-open' : ''}`}
            aria-hidden
          >
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="nav-mobile-menu"
            className="nav__mobile"
            aria-label="Mobile primary"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV.map((item) => (
              <button
                type="button"
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={`nav__mobile-link${
                  page === item.key ? ' is-active' : ''
                }`}
                aria-current={page === item.key ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
