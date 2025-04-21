import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA5Pa7_QF0aracbAXlqP1BF4tu8sdgfQvI",
  authDomain: "conversation-adfbd.firebaseapp.com",
  databaseURL: "https://conversation-adfbd-default-rtdb.firebaseio.com",
  projectId: "conversation-adfbd",
  storageBucket: "conversation-adfbd.appspot.com",
  messagingSenderId: "911019427522",
  appId: "1:911019427522:web:9de95dc1920ca28cba5d5b",
  measurementId: "G-YE2F7YR0J1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
