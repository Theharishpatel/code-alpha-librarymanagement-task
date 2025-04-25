const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/book-library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => res.send('Book Library API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const booksRouter = require('./routes/books');
const borrowsRouter = require('./routes/borrows');

app.use('/api/books', booksRouter);
app.use('/api/borrows', borrowsRouter);