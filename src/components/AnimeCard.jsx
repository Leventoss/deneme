// src/components/AnimeCard.jsx
import { Link } from 'react-router-dom';

function AnimeCard({ anime }) {
  return (
    <Link to={`/watch/${anime.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="aspect-w-2 aspect-h-3">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-lg font-semibold line-clamp-2">
            {anime.title}
          </h3>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-sm text-gray-300">{anime.episodes} Episodes</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-300">{anime.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;