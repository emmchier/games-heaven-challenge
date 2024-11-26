import { Game } from '@/interfaces/games';
import { getImageUrl } from '@/utils/funtions';
import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const coverUrl = getImageUrl(game.cover?.url, 'cover_small');

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Link href={`/game/${game.slug}`} passHref>
        <div className="relative">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={game.name}
              width={300}
              height={400}
              className="rounded-md"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          ) : (
            <div className="h-64 bg-gray-300 rounded-md flex items-center justify-center">
              <span className="text-gray-600">No cover available</span>
            </div>
          )}
        </div>
        <h2 className="mt-4 text-xl font-semibold">{game.name}</h2>
      </Link>
    </div>
  );
};
