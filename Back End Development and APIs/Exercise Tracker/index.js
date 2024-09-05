const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage
let users = [];
let exercises = [];

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Function to generate a unique string-based ID (e.g., timestamp-based)
const generateId = () => new Date().getTime().toString() + Math.random().toString(36).substring(7);

// Create a new user (POST /api/users)
app.post('/api/users', (req, res) => {
  const newUser = {
    _id: generateId(), // Generate a unique string-based _id
    username: req.body.username,
  };
  users.push(newUser);
  res.json(newUser);
});

// Get all users (GET /api/users)
app.get('/api/users', (req, res) => {
  // Return only the username and _id for each user as string
  const usersList = users.map(user => ({
    username: user.username,
    _id: user._id,  // Ensure _id is a string
  }));
  res.json(usersList);
});

// Add exercise for a user (POST /api/users/:_id/exercises)
app.post('/api/users/:_id/exercises', (req, res) => {
  const userId = req.params._id;
  const user = users.find(u => u._id === userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const exercise = {
    _id: generateId(), // Generate unique id for each exercise
    userId: userId,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString(),
  };

  exercises.push(exercise);

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
    _id: user._id,  // Return the string-based user _id
  });
});

// Get exercise log for a user (GET /api/users/:_id/logs)
app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id;
  const user = users.find(u => u._id === userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  let userExercises = exercises.filter(e => e.userId === userId);

  // Apply filters: 'from', 'to', 'limit'
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
    _id: user._id,  // Ensure _id is returned as a string
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
