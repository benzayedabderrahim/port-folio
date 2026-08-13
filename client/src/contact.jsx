import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPaperPlane, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './css style/cont.css';
import axios from 'axios';

function Contact() {
  const { t } = useTranslation();
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
        alert(t('contact.successAlert'));
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
            <span className="contact-badge-dot" /> {t('contact.badge')}
          </span>
          <h1 className="contact-heading">
            {t('contact.headingPrefix')}<span>{t('contact.headingHighlight')}</span>
          </h1>
          <p className="contact-subtext">
            {t('contact.subtext')}
          </p>

          <div className="contact-channels">
            <a className="contact-channel" href="mailto:benzayedabderrahim@gmail.com">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
              <div>
                <span className="contact-channel-label">{t('contact.email')}</span>
                <span className="contact-channel-value">benzayedabderrahim@gmail.com</span>
              </div>
            </a>
            <a className="contact-channel" href="https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/" target="_blank" rel="noopener noreferrer">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faLinkedin} /></div>
              <div>
                <span className="contact-channel-label">{t('contact.linkedin')}</span>
                <span className="contact-channel-value">in/abderrahim-benzayed</span>
              </div>
            </a>
            <a className="contact-channel" href="https://github.com/benzayedabderrahim" target="_blank" rel="noopener noreferrer">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faGithub} /></div>
              <div>
                <span className="contact-channel-label">{t('contact.github')}</span>
                <span className="contact-channel-value">github.com/benzayedabderrahim</span>
              </div>
            </a>
            <div className="contact-channel static">
              <div className="contact-channel-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
              <div>
                <span className="contact-channel-label">{t('contact.location')}</span>
                <span className="contact-channel-value">{t('contact.locationValue')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card">
          <h2 className="contact-card-title">{t('contact.cardTitle')}</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fname">{t('contact.firstName')}</label>
                <input type="text" id="fname" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
              </div>
              <div className="form-group">
                <label htmlFor="lname">{t('contact.lastName')}</label>
                <input type="text" id="lname" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">{t('contact.country')}</label>
              <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                <option value="" disabled>{t('contact.selectCountry')}</option>
                {countryOptions.map(country => (
                  <option key={country} value={country}>{t(`contact.countries.${country}`)}</option>
                ))}
                <option value="Other">{t('contact.other')}</option>
              </select>
            </div>

            {showOtherCountryInput && (
              <div className="form-group">
                <label htmlFor="otherCountry">{t('contact.specifyCountry')}</label>
                <input
                  type="text"
                  id="otherCountry"
                  value={otherCountry}
                  onChange={handleOtherCountryChange}
                  placeholder={t('contact.specifyPlaceholder')}
                />
                {showWarning && (
                  <p className="form-warning">{t('contact.countryWarning')}</p>
                )}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="subject">{t('contact.messageLabel')}</label>
              <textarea id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('contact.messagePlaceholder')} required></textarea>
            </div>

            {!showWarning && (
              <button type="submit" className="contact-submit" disabled={submitting}>
                <FontAwesomeIcon icon={submitting ? faCircleCheck : faPaperPlane} />
                {submitting ? t('contact.sending') : t('contact.sendMessage')}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
