import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits, getImageUrl } from "../../Api";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const loadCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };
    loadCast();
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.item}>
          <img
            src={
              getImageUrl(actor.profile_path) ||
              "https://via.placeholder.com/150x200?text=No+Image"
            }
            alt={actor.name}
            className={styles.image}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
