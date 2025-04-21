import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import './modal.css';

function MessageModal({ show, handleClose, agriculteur }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const database = getDatabase();

  useEffect(() => {
    if (show && agriculteur) {
      const messagesRef = ref(database, `messages/${userId}_${agriculteur.idAgriculteur}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedMessages = data ? Object.values(data) : [];
        setMessages(loadedMessages);
      });
    }
  }, [show, agriculteur, database, userId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messagesRef = ref(database, `messages/${userId}_${agriculteur.idAgriculteur}`);
      const message = {
        sender: userId,
        text: newMessage,
        timestamp: Date.now(),
      };
      push(messagesRef, message);
      setNewMessage('');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <img
            src={`http://localhost:3001/uploads/${agriculteur.photo}`}
            alt={`${agriculteur.nom} ${agriculteur.prenom}`}
            className="img-fluid rounded-circle me-3"
            style={{ width: '50px', height: '50px' }}
          />
          Chat with {agriculteur.nom} {agriculteur.prenom}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === userId ? 'sender' : 'receiver'}`}>
              <span>{message.text}</span>
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
