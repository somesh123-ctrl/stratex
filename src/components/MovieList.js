import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, toggleFavorite } from "../redux/moviesSlice";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status, favorites } = useSelector((state) => state.movies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const isFavorite = (movie) => favorites.some((fav) => fav.id === movie.id);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading movies</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .map((movie) => (
          <a
            key={movie.id}
            href={movie.imdb_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded p-4 no-underline"
          >
            <img
              src="https://c8.alamy.com/comp/PPT4NB/movie-word-written-on-wood-block-movie-text-on-table-concept-PPT4NB.jpg"
              alt={movie.movie}
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-2">
              <h3 className="text-lg font-bold">{movie.movie}</h3>
              <p>Rating: {movie.rating}</p>
              <div className="flex items-center">
                {isFavorite(movie) ? (
                  <StarSolid
                    className="w-6 h-6 text-yellow-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(toggleFavorite(movie));
                    }}
                  />
                ) : (
                  <StarOutline
                    className="w-6 h-6 text-yellow-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(toggleFavorite(movie));
                    }}
                  />
                )}
              </div>
            </div>
          </a>
        ))}
    </div>
  );
};

export default MovieList;
