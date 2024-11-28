'use client';

import { Game } from '@/interfaces/games';
import { GameList } from '@/app/components';
import { useEffect } from 'react';
import { useGameStore } from '@/store/game-store';

interface HomeClientPageProps {
  games: Game[];
}

export const HomeClientPage = ({ games }: HomeClientPageProps) => {
  useEffect(() => {
    const setSearchResults = useGameStore.getState().setSearchResults;
    setSearchResults(games);
  }, [games]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Saved games</h1>
      <GameList games={games} />
    </div>
  );
};
