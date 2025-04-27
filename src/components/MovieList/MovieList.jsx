import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../../api";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.link}
          >
            <img
              src={
                getImageUrl(movie.poster_path) ||
                "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
              className={styles.image}
            />
            <h3>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
