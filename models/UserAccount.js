const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, {
  timestamps: true,
});

// Şifre hashleme 
userAccountSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
  next();
});

// Şifre kontrolü 
userAccountSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = UserAccount;
