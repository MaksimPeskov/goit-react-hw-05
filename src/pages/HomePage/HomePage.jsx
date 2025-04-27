import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const moviesData = await fetchTrendingMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    loadTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
