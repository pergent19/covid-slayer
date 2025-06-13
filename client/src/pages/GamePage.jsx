import React, { useState, useEffect } from "react";
import axios from "axios";
import { start, update } from "../services/gameService";
import Dashboard from "../components/Dashboard";

export default function GamePage() {
  const [gameId, setGameId] = useState(null);
  const [health, setHealth] = useState({ player: 100, monster: 100 });
  const [log, setLog] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, timeLeft, gameOver]); 

  useEffect(() => {
    if (gameStarted && !gameOver && (health.player <= 0 || health.monster <= 0 || timeLeft === 0)) {
      const finalWinner = health.player > health.monster ? `Player ${user.fullName} Wins!` : "Covid Monster Wins!";
      setWinner(finalWinner);
      setGameOver(true);
      setShowWinnerModal(true)

      logAction(`🏆 Game Over! ${finalWinner}`);

      if (gameId) {
        updateGameInDB(gameId, log, finalWinner.toLowerCase());
      }
    }
  }, [health, timeLeft, gameStarted]); 

  const startGame = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await start({}, token);

      setGameId(response.data._id);
      setGameStarted(true);
      setGameOver(false);
      setWinner(null);
      setHealth({ player: 100, monster: 100 });
      setLog([]);
      setTimeLeft(60);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

 const updateGameInDB = async (gameId, logs, result) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    await update({
      gameId,
      logs: logs.map(logEntry => ({
        timestamp: new Date(),
        action: "Game Event",
        detail: logEntry,
      })),
      result,
    }, token);

  } catch (error) {
    console.error("Error saving game data:", error);
  }
};

  const logAction = (text) => setLog((existingLogs) => [text, ...existingLogs.slice(0, 9)]);

  const attack = () => {
    if (!gameStarted || gameOver) return;
    const playerDmg = Math.floor(Math.random() * 10) + 1;
    const dragonDmg = Math.floor(Math.random() * 10) + 1;
    setHealth((h) => ({
      player: h.player - dragonDmg,
      monster: h.monster - playerDmg,
    }));
    logAction(`🐉 Dragon attacks Player ${user.fullName} for ${dragonDmg}`);
    logAction(`⚔️ Player ${user.fullName} strikes Dragon for ${playerDmg}`);
  };

  const powerAttack = () => {
    if (!gameStarted || gameOver) return;
    const playerDmg = Math.floor(Math.random() * 20) + 5;
    const dragonDmg = Math.floor(Math.random() * 20) + 5;
    setHealth((h) => ({
      player: h.player - dragonDmg,
      monster: h.monster - playerDmg,
    }));
    logAction(`🐉 The Dragon unleashes a **fierce counterattack** for ${dragonDmg}!`);
    logAction(`💥 Player ${user.fullName} **smashes** the Dragon with a power hit for ${playerDmg}!`);
  };

  const heal = () => {
    if (!gameStarted || gameOver) return;
    const healValue = Math.floor(Math.random() * 10) + 5;
    const infection = Math.floor(Math.random() * 10);
    setHealth((h) => ({
      player: Math.min(100, h.player + healValue - infection),
      monster: h.monster,
    }));
    logAction(`🩹 Player ${user.fullName} heals for ${healValue}, infected for ${infection}`);
  };

  const surrender = () => {
    if (!gameStarted || gameOver) return;
    setGameOver(true);
    setWinner("Covid Monster Wins!");
    logAction(`⚰️ Player ${user.fullName} surrendered.`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Covid Slayer: Battle Mode</h2>

      {gameStarted ? (
        gameOver ? (
          <>
            <h3 className="text-xl font-bold text-green-500 mb-5">{winner}</h3>
            <button onClick={startGame} className="bg-green-500 hover:bg-green-700 px-6 py-2 rounded-md text-white transition mb-5">
              Start again?
            </button>
        </>

        ) : (
          <div className="flex justify-between mb-4">
            <p>Player Health: {health.player}</p>
            <p>Monster Health: {health.monster}</p>
            <p>Time Left: {timeLeft}s</p>
          </div>
        )
      ) : (
        <button onClick={startGame} className="bg-green-500 hover:bg-green-700 px-6 py-2 rounded-md text-white transition mb-5">
          Start Game
        </button>
      )}

      {gameStarted && !gameOver && (
        <div className="space-x-2 mb-6">
          <button onClick={attack} className="bg-red-500 hover:bg-red-700 px-6 py-2 rounded-md text-white transition">Attack</button>
          <button onClick={powerAttack} className="bg-orange-500 hover:bg-orange-700 px-6 py-2 rounded-md text-white transition">Power Attack</button>
          <button onClick={heal} className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition">Heal</button>
          <button onClick={surrender} className="bg-gray-500 hover:bg-gray-700 px-6 py-2 rounded-md text-white transition">Surrender</button>
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="font-bold mb-2">Commentary</h3>
        <ul className="space-y-1 text-sm max-h-40 overflow-y-auto">
          {log.map((entry, i) => (
            <li key={i}>• {entry}</li>
          ))}
        </ul>
      </div>

      {showWinnerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4 text-green-700">{winner}</h2>
            <p className="mb-6">Would you like to play again?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setShowWinnerModal(false);
                  startGame();
                }}
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md"
              >
                Play Again
              </button>
              <button
                onClick={() => setShowWinnerModal(false)}
                className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Dashboard />
    </div>
  );
}
