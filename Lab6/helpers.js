function isValidString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidWebsite(value) {
  const regex = /^http:\/\/www\..{5,}\.com$/;
  return regex.test(value);
}

function isValidArray(value, minLength = 1) {
  return (
    Array.isArray(value) &&
    value.length >= minLength &&
    value.every(isValidString)
  );
}

export function validateBandInput(band) {
  const currentYear = new Date().getFullYear();
  const {
    name,
    genre,
    website,
    recordCompany,
    groupMembers,
    yearBandWasFormed,
  } = band;

  if (!isValidString(name)) {
    return { isValid: false, message: "Invalid name" };
  }
  if (!isValidString(recordCompany)) {
    return { isValid: false, message: "Invalid recordCompany" };
  }
  if (!isValidWebsite(website)) {
    return { isValid: false, message: "Invalid website" };
  }
  if (!isValidArray(genre)) {
    return { isValid: false, message: "Invalid genre" };
  }
  if (!isValidArray(groupMembers)) {
    return { isValid: false, message: "Invalid groupMembers" };
  }
  if (
    typeof yearBandWasFormed !== "number" ||
    yearBandWasFormed < 1900 ||
    yearBandWasFormed > currentYear
  ) {
    return { isValid: false, message: "Invalid yearBandWasFormed" };
  }

  return { isValid: true };
}

export function validateAlbumInput(album) {
  const currentYear = new Date().getFullYear();
  const { bandId, title, releaseDate, tracks, rating } = album;

  if (!isValidString(bandId)) {
    return { isValid: false, message: "Invalid bandId" };
  }
  if (!isValidString(title)) {
    return { isValid: false, message: "Invalid title" };
  }
  if (!isValidString(releaseDate) || !Date.parse(releaseDate)) {
    return { isValid: false, message: "Invalid releaseDate" };
  }
  if (
    new Date(releaseDate).getFullYear() < 1900 ||
    new Date(releaseDate).getFullYear() > currentYear + 1
  ) {
    return { isValid: false, message: "Invalid release year" };
  }
  if (!isValidArray(tracks, 3)) {
    return { isValid: false, message: "Invalid tracks" };
  }
  if (
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5 ||
    (Math.round(rating * 10) / 10 === rating) !== 0
  ) {
    return { isValid: false, message: "Invalid rating" };
  }

  return { isValid: true };
}
