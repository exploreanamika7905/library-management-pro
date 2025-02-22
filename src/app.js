const express = require("express");
const cors = require('cors');
const app = express();

// Configure CORS options
// const corsOptions = {
//     origin: 'https://orange-winner-4vrjjrg6p4g3j6xx-3000.app.github.dev', // Replace with your React app URL
//     methods: 'GET,POST,PUT,DELETE', // Allowed methods
//     credentials: true, // Enable cookies if needed
// };

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const bookOperationsRoutes = require('./routes/bookOperationsRoutes');
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/book-operations', bookOperationsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;