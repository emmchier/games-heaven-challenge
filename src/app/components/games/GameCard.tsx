'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/interfaces/games';
import { getImageUrl } from '@/utils/funtions';
import { Trash2 } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Button, Tooltip } from '@/app/components';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const { openSnackbar } = useUIStore();
  const coverUrl = getImageUrl(game.cover?.url, 'cover_big');

  const handleClick = () => {
    openSnackbar({
      description: `${game.name} has been removed from your collection`,
      timer: 3,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg relative">
      <Tooltip content={game.name} direction="top" size="sm" openBy="hover">
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
        </Link>
      </Tooltip>
      <Tooltip
        content={`Delete ${game.name}`}
        direction="top"
        size="sm"
        openBy="hover"
        className="absolute"
      >
        <Button
          ariaLabel={`Delete ${game.name}`}
          onClick={handleClick}
          iconButton={<Trash2 size={20} />}
        />
      </Tooltip>
    </div>
  );
};
