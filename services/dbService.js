const mongoose = require('mongoose');

const connectToDb = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connection Successful');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
  }
};

module.exports = {
  connectToDb,
};
