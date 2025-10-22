const express = require('express');
const dotenv = require('dotenv');
require ('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

const taskRoutes = require('./routes/task')
app.use('/tasks', taskRoutes)

// default root
app.get('/', (req, res) =>{
    res.send('Server up and running');
});

app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`)
});

module.exports = app;