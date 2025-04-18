const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todo = require('./Routes/todo.js');
const userRoutes = require('./Routes/userRoutes.js');
const app = express();

dotenv.config();
const PORT = process.env.PORT 
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());  // Middleware to parse JSON requests

// Corrected order of req and res
app.get('/', (req, res) => res.json({ 'message': 'server is running' }));

app.use('/todo', todo);
app.use('/user', userRoutes);
// Connect to MongoDB


mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('DATABASE CONNECTION SUCCESSFUL');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log('DATABASE CONNECTION FAILED');
    console.error(err);
  });


  
