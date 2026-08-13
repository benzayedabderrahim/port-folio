import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../css style/css.css';

function Footer() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label={t('footer.backToTop')}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      <footer className="site-footer" data-aos="fade-up">
        <div className="footer-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
        
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Abderrahim Benzayed</h3>
              <p>{t('footer.tagline')}</p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>{t('footer.connect')}</h4>
                <div className="social-links">
                  <a
                    href="mailto:benzayedabderrahim@gmail.com"
                    className="social-link"
                    title={t('footer.email')}
                    aria-label="Send email"
                  >
                    <div className="social-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <span>{t('footer.email')}</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={t('footer.linkedin')}
                    aria-label="Visit LinkedIn profile"
                  >
                    <div className="social-icon">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </div>
                    <span>{t('footer.linkedin')}</span>
                  </a>
                  <a
                    href="https://github.com/benzayedabderrahim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={t('footer.github')}
                    aria-label="Visit GitHub profile"
                  >
                    <div className="social-icon">
                      <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <span>{t('footer.github')}</span>
                  </a>
                </div>
              </div>

              <div className="footer-section">
                <h4>{t('footer.quickLinks')}</h4>
                <div className="quick-links">
                  <a href="#home">{t('footer.quickLinkHome')}</a>
                  <a href="#projects">{t('footer.quickLinkProjects')}</a>
                  <a href="#skills">{t('footer.quickLinkSkills')}</a>
                  <a href="#contact">{t('footer.quickLinkContact')}</a>
                </div>
              </div>

              <div className="footer-section">
                <h4>{t('footer.availability')}</h4>
                <div className="availability">
                  <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span>{t('footer.openForOpportunities')}</span>
                  </div>
                  <p>{t('footer.buildTogether')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-credits">
              <p>
                {t('footer.madeWithPrefix')} <FontAwesomeIcon icon={faHeart} className="heart-icon" /> {t('footer.madeWithSuffix')}
                <span className="copyright"> © {currentYear}</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;