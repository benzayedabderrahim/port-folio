import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPaperPlane, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './css style/cont.css';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    subject: ''
  });

  const [showOtherCountryInput, setShowOtherCountryInput] = useState(false);
  const [otherCountry, setOtherCountry] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const countryOptions = [
    'Tunisia', 'Algeria', 'Germany', 'United Kingdom', 'Spain',
    'Portugal', 'Italy', 'Switzerland', 'Poland', 'France',
    'Canada', 'USA', 'Austria', 'Turkey'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'country' && value === 'Other') {
      setShowOtherCountryInput(true);
    } else if (name === 'country') {
      setShowOtherCountryInput(false);
      setOtherCountry('');
      setShowWarning(false);
    }
  };

  const handleOtherCountryChange = (e) => {
    const value = e.target.value;
    setOtherCountry(value);
    setShowWarning(countryOptions.includes(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const dataToSend = { ...formData, country: formData.country === 'Other' ? otherCountry : formData.country };
    axios.post('http://localhost:3002/writeMessage', dataToSend)
      .then(() => {
        alert('Your message has been sent successfully ❤');
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        setSubmitting(false);
      });
  };

  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-bg-orb contact-orb-1" />
      <div className="contact-bg-orb contact-orb-2" />

      <div className="contact-wrapper">
        <div className="contact-intro">
          <span className="contact-badge">
            <span className="contact-badge-dot" /> Available for opportunities
          </span>
          <h1 className="contact-heading">
            Let's build something <span>together</span>
          </h1>
          <p className="contact-subtext">
            Have a project in mind, a question, or just want to say hello?
            Drop me a message and I'll get back to you as soon as possible.
          </p>

          <div className="contact-channels">
            <a className="contact-channel" href="mailto:benzayedabderrahim@gmail.com">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
              <div>
                <span className="contact-channel-label">Email</span>
                <span className="contact-channel-value">benzayedabderrahim@gmail.com</span>
              </div>
            </a>
            <a className="contact-channel" href="https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/" target="_blank" rel="noopener noreferrer">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faLinkedin} /></div>
              <div>
                <span className="contact-channel-label">LinkedIn</span>
                <span className="contact-channel-value">in/abderrahim-benzayed</span>
              </div>
            </a>
            <a className="contact-channel" href="https://github.com/benzayedabderrahim" target="_blank" rel="noopener noreferrer">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faGithub} /></div>
              <div>
                <span className="contact-channel-label">GitHub</span>
                <span className="contact-channel-value">github.com/benzayedabderrahim</span>
              </div>
            </a>
            <div className="contact-channel static">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
              <div>
                <span className="contact-channel-label">Location</span>
                <span className="contact-channel-value">Gabes, Tunisia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card">
          <h2 className="contact-card-title">Send a message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fname">First name</label>
                <input type="text" id="fname" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Last name</label>
                <input type="text" id="lname" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                <option value="" disabled>Select your country</option>
                {countryOptions.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {showOtherCountryInput && (
              <div className="form-group">
                <label htmlFor="otherCountry">Specify your country</label>
                <input
                  type="text"
                  id="otherCountry"
                  value={otherCountry}
                  onChange={handleOtherCountryChange}
                  placeholder="Please specify your country"
                />
                {showWarning && (
                  <p className="form-warning">This option already exists — just choose it from the list!</p>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="subject">Your message</label>
              <textarea id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Tell me about your project or idea..." required></textarea>
            </div>

            {!showWarning && (
              <button type="submit" className="contact-submit" disabled={submitting}>
                <FontAwesomeIcon icon={submitting ? faCircleCheck : faPaperPlane} />
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
