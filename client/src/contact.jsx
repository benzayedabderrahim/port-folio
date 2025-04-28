import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

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
    const dataToSend = { ...formData, country: formData.country === 'Other' ? otherCountry : formData.country };
    axios.post('http://localhost:3002/writeMessage', dataToSend)
      .then(response => {
        alert('Your message has been sent successfully ❤');
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <Navbar />
      <div className="container">
        <h2>Get in touch !</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Your first name</label>
          <input type="text" id="fname" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Your name.." />

          <label htmlFor="lname">Your last name</label>
          <input type="text" id="lname" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Your last name.." />

          <label htmlFor="country">Country</label>
          <select id="country" name="country" value={formData.country} onChange={handleChange}>
            {countryOptions.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {showOtherCountryInput && (
            <div>
              <input
                type="text"
                id="otherCountry"
                value={otherCountry}
                onChange={handleOtherCountryChange}
                placeholder="Please specify your country"
              />
              {showWarning && (
                <h4 style={{ color: 'red' }}>
                  This option already exists, just choose it! 
                </h4>
              )}
            </div>
          )}

          <label htmlFor="subject">Write your beautiful message here ❤</label>
          <textarea id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Write something.." style={{ height: '200px' }}></textarea>

          {!showWarning && <input type="submit" value="Submit" />}
        </form>
      </div>
    </div>
  );
}

export default Contact;
