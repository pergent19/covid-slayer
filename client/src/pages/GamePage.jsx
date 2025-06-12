import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GamePage() {
  const [gameId, setGameId] = useState(null);
  const [health, setHealth] = useState({ player: 100, monster: 100 });
  const [log, setLog] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // ✅ Start Game manually when clicking "Start"
  const startGame = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post("http://localhost:5000/api/game/start", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGameId(response.data._id);
      setGameStarted(true); // ✅ Set game as started
      setGameOver(false);
      setWinner(null);
      setHealth({ player: 100, monster: 100 });
      setLog([]);
      setTimeLeft(60);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  // ✅ Timer only runs **after** game starts
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, timeLeft, gameOver]); 

  // ✅ Handle Game Over Logic
  useEffect(() => {
    if (gameStarted && !gameOver && (health.player <= 0 || health.monster <= 0 || timeLeft === 0)) {
      const finalWinner = health.player > health.monster ? "Player Wins!" : "Covid Monster Wins!";
      setWinner(finalWinner);
      setGameOver(true);

      logAction(`🏆 Game Over! ${finalWinner}`);

      if (gameId) {
        updateGameInDB(gameId, log, finalWinner.toLowerCase());
      }
    }
  }, [health, timeLeft, gameStarted]); 

 const updateGameInDB = async (gameId, logs, result) => {
  try {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage
    if (!token) throw new Error("No authentication token found");

    await axios.put("http://localhost:5000/api/game/update", 
      {
        gameId,
        logs: logs.map(logEntry => ({
          timestamp: new Date(),  // ✅ Add timestamp
          action: "Game Event",    // ✅ Customize this as needed
          detail: logEntry,        // ✅ Store actual log message
        })),
        result,
      },         
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error saving game data:", error);
  }
};

  // const logAction = (text) => setLog((l) => [text, ...l.slice(0, 9)]);
  const logAction = (text) => setLog((existingLogs) => [text, ...existingLogs]);

  const attack = () => {
    if (!gameStarted || gameOver) return;
    const playerDmg = Math.floor(Math.random() * 10) + 1;
    const dragonDmg = Math.floor(Math.random() * 10) + 1;
    setHealth((h) => ({
      player: h.player - dragonDmg,
      monster: h.monster - playerDmg,
    }));
    logAction(`🐉 Dragon attacks Player for ${dragonDmg}`);
    logAction(`⚔️ Player strikes Dragon for ${playerDmg}`);
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
    logAction(`💥 Player **smashes** the Dragon with a power hit for ${playerDmg}!`);
  };

  const heal = () => {
    if (!gameStarted || gameOver) return;
    const healValue = Math.floor(Math.random() * 10) + 5;
    const infection = Math.floor(Math.random() * 10);
    setHealth((h) => ({
      player: Math.min(100, h.player + healValue - infection),
      monster: h.monster,
    }));
    logAction(`🩹 Player heals for ${healValue}, infected for ${infection}`);
  };

  const surrender = () => {
    if (!gameStarted || gameOver) return;
    setGameOver(true);
    setWinner("Covid Monster Wins!");
    logAction(`⚰️ Player surrendered.`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Covid Slayer: Battle Mode</h2>

      {gameStarted ? (
        gameOver ? (
          <h3 className="text-xl font-bold text-green-500">{winner}</h3>
        ) : (
          <div className="flex justify-between mb-4">
            <p>Player Health: {health.player}</p>
            <p>Monster Health: {health.monster}</p>
            <p>Time Left: {timeLeft}s</p>
          </div>
        )
      ) : (
        <button onClick={startGame} className="bg-green-500 hover:bg-green-700 px-6 py-2 rounded-md text-white transition">
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
    </div>
  );
}
