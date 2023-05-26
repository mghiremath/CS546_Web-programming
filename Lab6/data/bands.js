import { bands } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  if (
    typeof name === "undefined" ||
    typeof genre === "undefined" ||
    typeof website === "undefined" ||
    typeof recordCompany === "undefined" ||
    typeof groupMembers === "undefined" ||
    typeof yearBandWasFormed === "undefined"
  ) {
    throw "Error: Provide all of the input parameters";
  }

  if (
    typeof name !== "string" ||
    typeof website !== "string" ||
    typeof recordCompany !== "string"
  ) {
    throw "Error: Inputs name, website or recordCompany have to be strings";
  }
  if (
    !Array.isArray(genre) ||
    !Array.isArray(groupMembers) ||
    !genre.some((g) => typeof g === "string" && g.trim()) ||
    !groupMembers.some((m) => typeof m === "string" && m.trim())
  ) {
    throw "Error: Genre and group members must be arrays with at least one valid string";
  }

  if (typeof yearBandWasFormed !== "number") {
    throw "Error: The input yearBandWasFormed has to be a number";
  }
  if (
    name.trim().length === 0 ||
    website.trim().length === 0 ||
    recordCompany.trim().length === 0
  ) {
    throw "Error: Inputs Name, Website or recordCompany cannot be an empty string or string with just spaces";
  }
  if (
    typeof yearBandWasFormed !== "number" ||
    yearBandWasFormed < 1900 ||
    yearBandWasFormed > new Date().getFullYear()
  ) {
    throw "Error: Year band was formed must be a number between 1900 and the current year";
  }

  name = name.trim();
  website = website.trim();
  recordCompany = recordCompany.trim();
  const websiteRegex = /^http:\/\/www\..{5,}\.com$/;
  if (!websiteRegex.test(website.trim())) {
    throw "Error: Website must be in the format http://www.example.com and have at least 5 characters between http://www. and .com";
  }
  const newBand = {
    _id: new ObjectId(),
    name: name.trim(),
    genre: genre.map((g) => g.trim()),
    website: website.trim(),
    recordCompany: recordCompany.trim(),
    groupMembers: groupMembers.map((m) => m.trim()),
    yearBandWasFormed: yearBandWasFormed,
    albums: [],
    overallRating: 0,
  };
  groupMembers.forEach((element) => {
    if (element.trim() === "") {
      throw "Error: Group members must be arrays with at least one valid string";
    }
  });
  genre.forEach((element) => {
    if (element.trim() === "") {
      throw "Error: Genre must be arrays with at least one valid string";
    }
  });
  const bandCollection = await bands();
  const insertInfo = await bandCollection.insertOne(newBand);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Error: Could not add Band";
  }
  newBand._id = newBand._id.toString();
  return newBand;
};

const getAll = async () => {
  const bandCollection = await bands();
  let bandList = await bandCollection.find({}).toArray();
  if (!bandList) throw "Error: Could not get all Bands";
  bandList = bandList.map((band) => {
    band._id = band._id.toString();

    band.albums.forEach((album) => {
      album._id = album._id.toString();
      return album;
    });

    return band;
  });

  return bandList;
};

const get = async (id) => {
  if (!id) throw "Error: You must provide an id to search for";
  if (typeof id !== "string") throw "Error: Id must be a string";
  if (id.trim().length === 0)
    throw "Error: Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Error: Invalid object ID";

  const bandCollection = await bands();

  const band = await bandCollection.findOne({ _id: new ObjectId(id) });

  if (band === null || !band) {
    throw "Error: No band with provided id";
  }
  band._id = band._id.toString();
  band.albums.forEach((element) => {
    element._id = element._id.toString();
  });
  return band;
};

const remove = async (id) => {
  if (!id) throw "Error: You must provide an id to search for";
  if (typeof id !== "string") throw "Error: Id must be a string";
  if (id.trim().length === 0)
    throw "Error: Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Error: Invalid object ID";
  const bandCollection = await bands();
  const removeBand = await bandCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (removeBand.lastErrorObject.n === 0) {
    throw `Error: Could not delete band with id of ${id}`;
  }
  return `${removeBand.value.name} has been successfully deleted!`;
};
const update = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  if (
    !id ||
    !name ||
    !genre ||
    !website ||
    !recordCompany ||
    !groupMembers ||
    typeof yearBandWasFormed === "undefined"
  ) {
    throw "Error: Provide all of the input parameters";
  }

  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    typeof website !== "string" ||
    typeof recordCompany !== "string" ||
    !ObjectId.isValid(id)
  ) {
    throw "Error: Inputs id, name, website, or recordCompany must be valid strings";
  }

  if (
    !Array.isArray(genre) ||
    !Array.isArray(groupMembers) ||
    !genre.every((g) => typeof g === "string" && g.trim()) ||
    !groupMembers.every((m) => typeof m === "string" && m.trim())
  ) {
    throw "Error: Genre and group members must be arrays with at least one valid string";
  }

  if (
    typeof yearBandWasFormed !== "number" ||
    yearBandWasFormed < 1900 ||
    yearBandWasFormed > new Date().getFullYear()
  ) {
    throw "Error: Year band was formed must be a number between 1900 and the current year";
  }

  const websiteRegex = /^http:\/\/www\..{5,}\.com$/;
  if (!websiteRegex.test(website.trim())) {
    throw "Error: Website must be in the format http://www.example.com and have at least 5 characters between http://www. and .com";
  }

  const updatedData = {
    name: name.trim(),
    genre: genre.map((g) => g.trim()),
    website: website.trim(),
    recordCompany: recordCompany.trim(),
    groupMembers: groupMembers.map((m) => m.trim()),
    yearBandWasFormed,
  };

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(id) });

  if (!band) {
    throw "Error: Band not found";
  }

  const updateResult = await bandCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedData },
    { returnOriginal: false }
  );

  if (updateResult.modifiedCount === 0) {
    throw `Error: Could not update band with id ${id}`;
  }

  const updatedBand = await bandCollection.findOne({ _id: new ObjectId(id) });
  updatedBand._id = updatedBand._id.toString();
  return updatedBand;
};

export const bandDataFunctions = { create, getAll, get, remove, update };
