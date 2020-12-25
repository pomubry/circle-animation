const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const registerValidate = require('./validation/registerValidate');
const register = require('./routes/register');
const UserModel = require('./model/UserModel.js');
const jwtCreate = require('./jwt');

const updateValidate = require('./validation/updateValidate');

dotenv.config();

const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to the Database');
    app.listen(port, () => console.log(`Listening to port ${port}`));
  }
);

app.use(express.json());
app.use(cookieParser());

const build = path.join(__dirname, '..', 'build');

app.get('/api/users', (req, res) => {
  UserModel.find((error, doc) => {
    if (error) return res.json({ error });
    // let ayumu = doc.filter((user) => user.username === 'ayumu');
    res.json({ message: doc });
  });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello' });
});

app.get('/api/cookie', async (req, res) => {
  // Check if token exists
  let token = req.cookies['circle-animation-token'];
  if (!token) return res.json({ error: 'Token not found' });

  // Validate token
  try {
    let jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
    let user = await UserModel.findById(jwtVerify.id);
    res.json({ message: `You are ${user.username}`, jwtVerify });
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  let errorMsg = { username: '', password: '' };

  // Validate req.body
  const { error } = registerValidate.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.forEach((err) => (errorMsg[err.context.label] = err.message));
    return res.status(404).json({ error: errorMsg });
  }

  // Check if username already exists
  let usernameExist = await UserModel.findOne({ username });
  if (usernameExist) {
    errorMsg.username = 'Username was already taken';
    return res.status(404).json({ error: errorMsg });
  }

  register(req, res);
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  let errorMsg = { username: '', password: '' };

  // Validate req.body
  const { error } = registerValidate.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.forEach((err) => (errorMsg[err.context.label] = err.message));
    return res.status(404).json({ error: errorMsg });
  }

  // Check if username already exists
  let usernameExist = await UserModel.findOne({ username });
  if (!usernameExist) {
    errorMsg.username = 'Invalid Username';
    return res.status(404).json({ error: errorMsg });
  }

  // Check if password matched
  let matched = await bcrypt.compare(password, usernameExist.password);
  if (!matched) {
    errorMsg.password = 'Invalid Password';
    return res.status(404).json({ error: errorMsg });
  }

  // jwt/authentication
  let token = jwtCreate({ id: usernameExist._id });
  res.cookie('circle-animation-token', token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.json({ message: usernameExist.username });
});

app.get('/api/logout', (req, res) => {
  // Check if token exists
  let token = req.cookies['circle-animation-token'];
  if (!token) return res.json({ error: 'Token not found' });

  // Validate token
  try {
    let jwtVerify = jwt.verify(token, process.env.JWT_SECRET);

    // jwt/authentication
    res.cookie('circle-animation-token', 'token', {
      maxAge: 1,
      httpOnly: true,
    });
    res.json({ message: 'Logged out!' });
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.put('/api/update-combo', async (req, res) => {
  // Check if token exists
  let token = req.cookies['circle-animation-token'];
  if (!token) return res.json({ error: 'Token not found' });

  // Validate req.body
  const { error } = updateValidate.validate(req.body, { abortEarly: false });
  if (error) return res.status(404).json({ error: 'Invalid request body' });

  // Validate token
  try {
    const { beatmap, highestCombo } = req.body;

    let jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
    let user = await UserModel.findById(jwtVerify.id);

    // Update method
    let { combo } = user.comboInfo.filter(
      (indivBeatmap) => indivBeatmap.beatmap === beatmap
    )[0];
    if (combo < highestCombo) {
      await UserModel.updateOne(
        { _id: jwtVerify.id, 'comboInfo.beatmap': beatmap },
        { $set: { 'comboInfo.$.combo': highestCombo } }
      );

      res.json({ message: 'Saved successfully' });
    } else {
      res.json({ message: 'Combo count was not higher. Nothing was updated.' });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.use(express.static(build));
app.get('*', (req, res) => {
  res.sendFile(build);
});
