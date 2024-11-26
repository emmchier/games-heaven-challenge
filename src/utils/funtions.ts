// get images by size and hash
export function getImageUrl(url: string | undefined, size: string) {
  if (!url) return null;
  const hash = url.split('/').pop();
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}`;
}
