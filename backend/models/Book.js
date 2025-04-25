const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    unique: true
  },
  publishedDate: Date,
  description: String,
  pageCount: Number,
  categories: [String],
  image: String,
  status: {
    type: String,
    enum: ['available', 'borrowed', 'lost'],
    default: 'available'
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', BookSchema);