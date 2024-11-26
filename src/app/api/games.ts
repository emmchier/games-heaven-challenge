const accessToken = process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN;
const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const baseURL = 'https://api.igdb.com/v4/games';

// Get game list
export async function fetchGames() {
  if (!accessToken || !clientId) {
    throw new Error(
      'Missing necessary environment variables: access token or client ID',
    );
  }

  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      body: 'fields checksum, name, slug, url, cover.url;',
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

// Get game by slug
export async function fetchGameDetails(slug: string) {
  if (!accessToken || !clientId) {
    throw new Error(
      'Missing necessary environment variables: access token or client ID',
    );
  }

  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      body: `fields id, name, summary, platforms, screenshots.url, similar_games, cover.url, first_release_date, url; where slug = "${slug}";`,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Verificar que haya resultados
    if (data.length === 0) {
      return null;
    }

    return data[0]; // Retornar el primer (y único) resultado
  } catch (err) {
    console.error('Error fetching game details:', err);
    throw err;
  }
}
