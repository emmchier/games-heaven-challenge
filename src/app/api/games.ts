const accessToken = process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN;
const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;

export async function fetchGames() {
  if (!accessToken || !clientId) {
    throw new Error(
      'Missing necessary environment variables: access token or client ID',
    );
  }

  try {
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      body: 'fields id, checksum, name, slug, url, cover, involved_companies, rating, total_rating, first_release_date, genres, summary, platforms, similar_games, screenshots;',
    });

    // Verificar que la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Esperar y convertir la respuesta a JSON
    const data = await response.json();

    // Si lo deseas, puedes hacer un console.log para ver los datos
    console.log('Fetched games:', data);

    return data; // Devolver los datos para que puedan ser utilizados en el componente
  } catch (err) {
    console.error('Error fetching games:', err);
    throw err; // Relanzar el error para manejarlo más arriba en la cadena de llamadas
  }
}
