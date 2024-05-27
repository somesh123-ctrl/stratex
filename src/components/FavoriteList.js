import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/moviesSlice";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

const FavoriteList = () => {
  const favorites = useSelector((state) => state.movies.favorites);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return <div className="p-4">No favorite movies yet.</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {favorites.map((movie) => (
        <a
          key={movie.id}
          href={movie.imdb_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white shadow-md rounded p-4 no-underline"
        >
          <img
            src="https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_QL75_UX820_.jpg"
            alt={movie.movie}
            className="w-full h-48 object-cover rounded"
          />
          <div className="mt-2">
            <h3 className="text-lg font-bold">{movie.movie}</h3>
            <p>Rating: {movie.rating}</p>
            <div className="flex items-center">
              <StarSolid
                className="w-6 h-6 text-yellow-500 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleFavorite(movie));
                }}
              />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default FavoriteList;
