import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../css style/css.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'graphic', label: 'Design' },
];

function Navbar({ activeSection = 'home', isScrolled: isScrolledProp }) {
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
          <span className="nav-logo-mark">AB</span>
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
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <NavLink to="/contacting" className="nav-cta" onClick={() => setMenuOpen(false)}>
              Contact Me
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
