import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../css style/css.css'; 

function Footer() {
  return (
    <footer className="site-footer" data-aos="fade-up">
      <div className="footer-content">
        <p>Made with ❤ by Abderrahim Benzayed © {new Date().getFullYear()}</p>
        <div className="footer-links">
          <a href="mailto:benzayedabderrahim@gmail.com" title="Email">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a
            href="https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/benzayedabderrahim"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
            {/* account for GitHub */}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
