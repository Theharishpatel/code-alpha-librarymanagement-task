router.post('/', async (req, res) => {
  try {
    // Validate request
    if (!req.body.bookId || !req.body.borrower) {
      return res.status(400).json({ message: 'Book ID and borrower name are required' });
    }

    // Check if book exists and is available
    const book = await Book.findById(req.body.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.status !== 'available') {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }

    // Create borrow record
    const borrow = new Borrow({
      book: req.body.bookId,
      borrower: req.body.borrower,
      notes: req.body.notes
    });

    // Update book status
    book.status = 'borrowed';
    await book.save();
    
    const newBorrow = await borrow.save();
    res.status(201).json(newBorrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});