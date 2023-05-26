// This file should set up the express server as shown in the lecture code
import { bandDataFunctions } from "./data/bands.js";
import { albumDataFunctions } from "./data/albums.js";

import express from "express";
const app = express();
app.use(express.json());
import configRoutes from "./routes/index.js";

let beatles_id = "";
let pinkfloyd_id = "";
let linkinPark_id = "";
let album_id = "";
async function main() {
  try {
    const beatles = await bandDataFunctions.create(
      "The Beatles",
      ["Rock", "Pop", "Psychedelia"],
      "http://www.thebeatles.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      1960
    );
    beatles_id = beatles._id;
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.get(beatles_id);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const pinkFloyd = await bandDataFunctions.create(
      "Pink Floyd",
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "http://www.pinkfloyd.com",
      "EMI",
      [
        "Roger Waters",
        "David Gilmour",
        "Nick Mason",
        "Richard Wright",
        "Sid Barrett",
      ],
      1965
    );
    pinkfloyd_id = pinkFloyd._id;
  } catch (error) {
    console.log(error);
  }
  try {
    const allBands = await bandDataFunctions.getAll();
    console.log(allBands);
  } catch (error) {
    console.log(error);
  }
  try {
    const linkinPark = await bandDataFunctions.create(
      "Linkin Park",
      ["Alternative Rock", "Pop Rock", "Alternative Metal"],
      "http://www.linkinpark.com",
      "Warner",
      [
        "Chester Bennington",
        "Rob Bourdon",
        "Brad Delson",
        "Mike Shinoda",
        "Dave Farrell",
        "Joe Hahn",
      ],
      1996
    );
    linkinPark_id = linkinPark._id;
  } catch (error) {
    console.log(error);
  }
  try {
    const linkinPark = await bandDataFunctions.get(linkinPark_id);
    console.log(linkinPark);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.get(beatles_id);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await bandDataFunctions.remove(pinkfloyd_id));
  } catch (error) {
    console.log(error);
  }
  try {
    const allBands = await bandDataFunctions.getAll();
    console.log(allBands);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.create(
      "The Beatles",
      ["Rock", "Pop", "Psychedelia"],
      "http://beat.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      2023
    );
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.create(
      "The Beatles",
      ["Rock", "Pop", "Psychedelia"],
      "http://www.beatles.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      2024
    );
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.create(
      223,
      ["Rock", "Pop", "Psychedelia"],
      "http://beat.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      2023
    );
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.create(
      "The Beatles",
      "Rock",
      "http://beat.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      2023
    );
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.create(
      "The Beatles",
      ["Rock", "Pop", "Psychedelia"],
      "http://beat.com",
      "",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      2023
    );
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.get("hey pops");
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.get(507799439012);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await bandDataFunctions.get("507f1f77bcf86cd799439012");
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await bandDataFunctions.remove("507f1f77bcf86cd799439012"));
  } catch (error) {
    console.log(error);
  }
  try {
    const metallica = await bandDataFunctions.create(
      "Metallica",
      ["Rock", "Metal"],
      "http://www.metallica.com",
      "Blackened Recordings",
      ["James Hetfield", "Kirk Hammett", "Lars Ulrich", "            "],
      1981
    );
    console.log(metallica);
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(
      await bandDataFunctions.update(
        linkinPark_id,
        "Purple Floyd",
        ["Rock", "Pop", "Psychedelia"],
        "http://www.purplefloyd.com",
        "EML",
        [
          "Roger Sands",
          "Dev Gilmour",
          "Nick Carpenter",
          "Richard Wrong",
          "Sid Burette",
        ],
        1985
      )
    );
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(
      await albumDataFunctions.create(
        linkinPark_id,
        "Wish You Were Here",
        "09/12/1975",
        [
          "Shine On You Crazy Diamond, Pts. 1-5",
          "Welcome to the Machine",
          "Have a Cigar (Ft. Roy Harper)",
          "Wish You Were Here",
          "Shine On You Crazy Diamond, Pts. 6-9",
        ],
        5
      )
    );
  } catch (error) {
    console.log(error);
  }
  try {
    const link_create = await albumDataFunctions.create(
      linkinPark_id,
      "Wish You Were Here - 2",
      "09/12/1975",
      [
        "Shine On You Crazy Diamond, Pts. 1-5",
        "Welcome to the Machine",
        "Have a Cigar (Ft. Roy Harper)",
        "Wish You Were Here",
        "Shine On You Crazy Diamond, Pts. 6-9",
      ],
      4.5
    );
    console.log(link_create);
    album_id = link_create.albums[0]._id.toString();
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await bandDataFunctions.get(linkinPark_id));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await albumDataFunctions.getAll(linkinPark_id));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await albumDataFunctions.get(album_id));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await albumDataFunctions.remove(album_id));
  } catch (error) {
    console.log(error);
  }

  configRoutes(app);
  app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  });
}

main();
