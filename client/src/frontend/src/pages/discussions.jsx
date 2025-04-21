import React, { useState, useEffect } from 'react';
import Navigation from '../components/navbar';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

function Discussion() {
  const [conversations, setConversations] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const database = getDatabase();

  useEffect(() => {
    const conversationsRef = ref(database, 'conversations');
    onValue(conversationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userConversations = Object.entries(data).filter(([key, value]) => value.participants.includes(userId));
        setConversations(userConversations);
      } else {
        setConversations([]);
      }
    });

  }, [userId, database]);

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <h1>Mes Conversations</h1>
        {conversations.length > 0 ? (
          <ul className="list-group">
            {conversations.map(([id, conversation]) => (
              <li key={id} className="list-group-item">
                <Link to={`/conversation/${id}`}>
                  Conversation avec {conversation.participants.find(participant => participant !== userId)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune conversation trouvée.</p>
        )}
      </div>
    </div>
  );
}

export default Discussion;
