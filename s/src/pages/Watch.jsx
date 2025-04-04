// src/pages/Watch.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { sampleAnime } from '../data/sampleAnime';
import useAuth from '../hooks/useAuth';

function Watch() {
  const { id } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // For demo, we're using the sample anime
    setCurrentEpisode(sampleAnime.episodes[0]);
  }, [id]);

  if (!currentEpisode) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="aspect-w-16 aspect-h-9">
        <VideoPlayer
          sources={currentEpisode.sources}
          thumbnail={currentEpisode.thumbnail}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-white">
            {sampleAnime.title} - Episode {currentEpisode.number}
          </h1>
          <h2 className="text-xl text-gray-300">{currentEpisode.title}</h2>
          <p className="text-gray-300">{sampleAnime.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {sampleAnime.genre.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Episodes</h3>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {sampleAnime.episodes.map((episode) => (
              <button
                key={episode.id}
                onClick={() => setCurrentEpisode(episode)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentEpisode.id === episode.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="font-medium">Episode {episode.number}</div>
                <div className="text-sm text-gray-400">{episode.title}</div>
                <div className="text-xs text-gray-500">{episode.duration}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;