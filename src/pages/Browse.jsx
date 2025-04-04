// src/pages/Browse.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { searchAnime } from '../utils/api';

function Browse() {
  const [searchParams] = useSearchParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: searchParams.get('genre') || '',
    season: searchParams.get('season') || '',
    year: searchParams.get('year') || '',
    sort: searchParams.get('sort') || 'popular',
  });

  useEffect(() => {
    const loadAnime = async () => {
      setLoading(true);
      try {
        const results = await searchAnime(filters);
        setAnimeList(results);
      } catch (error) {
        console.error('Failed to load anime:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [filters]);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
  ];

  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
  const years = Array.from({ length: 24 }, (_, i) => 2024 - i);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
            className="bg-gray-700 text-white rounded-md p-2"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>

          <select
            value={filters.season}
            onChange={(e) => setFilters({ ...filters, season: e.target.value })}
            className="bg-gray-700 text-white rounded-md p-2"
          >
            <option value="">All Seasons</option>
            {seasons.map((season) => (
              <option key={season} value={season.toLowerCase()}>
                {season}
              </option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="bg-gray-700 text-white rounded-md p-2"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="bg-gray-700 text-white rounded-md p-2"
          >
            <option value="popular">Popular</option>
            <option value="recent">Recently Added</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;