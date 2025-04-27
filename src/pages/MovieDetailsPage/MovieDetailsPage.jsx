import { useState, useEffect, useRef, Suspense } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Outlet,
  Link,
} from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../../api";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocationRef = useRef(null);

  useEffect(() => {
    if (location.state?.from?.pathname) {
      previousLocationRef.current = location.state.from.pathname;
    }
  }, [location.state]);

  useEffect(() => {
    if (movie && movie.id === parseInt(movieId)) return;

    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    loadMovie();
  }, [movieId, movie]);

  const handleGoBack = () => {
    const from = previousLocationRef.current || "/";
    navigate(from);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backLink}>
        Go back
      </button>
      <div className={styles.movieInfo}>
        <img
          src={
            getImageUrl(movie.poster_path) ||
            "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className={styles.image}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link
              to="cast"
              className={styles.link}
              onClick={() => console.log("Navigating to Cast")}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              className={styles.link}
              onClick={() => console.log("Navigating to Reviews")}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div style={{ display: "none" }} />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
