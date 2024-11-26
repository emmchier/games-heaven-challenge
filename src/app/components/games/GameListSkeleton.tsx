export const GameListSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/4 mb-2"></div>
    </div>
  );
};
