'use client';

import { Suspense } from 'react';
import { Game } from '@/interfaces/games';

import { GameCard, GameListSkeleton, Tab } from '@/app/components';

interface GameListProps {
  games: Game[];
}

const tabList = [
  { label: 'Last added' },
  { label: 'Newest' },
  { label: 'Oldest' },
];

export const GameList = ({ games }: GameListProps) => {
  const handleTabChange = (index: number) => {
    console.log('Tab changed to:', tabList[index].label);
  };

  return (
    <div className="p-8">
      <Tab tabList={tabList} onTabChange={handleTabChange} />
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
