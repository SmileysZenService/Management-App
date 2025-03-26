// Import dependencies
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 3001; 

// Enable CORS for all routes
app.use(cors());

// Enable parsing of JSON in request bodies
app.use(express.json());

// In-memory array to store tasks (for simplicity)
const tasks = [
  { id: 1, title: 'Task 1', description: 'Complete homework' },
  { id: 2, title: 'Task 2', description: 'Buy groceries' },
];

// GET endpoint to fetch tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST endpoint to add a new task
app.post('/tasks', (req, res) => {
    console.log('Received new task:', req.body);  // Log the incoming data
    const { title, description } = req.body;
    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
