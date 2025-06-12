const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startTime: Date,
  endTime: Date,
  result: String, // WIN | LOSE | SURRENDER
  logs: [{
    timestamp: Date,
    action: String,
    detail: String
  }]
});

module.exports = mongoose.model('Game', gameSchema);
