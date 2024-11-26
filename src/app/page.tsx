import { fetchGames } from '@/app/api/games';

import { GameList } from './components';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  const games = await fetchGames();

  if (!games) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Saved games</h1>
      <GameList games={games} />
    </div>
  );
}
