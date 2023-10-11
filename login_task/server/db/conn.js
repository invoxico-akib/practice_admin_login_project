const mongoose = require("mongoose");
//  mongoose.connect("mongodb://localhost:27017/fake_data", {
mongoose.connect("mongodb://127.0.0.1:27017/fake_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});