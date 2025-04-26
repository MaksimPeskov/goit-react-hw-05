import { useState, useEffect } from "react";
import { searchMovies } from "../../Api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      try {
        const moviesData = await searchMovies(searchQuery);
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    setSearchQuery(query);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          className={styles.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
