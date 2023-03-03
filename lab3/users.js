//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json
import { getUsers, getMovies } from "./helpers.js";

const getUserById = async (id) => {
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
  const user = await getUsers();
  const foundUser = user.find((user) => user.id === id);
  if (!foundUser || typeof foundUser === "undefined") {
    throw "Error: User not found";
  }

  return foundUser;
};

const sameGenre = async (genre) => {
  if (!genre || genre.length === 0) {
    throw "Error: Please pass some value - input cannot be empty";
  }
  if (typeof genre !== "string" || genre === undefined) {
    throw "Error: Invalid genre parameter ";
  }
  if (genre.trim().length === 0) {
    throw "Error: Just an empty string with spaces";
  }
  genre = genre.trim().toLowerCase();
  const fetchAllUsers = await getUsers();
  const matchingUsers = fetchAllUsers.filter(
    (matchedUser) => matchedUser.favorite_genre.toLowerCase() === genre
  );
  if (matchingUsers.length < 2) {
    throw "Error: Not enough users to match; Need at least two users";
  }
  matchingUsers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1));
  return matchingUsers
    .slice(0, 50)
    .map((sortedUsers) => `${sortedUsers.first_name} ${sortedUsers.last_name}`);
};

const moviesReviewed = async (id) => {
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
  const fetchAllUsers = await getUsers();
  const fetchMovies = await getMovies();
  const user = fetchAllUsers.find((u) => u.id === id);
  if (!user) {
    throw "Error: User not found";
  }
  const username = user.username;
  const reviewedMovies = fetchMovies.filter((m) =>
    m.reviews.some((r) => r.username === username)
  );
  const arrayOfMovies = reviewedMovies.map((m) => {
    const review = m.reviews.find((r) => r.username === username);
    return {
      [m.title]: { username, rating: review.rating, review: review.review },
    };
  });
  return arrayOfMovies;
};

const referMovies = async (id) => {
  if (!id || id.length === 0) {
    throw "Error: Please pass some value - input cannot be empty";
  }
  if (typeof id !== "string" || id.trim().length === 0) {
    throw "Error: Invalid ID parameter ";
  }
  if (id.trim().length === 0) {
    throw "Error: Just an empty string with spaces";
  }
  id = id.trim();
  const fetchAllUsers = await getUsers();
  const fetchMovies = await getMovies();
  const user = fetchAllUsers.find((u) => u.id === id);
  if (!user) {
    throw "Error: User not found";
  }
  const favoriteGenre = user.favorite_genre;
  const reviewedMovies = user.reviews ? user.reviews.map((r) => r.title) : [];
  const recommendedMovies = fetchMovies
    .filter((m) => {
      const genres = m.genre.split("|");
      return (
        genres.includes(favoriteGenre) ||
        genres.some((g) => g.startsWith(favoriteGenre + "|"))
      );
    })
    .filter((m) => !reviewedMovies.includes(m.title))
    .map((m) => m.title);

  return recommendedMovies;
};

export { getUserById, sameGenre, moviesReviewed, referMovies };
