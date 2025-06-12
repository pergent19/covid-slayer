const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  gamesPlayed: { type: Number, default: 0 },
  score: { type: Number, default: 0 }, 
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('User', userSchema);
