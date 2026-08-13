import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../css style/css.css';

const navItems = [
  { id: 'home', key: 'home' },
  { id: 'skills', key: 'skills' },
  { id: 'projects', key: 'projects' },
  { id: 'experience', key: 'experience' },
  { id: 'graphic', key: 'design' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
];

function Navbar({ activeSection = 'home', isScrolled: isScrolledProp }) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    if (typeof isScrolledProp === 'boolean') {
      setScrolled(isScrolledProp);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolledProp]);

  const handleNav = (e, id) => {
    if (!onHome) return; // let the link navigate home, then anchor
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-nav-inner">
        <NavLink to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="nav-logo-text">Abderrahim<span className="nav-logo-dot">.</span></span>
        </NavLink>

        <button
          className={`nav-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={onHome ? `#${item.id}` : `/#${item.id}`}
                className={onHome && activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleNav(e, item.id)}
              >
                {t(`nav.${item.key}`)}
              </a>
            </li>
          ))}
          <li>
            <a
              className="nav-download"
              href={require('../cv/cv_BENZAYED_Abderrahim.pdf')}
              download="CV_Abderrahim_Benzayed.pdf"
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faDownload} />
              {t('nav.downloadCV')}
            </a>
          </li>
          <li>
            <NavLink to="/contacting" className="nav-cta" onClick={() => setMenuOpen(false)}>
              {t('nav.contact')}
            </NavLink>
          </li>
          <li className="nav-lang-item">
            <div className="nav-lang-switcher">
              <FontAwesomeIcon icon={faGlobe} className="nav-lang-icon" />
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  type="button"
                  className={i18n.resolvedLanguage === lng.code ? 'active' : ''}
                  onClick={() => {
                    i18n.changeLanguage(lng.code);
                    setMenuOpen(false);
                  }}
                >
                  {lng.label}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
