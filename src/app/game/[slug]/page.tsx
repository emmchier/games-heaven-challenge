import { Suspense } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import GameDetailsContent from './GameDetailsContent';
import { notFound } from 'next/navigation';

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  if (!slug) {
    notFound();
  }

  return (
    <div className="p-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <GameDetailsContent slug={slug} />
      </Suspense>
    </div>
  );
}
