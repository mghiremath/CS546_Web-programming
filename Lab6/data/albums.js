import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const create = async (bandId, title, releaseDate, tracks, rating) => {
  if (
    !bandId ||
    !title ||
    !releaseDate ||
    !tracks ||
    typeof rating === "undefined"
  ) {
    throw "Error: Provide all of the input parameters";
  }

  if (
    typeof bandId !== "string" ||
    typeof title !== "string" ||
    typeof releaseDate !== "string"
  ) {
    throw "Error: Inputs bandId, title, and releaseDate must be valid strings";
  }

  if (
    !Array.isArray(tracks) ||
    tracks.length < 3 ||
    !tracks.every((track) => typeof track === "string" && track.trim())
  ) {
    throw "Error: Tracks must be an array with at least 3 valid strings";
  }

  if (!ObjectId.isValid(bandId)) {
    throw "Error: Invalid bandId";
  }

  if (!Date.parse(releaseDate)) {
    throw "Error: Invalid releaseDate";
  }

  const releaseYear = new Date(releaseDate).getFullYear();
  if (releaseYear < 1900 || releaseYear > new Date().getFullYear() + 1) {
    throw "Error: Release year must be between 1900 and the current year + one year";
  }

  if (
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5 ||
    Math.round(rating * 10) / 10 !== rating
  ) {
    throw "Error: Rating must be a number between 1 and 5 with one decimal place";
  }

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(bandId) });

  if (!band) {
    throw "Error: Band not found";
  }
  const albumExists = band.albums.some(
    (album) => album.title.toLowerCase() === title.toLowerCase()
  );

  if (albumExists) {
    throw "Error: Album title already exists for this band";
  }
  const newAlbum = {
    _id: new ObjectId(),
    title: title.trim(),
    releaseDate: releaseDate.trim(),
    tracks: tracks.map((track) => track.trim()),
    rating: rating,
  };
  tracks.forEach((element) => {
    if (element.trim() === "") {
      throw "Error: Tracks must be arrays with at least one valid string";
    }
  });
  const currentRating = band.overallRating;
  const numberOfAlbums = band.albums.length;

  const newOverallRating =
    Math.round(
      ((currentRating * numberOfAlbums + rating) / (numberOfAlbums + 1)) * 10
    ) / 10;

  const updateResult = await bandCollection.updateOne(
    { _id: new ObjectId(bandId) },
    {
      $push: { albums: newAlbum },
      $set: { overallRating: newOverallRating },
    }
  );

  if (!updateResult.acknowledged || updateResult.modifiedCount === 0) {
    throw "Error: Could not add album";
  }
  const updatedBand = await bandCollection.findOne({
    _id: new ObjectId(bandId),
  });
  updatedBand._id = updatedBand._id.toString();

  return updatedBand;
};

const getAll = async (bandId) => {
  if (!bandId) throw "Error: You must provide a bandId";
  if (typeof bandId !== "string") throw "Error: BandId must be a string";
  if (bandId.trim().length === 0)
    throw "Error: BandId cannot be an empty string or just spaces";
  bandId = bandId.trim();
  if (!ObjectId.isValid(bandId)) throw "Error: Invalid object ID";

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(bandId) });

  if (band === null || !band) {
    throw "Error: No band with provided bandId";
  }
  band._id = band._id.toString();
  band.albums.forEach((album) => {
    album._id = album._id.toString();
  });
  return band.albums;
};

const get = async (albumId) => {
  if (!albumId) throw "Error: You must provide an albumId";
  if (typeof albumId !== "string") throw "Error: AlbumId must be a string in";
  if (albumId.trim().length === 0)
    throw "Error: AlbumId cannot be an empty string or just spaces";
  albumId = albumId.trim();
  if (!ObjectId.isValid(albumId)) throw "Error: Invalid object ID";

  const bandCollection = await bands();
  const band = await bandCollection.findOne({
    "albums._id": new ObjectId(albumId),
  });
  if (!band) throw "Error: No band with provided albumId";
  const result = band.albums.find((album) => album._id.toString() === albumId);
  result._id = result._id.toString();
  return result;
};

const remove = async (albumId) => {
  if (!albumId) throw "Error: You must provide an albumId";
  if (typeof albumId !== "string") throw "Error: AlbumId must be a string";
  if (albumId.trim().length === 0)
    throw "Error: AlbumId cannot be an empty string or just spaces";
  albumId = albumId.trim();
  if (!ObjectId.isValid(albumId)) throw "Error: Invalid object ID";

  const bandCollection = await bands();
  const band = await bandCollection.findOne({
    "albums._id": new ObjectId(albumId),
  });

  if (!band) {
    return res.status(404).json({ error: "Album not found" });
  }

  const albumToDelete = band.albums.find(
    (album) => album._id.toString() === albumId
  );
  const newAlbums = band.albums.filter(
    (album) => album._id.toString() !== albumId
  );

  const numberOfAlbums = newAlbums.length;
  const newOverallRating =
    numberOfAlbums > 0
      ? Math.round(
          (newAlbums.reduce((sum, album) => sum + album.rating, 0) /
            numberOfAlbums) *
            10
        ) / 10
      : 0;
  const updateResult = await bandCollection.updateOne(
    { _id: band._id },
    {
      $set: {
        albums: newAlbums,
        overallRating: newOverallRating,
      },
    }
  );

  if (updateResult.modifiedCount === 0) {
    throw `Error: Could not remove album with id ${albumId}`;
  }

  const bandAfterRemove = await bandCollection.findOne({
    _id: band._id,
  });
  bandAfterRemove._id = bandAfterRemove._id.toString();
  return `${albumToDelete.title} was successfully removed from the band`;
};

export const albumDataFunctions = { create, getAll, get, remove };
