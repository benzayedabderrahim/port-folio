import React from 'react';
import Navbar from './components/navbar';
import { NavLink } from 'react-router-dom';
import './css style/css.css';
import dev from './dev.json';
import Lottie from 'lottie-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faGraduationCap, faCertificate, faBriefcase, faPeopleGroup, faCrown} from '@fortawesome/free-solid-svg-icons';
import { Typewriter, Cursor } from 'react-simple-typewriter';
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Home() {
  useEffect(() =>{
    AOS.init({duration: 2000});
  }, [])
  return (
    <>
      <header>
        <div>
          <Navbar />
        </div>
      </header>
      <section data-aos='zoom-out'>
      <div>  <br />  <br />  <br />
        <div className='lottie-container'> 
          <Lottie animationData={dev} />
        </div> <br /> <br /> <br /> <br /> <br />
        <div className='cn'>
       <img src={require('./pics/me.png')} />
        </div>
        <br /> <br />
        <div>
          <h3 className="text-left">
            Hello <span style={{color: 'red'}}>Everyone!</span>
          </h3>
        </div>
        <div>
          <h3 className="text-left">
            I'm Abderrahim BENZAYED.
          </h3>
        </div>
        <div>
          <h5 className="text-left">
            I'm a junior web developer <br />
            and I have{' '}
            <span style={{ fontWeight: 'bold', color: 'skyblue' }}>
              <Typewriter
                words={['Bachelor degree in Business Computing', 'Participating in many projects']}
                loop={true}
                typeSpeed={50}
                deleteSpeed={40}
              />
            </span>
            <span style={{ color: 'red' }}>
              <Cursor cursorStyle='/' />
            </span>
          </h5>
        </div>
      </div>
      </section>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <section className="skills-section" data-aos='fade-up'>
      <div>
        <h2 style={{ color: 'Blue' }}>Skills</h2>
        <br />
        <ul className="skills-list">
          <li><i className="fab fa-html5"></i>HTML</li>
          <li><i className="fab fa-css3-alt"></i>CSS</li>
          <li><i className="fab fa-js-square"></i>JavaScript</li>
          <li><i className="fas fa-database"></i>MySQL</li>
          <li><i className="fab fa-node-js"></i>NodeJS</li>
          <li><i className="fab fa-react"></i>ReactJS</li>
          <li><i className="fab fa-python"></i>Python</li>
          <li><i className="fa-solid fa-palette"></i>Graphic Design</li>
          <li><i className="fa-solid fa-file-video"></i>Video Editing</li>
        </ul>
      </div>
    </section>
    <br /> <br /> <br />
    <section className="academic-section" data-aos='fade-up'>
      <div>
        <h2 style={{textAlign: 'center'}}>Academic Career</h2>
        <ul  className="work-experience-list">
          <li>
            <FontAwesomeIcon icon={faCertificate} style={{ marginRight: '10px', color: '#ff6347' }} />
            2021 : Baccalaureate 
            <span className="section">Section: Economics and Management</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '10px', color: '#4682b4' }} />
            2021-2024 : Bachelor degree <br />
            <span className="section">National Diploma in Business Computing</span> <br />
            Higher Institute of Management, Gabés, Tunisia
          </li>
        </ul>
      </div>
    </section>
    <br /> <br /> <br />
    <section className="projects-section" data-aos='zoom-in'>
  <div>
    <h2 style={{ color: 'Blue' }}>Projects</h2>
    <ul className="projects-list">
      <li>
        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }} />
        <a>End of studies Project</a>
        <span>This is the project for my Ends studies in Business Computing, specializing in Business Information Systems. It is a platform for buying and selling agricultural products, as well as for selling, buying, and/or renting agricultural land. The platform also provides a space for sharing ideas and communication among farmers.
        Programming tools: Node.js, React.js, MySQL, Bootstrap.</span>
             <li className="nav-item">
             <NavLink className="nav-link" to="./frontend/src/pages/home.jsx">Make a view</NavLink>
             </li>
        </li>
      <li>
        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '10px' }} />
        <a href='https://github.com/benzayedabderrahim/CurrencyConvertor'>Simple application for currency exchange "Euro and Tunisian dinar"</a>
        <span>This application allows users to easily convert between Euro and Tunisian dinar with up-to-date exchange rates. Programming tools: React.js, Bootstrap.</span>
      </li>
    </ul>
  </div>
</section>
    <br /> <br /> <br />
    <section className="work-experience-section" data-aos='zoom-out'>
      <div>
        <h2 style={{ color: 'Blue' }}>Work Experience</h2>
        <ul className="work-experience-list">
          <li>
            <FontAwesomeIcon icon={faBriefcase} className="icon" />
            <span className="role">2022 - Summer Internship</span>
            <span className="company"><a href='https://www.tunisietelecom.tn/particulier/'>Tunisie Télecome Company</a></span>
            <span>In this internship, I learned about the development of a website using NodeJS and Angular, the management of network sites, and Fiber Optic Exploration.</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faBriefcase} className="icon" />
            <span className="role">2023 - Summer Internship</span>
            <span className="company"><a href='https://www.tunisietelecom.tn/particulier/'>Tunisie Télecome Company</a></span>
            <span>My second internship with the same company, I continued working with NodeJS and Angular, and learned how to manage databases.</span>
          </li>
        </ul>
      </div>
    </section>
    <br /> <br /> <br />
    <section className="social-section" data-aos='fade-up'>
      <div>
        <h2>
          Social Life
        </h2>
        <ul className="work-experience-list">
          <li>
            <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: '10px', color: 'blue' }} />
            A member and Chief of the Robotics Department at the 
            <a href='https://www.facebook.com/CubresClub'>CUBERS Club</a> ,Higher Institute of Management , Gabes Tunisia (2021-2024)
          </li>
          <li>
          <FontAwesomeIcon icon={faPeopleGroup} style={{ marginRight: '10px', color: 'blue' }} />
            Participated in Sm'art Hackathon - Gabes, Tunisia (30,01,02 December 2023)
          </li>
          <li>
            <FontAwesomeIcon icon={faCrown} style={{ marginRight: '10px', color: 'blue' }} />
            President of 
            <a href='https://www.facebook.com/CubresClub'>CUBERS Club</a> ,Higher Institute of Management , Gabes Tunisia (2024-Now)
          </li>
        </ul>
      </div>
    </section>
    git inin <br />
    <section class="contact-info" data-aos='fade-up'>
  <div class="centered">
    <h2 style={{ color: 'Blue' }}>Contact Infos</h2>
    <ul className="work-experience-list">
      <li><i class="fas fa-envelope" style={{color: '#007bff'}}></i> E-mail : benzayedabderrahim@gmail.com</li>
      <li><i class="fab fa-whatsapp" style={{color: '#25d366'}}></i> WhatsApp : +216 29 200 623</li>
      <li><i class="fab fa-linkedin" style={{color: '#0077b5'}}></i> LinkedIn : <a href='https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/'>Abderrahim BENZAYED</a></li>
      <li><i class="fab fa-github" style={{color: '#333'}}></i> GitHub : <a href='https://github.com/benzayedabderrahim'>Benzayed Abderrahim</a></li>
    </ul>
  </div>
</section>
<br /> <br /> <br /> <br />
    </>
  );
}

export default Home;
