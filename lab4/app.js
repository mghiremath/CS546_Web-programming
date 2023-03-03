/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/
import { create, getAll, get, remove, rename } from "./data/bands.js";

console.log("************** Requirement code **************");
let beatles_id = "";
let pinkfloyd_id = "";
let linkinPark_id = "";
async function main() {
  try {
    const beatles = await create(
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
    const beatles = await get(beatles_id);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const pinkFloyd = await create(
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
    const allBands = await getAll();
    console.log(allBands);
  } catch (error) {
    console.log(error);
  }
  try {
    const linkinPark = await create(
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
    const linkinPark = await get(linkinPark_id);
    console.log(linkinPark);
  } catch (error) {
    console.log(error);
  }
  try {
    await rename(beatles_id.toString(), "Hey Jude people");
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await get(beatles_id);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await remove(pinkfloyd_id));
  } catch (error) {
    console.log(error);
  }
  try {
    const allBands = await getAll();
    console.log(allBands);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await create(
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
    const beatles = await create(
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
    const beatles = await create(
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
    const beatles = await create(
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
    const beatles = await create(
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
    const beatles = await get("hey pops");
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await get(507799439012);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await get("507f1f77bcf86cd799439012");
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await remove("507f1f77bcf86cd799439012"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await rename("507f1f77bcf86cd799439012", "Hey Jude people"));
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await rename(linkinPark_id, "Linkin Park"));
  } catch (error) {
    console.log(error);
  }

  console.log("************** Test code **************"); //Testing code

  try {
    const beatles = await create(
      "The Beatles",
      ["Rock", "Pop", "Psychedelia"],
      "http://www.thebeatles.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      1960
    );
    beatles_id = beatles._id;
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await get(beatles_id);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }
  try {
    const pinkFloyd = await create(
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
    console.log(pinkFloyd);
  } catch (error) {
    console.log(error);
  }
  try {
    const allBands = await getAll();
    console.log(allBands);
  } catch (error) {
    console.log(error);
  }
  try {
    const linkinPark = await create(
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
    console.log(linkinPark);
  } catch (error) {
    console.log(error);
  }
  try {
    const linkinPark = await get(linkinPark_id);
    console.log(linkinPark);
  } catch (error) {
    console.log(error);
  }
  try {
    console.log(await rename(beatles_id, "Hey Jude people"));
  } catch (error) {
    console.log(error);
  }
  try {
    const beatles = await get(beatles_id);
    console.log(beatles);
  } catch (error) {
    console.log(error);
  }

  try {
    console.log(await remove(pinkfloyd_id));
  } catch (error) {
    console.log(error);
  }
  try {
    const pinkFloyd = await create(
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
    console.log(pinkFloyd);
  } catch (error) {
    console.log(error);
  }
  try {
    const allBands = await getAll();
    console.log(allBands);
  } catch (error) {
    console.log(error);
  }
}

main();
