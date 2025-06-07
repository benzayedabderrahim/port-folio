import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import { NavLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css style/css.css';

import dev from './dev.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faGraduationCap,
  faCertificate,
  faBriefcase,
  faPeopleGroup,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';

import { Typewriter, Cursor } from 'react-simple-typewriter';

function Home() {
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Graphic design items model
  const graphicItems = [
    { src: require('./pics/design1.png'), title: '9th April , poster design', description: 'A creative poster for the national day' },
    { src: require('./pics/design2.png'), title: 'Exams poster', description: 'An exams poster to motivate the students' },
    { src: require('./pics/design3.png'), title: 'Motivation', description: 'Motivational poster for exams.' },
    { src: require('./pics/FCSIT.png'), title: 'Event Poster', description: 'Professional poster for FCSIT event' },
    { src: require('./pics/aff.png'), title: 'Eid poster', description: 'Poster of Eid AL Adha' },

  ];

  // Skills data model
  const skills = [
    { icon: 'fab fa-html5', text: 'HTML' },
    { icon: 'fab fa-css3-alt', text: 'CSS' },
    { icon: 'fab fa-js-square', text: 'JavaScript' },
    { icon: 'fas fa-database', text: 'MySQL' },
    { icon: 'fab fa-node-js', text: 'NodeJS' },
    { icon: 'fab fa-react', text: 'ReactJS' },
    { icon: 'fab fa-python', text: 'Django' },
    { icon: 'fa-solid fa-palette', text: 'Graphic Design' },
    { icon: 'fa-solid fa-file-video', text: 'Video Editing' },
  ];

  // Academic career data model
  const academicCareer = [
    {
      icon: faCertificate,
      year: '2021',
      title: 'Baccalaureate',
      description: 'Economics and Management',
    },
    {
      icon: faGraduationCap,
      year: '2021-2024',
      title: 'Bachelor Degree in Business Computing',
      description: 'Higher Institute of Management, Gabes',
    },
  ];

  // Projects data model
  const projects = [
    {
      icon: faBriefcase,
      title: 'End of Studies Project',
      description:
        'Marketplace platform for agriculture: products, land, and community. Built with Node.js, React, MySQL, Bootstrap.',
      link: '/projects/marketplace', // Use React Router paths, avoid source paths
      external: false,
    },
    {
      icon: faBriefcase,
      title: 'Currency Converter',
      description: 'Simple Euro/TND converter. Built with React and Bootstrap.',
      link: 'https://github.com/benzayedabderrahim/CurrencyConvertor',
      external: true,
    },
  ];

  // Work experience data model
  const workExperience = [
    {
      icon: faBriefcase,
      year: '2022',
      description: (
        <>
          Summer Internship at{' '}
          <a href="https://www.tunisietelecom.tn/particulier/" target="_blank" rel="noopener noreferrer">
            Tunisie Télécom
          </a>
          <br />
          Focused on website development using Angular & NodeJS, network management, and fiber optics.
        </>
      ),
    },
    {
      icon: faBriefcase,
      year: '2023',
      description: 'Summer Internship at the same company. Enhanced skills in database management and full-stack development.',
    },
  ];

  // Social life data model
  const socialLife = [
    {
      icon: faUserFriends,
      description: (
        <>
          Chief of Robotics Department,{' '}
          <a href="https://www.facebook.com/CubresClub" target="_blank" rel="noopener noreferrer">
            CUBERS Club
          </a>{' '}
          (2021–2024)
        </>
      ),
    },
    {
      icon: faPeopleGroup,
      description: 'Participant, Sm\'art Hackathon, Gabes (Dec 2023)',
    },
    {
      icon: faCrown,
      description: (
        <>
          President,{' '}
          <a href="https://www.facebook.com/CubresClub" target="_blank" rel="noopener noreferrer">
            CUBERS Club
          </a>{' '}
          (2024–Now)
        </>
      ),
    },
  ];

  const openModal = (item) => {
    setModalData(item);
    document.body.style.overflow = 'hidden'; // Disable background scroll
  };

  const closeModal = () => {
    setModalData(null);
    document.body.style.overflow = 'auto'; // Enable scroll back
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="hero" data-aos="zoom-in">
        <div className="hero-content">
          <Lottie animationData={dev} className="hero-lottie" />
          <img src={require('./pics/profile.png')} alt="Abderrahim" className="profile-pic" />
          <h1>
            Hello <span className="highlight">Everyone!</span>
          </h1>
          <h2>I'm Abderrahim BENZAYED</h2>
          <p className="typewriter">
            I'm an IT specialist with&nbsp;
            <span className="typing">
              <Typewriter
                words={[
                  'a Bachelor degree in Business Computing',
                  'experience in many projects',
                  'social event participation',
                ]}
                loop={true}
                typeSpeed={60}
                deleteSpeed={40}
              />
              <Cursor cursorStyle="|" />
            </span>
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section dark-section" data-aos="fade-up">
        <h2>Skills</h2>
        <ul className="skills-grid">
          {skills.map((skill, index) => (
            <li key={index}>
              <i className={skill.icon}></i> {skill.text}
            </li>
          ))}
        </ul>
      </section>

      {/* Academic Career */}
      <section className="section" data-aos="fade-up">
        <h2>Academic Career</h2>
        <ul className="timeline">
          {academicCareer.map((item, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={item.icon} />
              <div>
                <strong>{item.year}</strong>: {item.title} <br />
                <span>{item.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="section dark-section" data-aos="zoom-in">
        <h2>My Projects</h2>
        <ul className="project-list">
          {projects.map((proj, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={proj.icon} />
              <h4>
                {proj.external ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">
                    {proj.title}
                  </a>
                ) : (
                  <NavLink to={proj.link}>{proj.title}</NavLink>
                )}
              </h4>
              <p>{proj.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Work Experience */}
      <section className="section" data-aos="zoom-out">
        <h2>Work Experience</h2>
        <ul className="timeline">
          {workExperience.map((work, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={work.icon} /> 
              <div>
                <strong>{work.year}</strong>: {work.description}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Social Life */}
      <section className="section dark-section" data-aos="fade-up">
        <h2>Social Life</h2>
        <ul className="social-list">
          {socialLife.map((item, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={item.icon} /> {item.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Graphic Design Library Section */}
      <section className="section graphic-section" data-aos="fade-up">
        <h2>Graphic Design Library</h2>
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
              <img src={item.src} alt={item.title} className="graphic-img" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section className="section dark-section" data-aos="fade-up">
         <h2>Languages</h2>
        <ul className="languages-list">
         <li>
          <img src={require('./pics/ar.png')}  alt="Tunisian Flag" className="flag-icon" />
          Arabic – Fluent (Mother Language)
         </li>
         <li>
           <img src={require('./pics/en.png')}  alt="UK Flag" className="flag-icon" />
          English – Excellent
          </li>
         <li>
         <img src={require('./pics/fr.png')}  alt="French Flag" className="flag-icon" />
      French – Intermediate
    </li>        
         <li>
           <img src={require('./pics/gr.png')}  alt="German Flag" className="flag-icon" />
         German – Beginner
        </li>
  </ul>
</section>


      {/* Contact Info */}
      <section className="section contact-section" data-aos="fade-up">
        <h2>Contact</h2>
        <ul className="contact-list">
          <li>
            <i className="fas fa-envelope"></i> benzayedabderrahim@gmail.com
          </li>
          <li>
            <i className="fab fa-whatsapp"></i> +216 29 200 623
          </li>
          <li>
            <i className="fab fa-linkedin"></i>{' '}
            <a href="https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <i className="fab fa-github"></i>{' '}
            <a href="https://github.com/benzayedabderrahim" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              &times;
            </button>
            <img src={modalData.src} alt={modalData.title} />
            <h3>{modalData.title}</h3>
            <p>{modalData.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
