const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrower: {
    type: String,
    required: true
  },
  borrowedDate: {
    type: Date,
    default: Date.now
  },
  returnedDate: Date,
  notes: String
});

module.exports = mongoose.model('Borrow', BorrowSchema);