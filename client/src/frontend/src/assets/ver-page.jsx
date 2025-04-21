import React, { useState } from 'react';
import axios from 'axios';
import './verpage.css'; 

const Verpage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/verify-email', { code: verificationCode, email: localStorage.getItem('userEmail') });
      if (response.data.success) {
        setMessage(response.data.message);
        setTimeout(() => {
          window.location.href = '/'; // Redirect to home page or login page
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Erreur lors de la vérification de l\'email.');
    }
  };

  return (
    <div className="verification-container">
      <h2>Vérification de l'email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Code de vérification"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit">Vérifier</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Verpage;
