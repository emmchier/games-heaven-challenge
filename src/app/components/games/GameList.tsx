import { Suspense } from 'react';
import { Game } from '@/interfaces/games';

import { GameCard, GameListSkeleton } from '@/app/components';

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Games List</h1>
      <Suspense fallback={<GameListSkeleton />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {games.length === 0 ? (
            <p>No games available</p>
          ) : (
            games.map((game) => <GameCard key={game.slug} game={game} />)
          )}
        </div>
      </Suspense>
    </div>
  );
};
