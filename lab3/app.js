/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

import {
  getUserById,
  sameGenre,
  moviesReviewed,
  referMovies,
} from "./users.js";

import {
  findMoviesByDirector,
  findMoviesByCastMember,
  getOverallRating,
  getMovieById,
} from "./movies.js";

async function main() {
  try {
    const user = await getUserById("48fded55-37cd-4e6b-8f19-e78b481a14a4");
    console.log(user);
  } catch (error) {
    console.error(error);
  }
  try {
    const user = await getUserById(
      "   48fded55-37cd-4e6b-8f19-e78b481a14a4   "
    );
    console.log(user);
  } catch (error) {
    console.error(error);
  }

  try {
    const user = await getUserById(-1);
    console.log(user);
  } catch (error) {
    console.error(error);
  }

  try {
    const user = await getUserById(1001);
    console.log(user);
  } catch (error) {
    console.error(error);
  }

  try {
    const user = await getUserById();
    console.log(user);
  } catch (error) {
    console.error(error);
  }
  try {
    const user = await getUserById("    ");
    console.log(user);
  } catch (error) {
    console.error(error);
  }

  try {
    const user = await getUserById("7989fa5e-5617-43f7-a931-46036f9dbcff");
    console.log(user);
  } catch (error) {
    console.error(error);
  }

  try {
    console.log(await sameGenre("Action"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await sameGenre());
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await sameGenre("IMAX"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await sameGenre(123));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await sameGenre(["Action"]));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await sameGenre(true));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await moviesReviewed("64035fad-a5b7-48c9-9317-3e31e22fe26c"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await moviesReviewed(-1));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await moviesReviewed(1001));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await moviesReviewed());
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await moviesReviewed("7989fa5e-5617-43f7-a931-46036f9dbcff"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await referMovies("5060fc9e-10c7-4f38-9f3d-47b7f477568b"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await referMovies(-1));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await referMovies("       "));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await referMovies());
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await referMovies("7989fa5e-5617-43f7-a931-46036f9dbcff"));
  } catch (error) {
    console.log(error);
  }

  console.dir(await findMoviesByDirector("Fernando Dollimore"), {
    depth: null,
  });
  try {
    console.log(await findMoviesByDirector(-1));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await findMoviesByDirector("       "));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await findMoviesByDirector());
  } catch (error) {
    console.log(error);
  }
  try {
    console.dir(await findMoviesByCastMember("Huberto Snoddon"), {
      depth: null,
    });
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(
      await getOverallRating("Asterix and the Vikings (Astérix et les Vikings)")
    );
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await getOverallRating(43));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await getOverallRating(" "));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await getOverallRating("Mamma Mia"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await getOverallRating());
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await getMovieById("38fd6885-0271-4650-8afd-6d09f3a890a2"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await getMovieById(-1));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await getMovieById(1001));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await getMovieById());
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await getMovieById("7989fa5e-5617-43f7-a931-46036f9dbcff"));
  } catch (error) {
    console.log(error);
  }
}
//call main
main();
