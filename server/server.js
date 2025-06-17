const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // serve the HTML file from /public

let users = {};

// Load existing users if file exists
if (fs.existsSync('users.json')) {
  users = JSON.parse(fs.readFileSync('users.json'));
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.json({ success: false, message: 'Invalid username or password.' });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.json({ success: false, message: 'Username already exists!' });
  } else {
    users[username] = password;
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.json({ success: true, message: 'Registration successful!' });
  }
});

app.listen(port, () => {
  console.log(`Account system running on http://localhost:${port}`);
});
