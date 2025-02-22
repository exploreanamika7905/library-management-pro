const app = require('./app');
const mongoose = require('mongoose');
require("dotenv").config();

const dbURI = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(dbURI)
    .then(() => {
        console.log('Database connected');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            // console.log(`click to open: http://localhost:${PORT}/api/users`)
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// app.use('/api/books', require('./routes/booksRoutes'));


// const User = require('./models/userModel');

// async function insert(params) {
//     await User.create({
//         name: 'Sunil',
//         email: 'sunil@test.com',
//         role: 'admin'
//     });
// }

// insert();


// app.listen(PORT, () => {
//     console.log(`Server is runnig on port  ${PORT}`);
//     mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => console.log('MongoDB Connected'))
//         .catch(err => console.log(err));

// });