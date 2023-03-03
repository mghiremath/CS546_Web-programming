//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import { getMovies } from "./helpers.js";

const findMoviesByDirector = async (directorName) => {
  if (!directorName || directorName.length === 0) {
    throw "Error: The directorName parameter cannot be an empty string";
  }
  if (typeof directorName !== "string") {
    throw "Error: The directorName parameter must be a string";
  }
  if (directorName.trim().length === 0) {
    throw "Error: Just an empty string with spaces";
  }
  directorName = directorName.trim();
  const fetchAllMovies = await getMovies();

  const moviesByDirector = fetchAllMovies.filter(
    (movie) => movie.director === directorName
  );
  if (moviesByDirector.length === 0) {
    throw `Error: No movies found for the director "${directorName}"`;
  }
  return moviesByDirector;
};

const findMoviesByCastMember = async (castMemberName) => {
  if (!castMemberName || castMemberName.length === 0) {
    throw "Error: The castMemberName parameter cannot be an empty string";
  }
  if (typeof castMemberName !== "string") {
    throw "Error: The castMemberName parameter must be a string";
  }
  if (castMemberName.trim().length === 0) {
    throw "Error: Just an empty string with spaces";
  }
  castMemberName = castMemberName.trim();
  const fetchAllMovies = await getMovies();

  const moviesByCastMember = fetchAllMovies.filter((movie) =>
    movie.cast.includes(castMemberName)
  );
  if (moviesByCastMember.length === 0) {
    throw `Error: No movies found for the cast "${castMemberName}"`;
  }
  return moviesByCastMember;
};

const getOverallRating = async (title) => {
  if (!title || title.length === 0) {
    throw "Error: The title parameter cannot be an empty string";
  }
  if (typeof title !== "string") {
    throw "Error: The title parameter must be a string";
  }
  if (title.trim().length === 0) {
    throw "Error: Just an empty string with spaces";
  }
  title = title.trim();
  const fetchAllMovies = await getMovies();
  const movie = fetchAllMovies.find((movie) => movie.title === title);
  if (!movie) {
    throw `Error: No movie found with the title "${title}"`;
  }

  if (!movie.reviews || movie.reviews.length === 0) {
    return 0;
  }

  const totalRatings = movie.reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  const overallRating = totalRatings / movie.reviews.length;
  return Math.floor(overallRating * 10) / 10;
};

const getMovieById = async (id) => {
  if (typeof id !== "string" || id.length === 0) {
    throw "Error: Please pass some value - input cannot be empty";
  }
  if (!id || id === undefined) {
    throw "Error: Invalid id parameter ";
  }
  if (id.trim().length === 0) {
    throw "Error: Just an empty string with spaces";
  }
  id = id.trim();
  const fetchAllMovies = await getMovies();
  const movie = fetchAllMovies.find((movie) => movie.id === id);
  if (!movie) {
    throw "Error: Movie not found";
  }
  return movie;
};

export {
  findMoviesByDirector,
  findMoviesByCastMember,
  getOverallRating,
  getMovieById,
};
