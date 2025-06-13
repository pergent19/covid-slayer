import React, { useEffect, useState } from 'react';
import { getGame } from '../services/gameService';
import moment from 'moment';

const Dashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10); // ⏳ Start with 10

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGame(token);
        setGames(data.data);
      } catch (err) {
        console.error('Failed to fetch games:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [token]);

  if (loading) return <p className="text-center">Loading...</p>;

  const displayedGames = games.slice(0, visibleCount);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Game Transactions</h1>
      {games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">Start Time</th>
                <th className="py-2 px-4 border-b text-left">End Time</th>
                <th className="py-2 px-4 border-b text-left">Result</th>
              </tr>
            </thead>
            <tbody>
              {displayedGames.map((game, index) => (
                <tr key={game._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {moment(game.startTime).format('LLL')}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {game.endTime ? moment(game.endTime).format('LLL') : 'In Progress'}
                  </td>
                  <td className="py-2 px-4 border-b">{game.result || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCount < games.length && (
            <div className="text-center mt-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                View More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
