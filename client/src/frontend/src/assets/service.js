import { ref, push } from 'firebase/database';
import { database } from '../pages/firebase';

const sendMessage = (messageContent, conversationId, idReceiver) => {
  const userId = localStorage.getItem('userId');
  const timestamp = new Date().toISOString();

  const message = {
    idSender: userId,
    idReceiver: idReceiver,
    time: timestamp,
    message: messageContent
  };

  const messagesRef = ref(database, `conversations/${conversationId}/messages`);

  push(messagesRef, message)
    .then(() => {
      console.log('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
}
export default sendMessage;
