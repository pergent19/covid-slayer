const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { startGame, updateGame, getGames } = require('../controllers/gameController');

router.post('/start', authMiddleware, startGame);
router.put('/update', authMiddleware, updateGame);
router.get('/my-games', authMiddleware, getGames);

module.exports = router;
