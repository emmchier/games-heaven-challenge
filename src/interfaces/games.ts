export interface Game {
  id: number; // Home
  checksum: string; // Home
  name: string; // Home
  slug: string; // Home
  url: string;
  cover: number; // Home
  involved_companies: number[]; // Detail
  rating: number | null; // Detail
  total_rating?: number | null;
  first_release_date: number | null; // Detail
  genres: number[]; // Detail
  summary: string; // Detail
  platforms: number[]; // Detail
  similar_games: number[]; // Detail
  screenshots: number[]; // Detail
}
