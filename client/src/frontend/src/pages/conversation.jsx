import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Conversation = ({ show, handleClose, conversations }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" className="slide-left">
      <Modal.Header closeButton>
        <Modal.Title>Mes Conversations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {conversations && conversations.length > 0 ? (
          <ul>
            {conversations.map((conversation, index) => (
              <li key={index}>
                <strong>{conversation.name}</strong>: {conversation.lastMessage}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune conversation trouvée.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Conversation;
