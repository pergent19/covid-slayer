const Game = require('../models/Game');
const User = require('../models/User');

exports.startGame = async (req, res) => {
  try {
    console.log("Starting game for user:", req.user._id);
    
    const game = await Game.create({
      userId: req.user._id,
      startTime: new Date(),
      logs: [],
      result: '',
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { games: game._id },
    });

    res.json(game);
  } catch (err) {
    console.error("Error starting game:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateGame = async (req, res) => {
  const { gameId, logs, result } = req.body;
  console.log(req.body)
  try {
    // 1. Update the game
    const game = await Game.findByIdAndUpdate(
      gameId,
      {
        logs,
        result,
        endTime: new Date(),
      },
      { new: true }
    );

    // 2. Update the user
    const userId = game.userId;
    const scoreIncrement = result === 'player wins!' ? 10 : 0;

    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    console.log(`Updating User: ${userId} | Incrementing Score by: ${scoreIncrement}`);
    await User.findByIdAndUpdate(userId, {
      $inc: { gamesPlayed: 1, score: scoreIncrement },
    });

    res.json(game);
  } catch (err) {
    console.error('Error updating game/user:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getGames = async (req, res) => {
  const games = await Game.find({ userId: req.user._id }).sort({ startTime: -1 });
  res.json(games);
};
