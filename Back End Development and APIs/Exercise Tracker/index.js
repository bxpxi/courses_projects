const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// storage
let users = [];
let exercises = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// generate a unique id for each user
const generateId = () => new Date().getTime().toString() + Math.random().toString(36).substring(7);

// create a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    _id: generateId(),
    username: req.body.username,
  };
  users.push(newUser);
  res.json(newUser);
});

// get all users 
app.get('/api/users', (req, res) => {
  const usersList = users.map(user => ({
    username: user.username,
    _id: user._id
  }));
  res.json(usersList);
});

// add exercise for a user
app.post('/api/users/:_id/exercises', (req, res) => {
  const userId = req.params._id;
  const user = users.find(u => u._id === userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const exercise = {
    _id: generateId(),
    userId: userId,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString()
  };

  exercises.push(exercise);

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
    _id: user._id
  });
});

// get exercise log for a user
app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id;
  const user = users.find(u => u._id === userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  let userExercises = exercises.filter(e => e.userId === userId);

  const { from, to, limit } = req.query;
  if (from) {
    const fromDate = new Date(from);
    userExercises = userExercises.filter(e => new Date(e.date) >= fromDate);
  }
  if (to) {
    const toDate = new Date(to);
    userExercises = userExercises.filter(e => new Date(e.date) <= toDate);
  }
  if (limit) {
    userExercises = userExercises.slice(0, parseInt(limit));
  }

  res.json({
    username: user.username,
    count: userExercises.length,
    _id: user._id,
    log: userExercises.map(e => ({
      description: e.description,
      duration: e.duration,
      date: e.date,
    })),
  });
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
