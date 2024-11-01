import React from 'react';
import { Game } from '../types';

interface GameSelectorProps {
  onSelectGame: (game: Game) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onSelectGame }) => {
  const availableGames: Game[] = [
    {
      id: 2,
      title: "Real Madrid vs Barcelona",
      league: "La Liga",
      status: "LIVE",
      minute: "65'",
      score: "1 - 1",
      streamUrl: "https://example.com/stream2"
    },
    {
      id: 3,
      title: "Bayern Munich vs Dortmund",
      league: "Bundesliga",
      status: "LIVE",
      minute: "43'",
      score: "3 - 2",
      streamUrl: "https://example.com/stream3"
    },
    {
      id: 4,
      title: "PSG vs Marseille",
      league: "Ligue 1",
      status: "LIVE",
      minute: "12'",
      score: "0 - 0",
      streamUrl: "https://example.com/stream4"
    }
  ];

  return (
    <dialog id="game-selector" className="bg-gray-800 text-white rounded-lg p-0 backdrop:bg-black/50">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Available Live Games</h2>
        <div className="space-y-4">
          {availableGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => {
                onSelectGame(game);
                document.getElementById('game-selector')?.close();
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{game.title}</h3>
                <span className="text-red-500 text-sm font-semibold flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <span>{game.league}</span>
                <span>{game.minute}</span>
                <span className="text-white font-semibold">{game.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form method="dialog" className="border-t border-gray-700 p-4 flex justify-end">
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          Close
        </button>
      </form>
    </dialog>
  );
};

export default GameSelector;