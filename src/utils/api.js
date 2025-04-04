// src/utils/api.js
const API_BASE_URL = 'https://api.animecore.com/v1';

export async function getFeaturedAnime({ type = 'featured', limit = 10 } = {}) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/anime/${type}?limit=${limit}`
    );
    if (!response.ok) throw new Error('Failed to fetch featured anime');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function searchAnime(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  try {
    const response = await fetch(
      `${API_BASE_URL}/anime/search?${params.toString()}`
    );
    if (!response.ok) throw new Error('Failed to search anime');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function getAnimeDetails(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/anime/${id}`);
    if (!response.ok) throw new Error('Failed to fetch anime details');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

export async function getEpisodes(animeId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/anime/${animeId}/episodes`
    );
    if (!response.ok) throw new Error('Failed to fetch episodes');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}