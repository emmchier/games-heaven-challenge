import { fetchGames } from '@/app/api/games';

import { notFound } from 'next/navigation';
import { HomeClientPage } from './components/client-pages/HomeClientPage';

export default async function HomePage() {
  const games = await fetchGames();

  if (!games) {
    notFound();
  }

  return <HomeClientPage games={games} />;
}
