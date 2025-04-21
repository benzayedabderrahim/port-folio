import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import sendMessage from './service'; 

const MessageModal = ({ show, handleClose, agriculteur }) => {
  const [messageContent, setMessageContent] = useState('');

  const handleSend = () => {
    if (messageContent) {
      const idReceiver = agriculteur ? agriculteur.id : 'defaultReceiver'; // Handle case when agriculteur is null
      sendMessage(messageContent, idReceiver); 
      setMessageContent('');
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Envoyer un message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre message"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSend}>
          Envoyer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
