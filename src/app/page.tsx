// app/page.tsx (o el archivo correspondiente)

import { Game } from '@/interfaces/games';
import { fetchGames } from './api/games'; // Asumiendo que tienes una función fetchGames en api

export default async function Page() {
  const games: Game[] = await fetchGames();

  return (
    <div>
      <h2>Saved games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div key={game.checksum} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{game.name}</h2>
            <p>{game.cover}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
