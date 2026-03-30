import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css style/css.css';
import dev from './dev.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faGraduationCap, faCertificate, faBriefcase, faPeopleGroup, faCrown, faDownload, faPlay, faXmark, faArrowRight, faCoins } from '@fortawesome/free-solid-svg-icons';
import { Typewriter, Cursor } from 'react-simple-typewriter';
import Footer from './components/footer';
import ChatBot from './components/chatbot';

function Home() {
  const [modalData, setModalData] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true,
      offset: 100
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const graphicItems = [
    { src: require('./pics/design1.png'), title: '9th April , poster design', description: 'A creative poster for the national day' },
    { src: require('./pics/design2.png'), title: 'Exams poster', description: 'An exams poster to motivate the students' },
    { src: require('./pics/design3.png'), title: 'Motivation', description: 'Motivational poster for exams.' },
    { src: require('./pics/FCSIT.png'), title: 'Event Poster', description: 'Professional poster for FCSIT event' },
    { src: require('./pics/aff.png'), title: 'Eid poster', description: 'Poster of Eid AL Adha' },
  ];

  const skills = [
    { icon: 'fab fa-html5', text: 'HTML', color: '#e34f26' },
    { icon: 'fab fa-css3-alt', text: 'CSS', color: '#1572b6' },
    { icon: 'fab fa-js-square', text: 'JavaScript', color: '#f7df1e' },
    { icon: 'fas fa-database', text: 'MySQL', color: '#4479a1' },
    { icon: 'fab fa-node-js', text: 'NodeJS', color: '#339933' },
    { icon: 'fab fa-react', text: 'ReactJS', color: '#61dafb' },
    { icon: 'fab fa-angular', text: 'AngularJS', color: '#dd0031' },
    { icon: 'fab fa-python', text: 'Django', color: '#fbff02ff' },
    { icon: 'fa-solid fa-palette', text: 'Graphic Design', color: '#ff6b6b' },
    { icon: 'fa-solid fa-file-video', text: 'Video Editing', color: '#4ecdc4' },
  ];

  const academicCareer = [
    { icon: faCertificate, year: '2021', title: 'Baccalaureate', description: 'Economics and Management' },
    { icon: faGraduationCap, year: '2021-2024', title: 'Bachelor Degree in Business Computing', description: 'Higher Institute of Management, Gabes' },
  ];

  const projects = [
    {
      icon: faBriefcase,
      title: 'Re\'Vision App',
      description: 'Simple analyzing youtube videos app using Google API (YouTube v3) , Django and ReactJS.',
      link: 'https://github.com/benzayedabderrahim/ReVisionApp--Frontend-.git',
      external: true,
      video: require('./components/video/rev.mp4'),
      tags: ['React', 'Django', 'API']
    },
    {
      icon: faBriefcase,
      title: 'End of Studies Project',
      description: 'Marketplace platform for agriculture: products, land, and community. Built with ReactJS , NodeJS and MySQL',
      link: '/projects/marketplace',
      external: false,
      video: require('./components/video/vid1.mp4'),
      tags: ['React', 'Node.js', 'MySQL']
    },
    {
      icon: faBriefcase,
      title: 'Currency Converter',
      description: 'Simple currency converter. Built with HTML & JavaScript',
      link: 'https://github.com/benzayedabderrahim/CurrencyConvertor',
      external: true,
      video: require('./components/video/currconv.mp4'),
      tags: ['HTML', 'JavaScript']
    },
  ];

  const workExperience = [
    {
      icon: faBriefcase,
      year: '2024',
      company: 'Creatix Software Consulting',
      description: 'Summer Internship enhancing skills in database management and full-stack development using Django , AngularJS and MySQL Workbench.',
      link: 'https://www.linkedin.com/company/creatix-software-consulting/'    
    },
    {
      icon: faBriefcase,
      year: '2023',
      company: 'Tunisie Télécom',
      description: 'Summer Internship enhancing skills in database management and full-stack development.',
      link: 'https://www.tunisietelecom.tn/particulier/'
    },
    {
      icon: faBriefcase,
      year: '2022',
      company: 'Tunisie Télécom',
      description: 'Summer Internship focused on website development using Angular & NodeJS, network management, and fiber optics.',
      link: 'https://www.tunisietelecom.tn/particulier/'
    },
  ];

  const socialLife = [
    {
      icon: faUserFriends,
      description: 'Member CUBERS Club (2021–2024)',
      link: 'https://www.facebook.com/CubresClub'
    },
    { 
      icon: faPeopleGroup, 
      description: 'Participant, Sm\'art Hackathon, Gabes (Dec 2023)',
      link: null
    },
    { 
      icon: faCrown, 
      description: 'President, CUBERS Club (July 2024 – June 2025)',
      link: 'https://www.facebook.com/CubresClub'
    },
  ];

  const openModal = (item) => {
    setModalData(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalData(null);
    document.body.style.overflow = 'auto';
  };

  const [currentVideo, setCurrentVideo] = useState(null);

  const openVideoModal = (videoSrc) => {
    setCurrentVideo(videoSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setCurrentVideo(null);
    document.body.style.overflow = 'auto';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Currency pairs to animate in the teaser card
  const currencyPairs = [
    { from: '🇹🇳 TND', to: '🇺🇸 USD', rate: '0.32' },
    { from: '🇺🇸 USD', to: '🇪🇺 EUR', rate: '0.92' },
    { from: '🇬🇧 GBP', to: '🇹🇳 TND', rate: '3.88' },
  ];
  const [activePair, setActivePair] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePair(prev => (prev + 1) % currencyPairs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>
        <Navbar activeSection={activeSection} isScrolled={isScrolled} />
      </header>

      <section id="home" className="hero" data-aos="zoom-in">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="profile-container">
            <Lottie animationData={dev} className="hero-lottie" />
            <div className="profile-image-wrapper">
              <img src={require('./pics/profile.png')} alt="Abderrahim" className="profile-pic" />
              <div className="profile-glow"></div>
            </div>
          </div>
          
          <h1>Hello <span className="highlight">Everyone!</span></h1>
          <h2>I'm <span className="name-gradient">Abderrahim BENZAYED</span></h2>
          <p className="typewriter">
            I'm an IT specialist with&nbsp;
            <span className="typing">
              <Typewriter
                words={['Bachelor in Business Computing', 'experience in many projects', 'social events participation']}
                loop={true}
                typeSpeed={60}
                deleteSpeed={40}
              />
              <Cursor cursorStyle="|" />
            </span>
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </button>
          </div>
        </div>
      </section>

      <section id="skills" className="section dark-section" data-aos="fade-up">
        <div className="section-header">
          <h2>Skills & Technologies</h2>
          <p>Technologies I've worked with</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card"
              style={{ '--skill-color': skill.color }}
            >
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <span className="skill-text">{skill.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="academic" className="section" data-aos="fade-up">
        <div className="section-header">
          <h2>Academic Career</h2>
          <p>My educational journey</p>
        </div>
        <div className="timeline">
          {academicCareer.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section dark-section" data-aos="zoom-in">
        <div className="section-header">
          <h2>My Projects</h2>
          <p>Some of my recent work</p>
        </div>
        <div className="projects-grid">
          {projects.map((proj, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <FontAwesomeIcon icon={proj.icon} className="project-icon" />
                <h4>
                  {proj.external ? (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      {proj.title}
                    </a>
                  ) : (
                    <NavLink to={proj.link}>{proj.title}</NavLink>
                  )}
                </h4>
              </div>
              <p>{proj.description}</p>
              <div className="project-tags">
                {proj.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
              {proj.video && (
                <button 
                  className="demo-btn" 
                  onClick={() => openVideoModal(proj.video)}
                >
                  <FontAwesomeIcon icon={faPlay} className="btn-icon" />
                  <span className="btn-text">View Demo</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="currency-tool" className="section currency-teaser-section" data-aos="fade-up">
        <style>{`
          .currency-teaser-section {
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            padding: 80px 20px;
            position: relative;
            overflow: hidden;
          }
          .currency-teaser-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -20%;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
            pointer-events: none;
          }
          .currency-teaser-section::after {
            content: '';
            position: absolute;
            bottom: -30%;
            right: -10%;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
            pointer-events: none;
          }
          .currency-teaser-inner {
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 60px;
            flex-wrap: wrap;
            justify-content: center;
            position: relative;
            z-index: 1;
          }
          .currency-teaser-text {
            flex: 1;
            min-width: 280px;
          }
          .currency-teaser-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 14px;
            background: rgba(99,102,241,0.15);
            border: 1px solid rgba(99,102,241,0.35);
            border-radius: 100px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #a5b4fc;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          .currency-teaser-badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #6366f1;
            box-shadow: 0 0 8px rgba(99,102,241,0.9);
            animation: ctPulse 2s ease-in-out infinite;
          }
          @keyframes ctPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.7); }
          }
          .currency-teaser-title {
            font-size: 36px;
            font-weight: 800;
            color: #f8fafc;
            line-height: 1.15;
            letter-spacing: -0.02em;
            margin: 0 0 14px;
          }
          .currency-teaser-title span {
            background: linear-gradient(90deg, #6366f1, #10b981);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .currency-teaser-desc {
            font-size: 15px;
            color: rgba(255,255,255,0.45);
            line-height: 1.7;
            margin: 0 0 32px;
          }
          .currency-teaser-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 28px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%);
            background-size: 200% 200%;
            border-radius: 14px;
            color: #fff;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
            letter-spacing: 0.03em;
            transition: all 0.3s ease;
            box-shadow: 0 8px 24px rgba(99,102,241,0.35);
            animation: gradientShift 4s ease infinite;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .currency-teaser-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 36px rgba(99,102,241,0.5);
          }
          .currency-teaser-link svg {
            transition: transform 0.3s ease;
          }
          .currency-teaser-link:hover svg {
            transform: translateX(4px);
          }
          .currency-teaser-features {
            display: flex;
            gap: 16px;
            margin-top: 24px;
            flex-wrap: wrap;
          }
          .ct-feature-chip {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 8px;
            font-size: 12px;
            color: rgba(255,255,255,0.5);
            font-weight: 500;
          }
          .ct-feature-chip i {
            font-size: 11px;
            color: #10b981;
          }

          /* Animated preview card */
          .currency-preview-card {
            flex-shrink: 0;
            width: 300px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 24px;
            padding: 28px;
            backdrop-filter: blur(16px);
            box-shadow: 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07);
          }
          .cpc-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 22px;
          }
          .cpc-title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.3);
          }
          .cpc-live-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px rgba(16,185,129,0.8);
            animation: ctPulse 1.5s ease-in-out infinite;
          }
          .cpc-from-panel {
            background: rgba(99,102,241,0.08);
            border: 1px solid rgba(99,102,241,0.18);
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 4px;
          }
          .cpc-to-panel {
            background: rgba(16,185,129,0.06);
            border: 1px solid rgba(16,185,129,0.15);
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 16px;
          }
          .cpc-panel-label {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.25);
            margin-bottom: 8px;
          }
          .cpc-currency-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .cpc-currency-name {
            font-size: 15px;
            font-weight: 700;
            color: #f1f5f9;
            transition: all 0.4s ease;
          }
          .cpc-amount {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #f8fafc;
          }
          .cpc-converted-amount {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #10b981;
          }
          .cpc-swap-row {
            display: flex;
            justify-content: center;
            margin: 4px 0;
          }
          .cpc-swap-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border: 2px solid rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: white;
          }
          .cpc-rate-badge {
            text-align: center;
            font-size: 11px;
            font-weight: 600;
            color: #a5b4fc;
            background: rgba(99,102,241,0.1);
            border: 1px solid rgba(99,102,241,0.2);
            border-radius: 8px;
            padding: 6px 10px;
            letter-spacing: 0.02em;
            transition: all 0.4s ease;
          }
          .pair-fade-enter {
            animation: pairFade 0.5s ease;
          }
          @keyframes pairFade {
            0% { opacity: 0; transform: translateY(6px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="currency-teaser-inner">

          {/* Left: text + CTA */}
          <div className="currency-teaser-text">
            <div className="currency-teaser-badge">
              <div className="currency-teaser-badge-dot" />
              Live Tool
            </div>

            <h2 className="currency-teaser-title">
              Real-Time <span>Currency Converter</span>
            </h2>

            <p className="currency-teaser-desc">
              One of my interactive live tools — instantly convert between 12+ world currencies
              with up-to-date exchange rates. Built with React and the ExchangeRate API.
            </p>

            <NavLink to="/currency-converter" className="currency-teaser-link">
              Try the Live Tool
              <FontAwesomeIcon icon={faArrowRight} />
            </NavLink>

            <div className="currency-teaser-features">
              <div className="ct-feature-chip">
                <i className="fas fa-bolt" /> Live Rates
              </div>
              <div className="ct-feature-chip">
                <i className="fas fa-exchange-alt" /> 12+ Currencies
              </div>
              <div className="ct-feature-chip">
                <i className="fab fa-react" /> Built in React
              </div>
            </div>
          </div>

          {/* Right: animated preview card */}
          <div className="currency-preview-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="cpc-header">
              <span className="cpc-title">Preview</span>
              <div className="cpc-live-dot" />
            </div>

            <div className="cpc-from-panel">
              <div className="cpc-panel-label">You send</div>
              <div className="cpc-currency-row">
                <span className="cpc-currency-name pair-fade-enter" key={`from-${activePair}`}>
                  {currencyPairs[activePair].from}
                </span>
                <span className="cpc-amount">1.00</span>
              </div>
            </div>

            <div className="cpc-swap-row">
              <div className="cpc-swap-icon">⇅</div>
            </div>

            <div className="cpc-to-panel">
              <div className="cpc-panel-label">You receive</div>
              <div className="cpc-currency-row">
                <span className="cpc-currency-name pair-fade-enter" key={`to-${activePair}`}>
                  {currencyPairs[activePair].to}
                </span>
                <span className="cpc-converted-amount pair-fade-enter" key={`rate-${activePair}`}>
                  {currencyPairs[activePair].rate}
                </span>
              </div>
            </div>

            <div className="cpc-rate-badge pair-fade-enter" key={`badge-${activePair}`}>
              1 {currencyPairs[activePair].from.split(' ')[1]} = {currencyPairs[activePair].rate} {currencyPairs[activePair].to.split(' ')[1]}
            </div>
          </div>

        </div>
      </section>
      {/* =================== END CURRENCY CONVERTER TEASER =================== */}

      <section id="experience" className="section" data-aos="zoom-out">
        <div className="section-header">
          <h2>Work Experience</h2>
          <p>My professional journey</p>
        </div>
        <div className="experience-timeline">
          {workExperience.map((work, index) => (
            <div key={index} className="experience-item">
              <div className="experience-year">{work.year}</div>
              <div className="experience-content">
                <FontAwesomeIcon icon={work.icon} className="experience-icon" />
                <div>
                  <h4>
                    {work.link ? (
                      <a href={work.link} target="_blank" rel="noopener noreferrer">
                        {work.company}
                      </a>
                    ) : (
                      work.company
                    )}
                  </h4>
                  <p>{work.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="social" className="section dark-section" data-aos="fade-up">
        <div className="section-header">
          <h2>Social Life</h2>
          <p>Community involvement</p>
        </div>
        <div className="social-grid">
          {socialLife.map((item, index) => (
            <div key={index} className="social-card">
              <FontAwesomeIcon icon={item.icon} className="social-icon" />
              <p>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.description}
                  </a>
                ) : (
                  item.description
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="graphic" className="section graphic-section" data-aos="fade-up">
        <div className="section-header">
          <h2>Graphic Design Library</h2>
          <p>My creative designs</p>
        </div>
        <div className="graphic-library">
          {graphicItems.map((item, index) => (
            <div 
              className="graphic-item" 
              key={index} 
              data-aos="zoom-in" 
              onClick={() => openModal(item)} 
              role="button" 
              tabIndex={0} 
              onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
            >
              <div className="graphic-image-container">
                <img src={item.src} alt={item.title} className="graphic-img" />
                <div className="graphic-overlay">
                  <span>View Details</span>
                </div>
              </div>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="languages" className="section dark-section" data-aos="fade-up">
        <div className="section-header">
          <h2>Languages</h2>
          <p>Languages I speak</p>
        </div>
        <div className="languages-grid">
          <div className="language-item">
            <img src={require('./pics/ar.png')} alt="Arabic" className="flag-icon" />
            <div className="language-info">
              <span className="language-name">Arabic</span>
              <span className="language-level">Fluent (Native)</span>
            </div>
            <div className="language-progress">
              <div className="progress-bar" style={{width: '100%'}}></div>
            </div>
          </div>
          <div className="language-item">
            <img src={require('./pics/en.png')} alt="English" className="flag-icon" />
            <div className="language-info">
              <span className="language-name">English</span>
              <span className="language-level">Excellent</span>
            </div>
            <div className="language-progress">
              <div className="progress-bar" style={{width: '90%'}}></div>
            </div>
          </div>
          <div className="language-item">
            <img src={require('./pics/fr.png')} alt="French" className="flag-icon" />
            <div className="language-info">
              <span className="language-name">French</span>
              <span className="language-level">Intermediate</span>
            </div>
            <div className="language-progress">
              <div className="progress-bar" style={{width: '70%'}}></div>
            </div>
          </div>
          <div className="language-item">
            <img src={require('./pics/gr.png')} alt="German" className="flag-icon" />
            <div className="language-info">
              <span className="language-name">German</span>
              <span className="language-level">Beginner</span>
            </div>
            <div className="language-progress">
              <div className="progress-bar" style={{width: '30%'}}></div>
            </div>
          </div>
        </div>
      </section>

      {currentVideo && (
        <div className="modal-overlay" onClick={closeVideoModal}>
          <div className="modal-content video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVideoModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <video controls autoPlay muted key={currentVideo}>
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <img src={modalData.src} alt={modalData.title} />
            <h3>{modalData.title}</h3>
            <p>{modalData.description}</p>
          </div>
        </div>
      )}
      <ChatBot />
      <Footer />
    </>
  );
}

export default Home;