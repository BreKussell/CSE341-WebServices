const mongoose = require('mongoose');

// MongoDB connection URI
const dbURI = 'mongodb+srv://rus17008:KOdFQhioxprW8DyD@cluster0.jnkg9pl.mongodb.net/users'; 
//
// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Deprecation warning fix for ensureIndex
  useFindAndModify: false // Deprecation warning fix for findAndModify
}).then(() => {
  console.log('Database connection successful');
}).catch(err => {
  console.error('Database connection error:', err);
});

// To handle initial connection errors
mongoose.connection.on('error', err => {
  console.error('Mongoose initial connection error:', err);
});

// To handle errors after initial connection was established
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
  // Optionally try to reconnect
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Properly close the Mongoose connection when the application ends
process.on('SIGINT', function() {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

// Export the mongoose instance
module.exports = mongoose;
