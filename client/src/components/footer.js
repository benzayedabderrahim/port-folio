import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../css style/css.css';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
          aria-label="Back to top"
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
              <p>IT developer analyst & IT Specialist</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4>Connect</h4>
                <div className="social-links">
                  <a 
                    href="mailto:benzayedabderrahim@gmail.com" 
                    className="social-link"
                    title="Email"
                    aria-label="Send email"
                  >
                    <div className="social-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <span>Email</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title="LinkedIn"
                    aria-label="Visit LinkedIn profile"
                  >
                    <div className="social-icon">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </div>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/benzayedabderrahim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title="GitHub"
                    aria-label="Visit GitHub profile"
                  >
                    <div className="social-icon">
                      <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h4>Quick Links</h4>
                <div className="quick-links">
                  <a href="#home">Home</a>
                  <a href="#projects">Projects</a>
                  <a href="#skills">Skills</a>
                  <a href="#contact">Contact</a>
                </div>
              </div>
              
              <div className="footer-section">
                <h4>Availability</h4>
                <div className="availability">
                  <div className="status-indicator">
                    <div className="status-dot"></div>
                    <span>Open for opportunities</span>
                  </div>
                  <p>Let's build something amazing together!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-credits">
              <p>
                Made with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> by Abderrahim Benzayed 
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