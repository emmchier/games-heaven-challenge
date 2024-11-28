import axios from 'axios';

const accessToken = process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN;
const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const baseURL = 'https://api.igdb.com/v4/games';

const currentTimestamp = Math.floor(Date.now() / 1000);

export const fetchGames = async () => {
  if (!accessToken || !clientId) {
    throw new Error(
      'Missing necessary environment variables: access token or client ID',
    );
  }

  try {
    const response = await axios.post(
      baseURL,
      `
      fields checksum, name, slug, url, cover.url, first_release_date; 
      sort first_release_date desc; 
      where first_release_date <= ${currentTimestamp}; 
      limit 10;
      `,
      {
        headers: {
          'Client-ID': clientId || '',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error al buscar juegos:', error);
    return [];
  }
};

// Get game by slug
export const fetchGameDetails = async (slug: string) => {
  if (!accessToken || !clientId) {
    throw new Error(
      'Missing necessary environment variables: access token or client ID',
    );
  }

  try {
    const response = await axios.post(
      baseURL,
      `fields id, name, summary, platforms, screenshots.url, similar_games, cover.url, first_release_date, url; where slug = "${slug}";`,
      {
        headers: {
          'Client-ID': clientId || '',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data[0];
  } catch (error) {
    console.error('Error al buscar juegos:', error);
    return [];
  }
};
