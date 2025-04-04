// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import { getFeaturedAnime } from '../utils/api';

function Home() {
  const [featuredAnime, setFeaturedAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const [featured, trending] = await Promise.all([
          getFeaturedAnime({ type: 'featured' }),
          getFeaturedAnime({ type: 'trending' }),
        ]);
        setFeaturedAnime(featured);
        setTrendingAnime(trending);
      } catch (error) {
        console.error('Failed to load anime:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Anime</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;