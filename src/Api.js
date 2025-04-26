import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjI3MzhhMTg5MTI2NTk2NGU1ZmRjMjIyNjY4YjE4YyIsIm5iZiI6MTc0NTY3MTU3OS4zMzMsInN1YiI6IjY4MGNkNTliODA3N2QyNTgwMTM3YTVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w90YkBXg3Z7kiJ-RDMzuQ4ezelGYw4lgNwtvJPUXUqg";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return response.data.results;
};

export const getImageUrl = (path) => (path ? `${IMAGE_BASE_URL}${path}` : null);
