const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Book = require('./models/Book');

// Database connection
mongoose.connect('mongodb://localhost:27017/book-library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected for data generation'))
.catch(err => console.log(err));

// Common book categories
const categories = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
  'Mystery', 'Thriller', 'Romance', 'Biography',
  'History', 'Science', 'Technology', 'Business',
  'Self-Help', 'Travel', 'Cooking', 'Art'
];

// Generate a single book
function generateBook() {
  const title = faker.commerce.productName() + ' ' + 
                faker.word.adjective() + ' ' + 
                faker.word.noun();
  
  const author = faker.person.fullName();
  
  // Generate 1-3 random categories
  const bookCategories = [];
  const numCategories = faker.number.int({ min: 1, max: 3 });
  for (let i = 0; i < numCategories; i++) {
    const randomCategory = categories[faker.number.int({ min: 0, max: categories.length - 1 })];
    if (!bookCategories.includes(randomCategory)) {
      bookCategories.push(randomCategory);
    }
  }
  
  return {
    title: title,
    author: author,
    isbn: faker.commerce.isbn(13),
    publishedDate: faker.date.past(20),
    description: faker.lorem.paragraphs(2),
    pageCount: faker.number.int({ min: 50, max: 800 }),
    categories: bookCategories,
    image: faker.image.urlLoremFlickr({ category: 'book,cover' }),
    status: 'available'
  };
}

// Generate and insert books
async function generateAndInsertBooks(count) {
  try {
    const books = [];
    for (let i = 0; i < count; i++) {
      books.push(generateBook());
      // Show progress
      if (i % 100 === 0) console.log(`Generated ${i} books...`);
    }
    
    await Book.insertMany(books);
    console.log(`Successfully inserted ${count} books!`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting books:', err);
    mongoose.disconnect();
  }
}

// Generate 1000 books
generateAndInsertBooks(1000);