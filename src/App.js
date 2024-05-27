import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovies } from "./redux/moviesSlice";
import MovieList from "./components/MovieList";
import FavoriteList from "./components/FavoriteList";
import "./App.css";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <Link className="mr-4" to="/">
            Movies
          </Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<MovieList />} />
          <Route path="/favorites" element={<FavoriteList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
