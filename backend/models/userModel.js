const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true, // Each email must be unique
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// --- Password Hashing Middleware ---
// This function will run right BEFORE a new user is saved to the database.
userSchema.pre('save', async function (next) {
  // If the password has not been modified, don't re-hash it
  if (!this.isModified('password')) {
    next();
  }

  // Generate a 'salt' to add randomness to the hash
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Method to compare entered password with hashed password ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
