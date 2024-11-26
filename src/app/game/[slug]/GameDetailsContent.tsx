import { fetchGameDetails } from '@/app/api/games';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getImageUrl } from '@/utils/funtions';

export default async function GameDetailsContent({ slug }: { slug: string }) {
  const game = await fetchGameDetails(slug);
  const coverUrl = getImageUrl(game.cover?.url, 'cover_big');

  if (!game) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{game.name}</h1>
      {coverUrl ? (
        <div className="relative">
          <Image
            src={coverUrl}
            alt={`${game.name} cover`}
            width={300}
            height={400}
            sizes="(max-width: 768px) 100vw, 300px" // Optimiza para diferentes pantallas
            priority
          />
        </div>
      ) : (
        <p>No cover image available</p> // Mensaje alternativo si no hay imagen
      )}
      <p className="mt-4 text-lg">{game.summary || 'No summary available'}</p>
      <p className="mt-4">
        <strong>Release Date:</strong>{' '}
        {game.first_release_date
          ? new Date(game.first_release_date * 1000).toLocaleDateString()
          : 'Unknown'}
      </p>
      <a
        href={game.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        View on IGDB
      </a>
    </div>
  );
}
