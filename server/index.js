const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./message.json');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://message-3c541-default-rtdb.firebaseio.com'
});

const db = admin.database();

console.log('Database connected successfully');

app.get('/download-cv', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'cv.pdf');
  res.download(filePath, 'Your-CV.pdf', (err) => {
      if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Could not download the file.');
      }
  });
});
app.post('/writeMessage', (req, res) => {
  const { firstName, lastName, country, subject } = req.body;

  db.ref('message').push({
    sender: firstName,
    sendersurname: lastName,
    country: country,
    text: subject
  })
  .then(() => res.send('Message written successfully'))
  .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
