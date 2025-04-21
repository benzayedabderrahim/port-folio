import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './comModal.css';

function MessageModal({ show, handleClose, commer, messages, onSendMessage }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <img 
            src={`http://localhost:3001/uploads/${commer.Commeragricole.photo}`} 
            alt={`${commer.Commeragricole.nom} ${commer.Commeragricole.prenom}`} 
            className="img-fluid rounded-circle me-3" 
            style={{ width: '50px', height: '50px' }} 
          />
          Chat with {commer.Commeragricole.nom} {commer.Commeragricole.prenom}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.idUser === localStorage.getItem('userId') ? 'sender' : 'receiver'}`}>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
        <textarea 
          className="form-control mt-3" 
          rows="3" 
          placeholder="Write your message here..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendMessage}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MessageModal;
