// Import required modules
const express = require('express');
const app = express();
const port = 3000; // Choose your desired port number

// Middleware to parse JSON requests
app.use(express.json());

// Sample data (in-memory storage)
let items = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
];

// Define your API routes
// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get an item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items[index] = { ...items[index], ...updatedItem };
  res.json(items[index]);
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
