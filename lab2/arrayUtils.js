/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { multiplyMatrices } from "./helpers.js";

let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  if (
    typeof array === "undefined" ||
    typeof sortBy1 === "undefined" ||
    typeof sortBy2 === "undefined" ||
    typeof filterBy === "undefined" ||
    typeof filterByTerm === "undefined"
  ) {
    throw "Error: Please pass all the inputs";
  }
  if (!array) {
    throw "Error: array does not exist";
  }

  if (!Array.isArray(array)) {
    throw "Error: Array parameter must be an array";
  }

  if (array.length === 0) {
    throw "Error: Array parameter cannot be an empty array";
  }

  if (array.length < 2) {
    throw "Error: Array parameter must contain at least two objects";
  }

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== "object") {
      throw "Error: Each element in the array parameter must be an object";
    }

    if (Object.keys(array[i]).length === 0) {
      throw "Error: Each object in the array parameter cannot be an empty object";
    }
  }
  let keys = Object.keys(array[0]);
  for (let i = 1; i < array.length; i++) {
    if (keys.length !== Object.keys(array[i]).length) {
      throw "Error: All objects in the array parameter must have the same keys";
    }

    for (let j = 0; j < keys.length; j++) {
      if (!Object.keys(array[i]).includes(keys[j])) {
        throw "Error: All objects in the array parameter must have the same keys";
      }

      if (typeof array[i][keys[j]] !== "string") {
        throw "Error: each value for each key in each object in the array must be a string";
      }
    }
  }

  if (sortBy1 === null) {
    throw "Error: sortBy1 does not exist";
  }

  if (sortBy1.length === 0) {
    throw "Error: sortBy1 is empty";
  }

  if (sortBy1.length !== 2) {
    throw "Error: sortBy1 does not have two elements";
  }

  if (typeof sortBy1[0] !== "string" || typeof sortBy1[1] !== "string") {
    throw "Error: sortBy1 elements are not strings";
  }

  if (!array.some((object) => object.hasOwnProperty(sortBy1[0]))) {
    throw `Error: sortByField1 (${sortBy1[0]}) is not a key in the objects`;
  }

  if (sortBy1[1] !== "asc" && sortBy1[1] !== "desc") {
    throw `Error: order of sortByField1 (${sortBy1[1]}) is not "asc" or "desc"`;
  }

  if (sortBy2 === null) {
    throw "Error: sortBy2 does not exist";
  }
  if (sortBy2.length === 0) {
    throw "Error: sortBy2 is empty";
  }

  if (sortBy2.length !== 2) {
    throw "Error: sortBy2 does not have two elements";
  }

  if (typeof sortBy2[0] !== "string" || typeof sortBy2[1] !== "string") {
    throw "Error: sortBy2 elements are not strings";
  }
  if (!array.some((object) => object.hasOwnProperty(sortBy2[0]))) {
    throw `Error: sortByField2 (${sortBy2[0]}) is not a key in the objects`;
  }

  if (sortBy2[1] !== "asc" && sortBy2[1] !== "desc") {
    throw `Error: order of sortByField2 (${sortBy2[1]}) is not "asc" or "desc"`;
  }
  if (typeof filterBy !== "string" || !filterBy.trim().length) {
    throw "Error: Fourth argument must be a non-empty string";
  }
  if (typeof filterByTerm !== "string" || !filterByTerm.trim().length) {
    throw "Error: the filterByTerm must be a string";
  }
  if (!array.some((obj) => obj.hasOwnProperty(filterBy))) {
    throw `Error: The filterBy key '${filterBy}' does not exist in the objects in the array`;
  }
  if (!array.some((obj) => obj[filterBy] === filterByTerm)) {
    throw `Error: No object has the value '${filterByTerm}' for the key '${filterBy}'`;
  }
  let filteredArray = array.filter((i) => i[filterBy] === filterByTerm);
  let sortedArray = filteredArray.sort((a, b) => {
    if (sortBy1[1] === "asc") {
      if (a[sortBy1[0]] < b[sortBy1[0]]) return -1;
      if (a[sortBy1[0]] > b[sortBy1[0]]) return 1;
    } else {
      if (a[sortBy1[0]] < b[sortBy1[0]]) return 1;
      if (a[sortBy1[0]] > b[sortBy1[0]]) return -1;
    }

    if (sortBy2[1] === "asc") {
      if (parseInt(a[sortBy2[0]]) < parseInt(b[sortBy2[0]])) return -1;
      if (parseInt(a[sortBy2[0]]) > parseInt(b[sortBy2[0]])) return 1;
    } else {
      if (parseInt(a[sortBy2[0]]) < parseInt(b[sortBy2[0]])) return 1;
      if (parseInt(a[sortBy2[0]]) > parseInt(b[sortBy2[0]])) return -1;
    }

    return 0;
  });
  return sortedArray;
};

let merge = (...args) => {
  if (args.length === 0) {
    throw "Error: At least one array must be supplied as input";
  }

  let mergedArray = [];

  for (let arr of args) {
    if (!Array.isArray(arr)) {
      throw "Error: Input must be an array";
    }

    if (arr.length === 0) {
      throw "Error: Array cannot be empty and must have at least one element";
    }

    let flatten = function (input) {
      let result = [];
      for (let element of input) {
        if (Array.isArray(element)) {
          result = result.concat(flatten(element));
        } else if (typeof element === "number" || typeof element === "string") {
          result.push(element);
        } else {
          throw "Error: Array elements must be either a string, number or an array of strings/numbers";
        }
      }
      return result;
    };

    mergedArray = mergedArray.concat(flatten(arr));
  }

  mergedArray.sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }
    if (typeof a === "number") {
      return -1;
    }
    return 1;
  });

  return mergedArray;
};

let matrixMultiply = (...args) => {
  if (args.length < 2) {
    throw "Error: At least two matrices must be provided";
  }

  for (let i = 0; i < args.length; i++) {
    let matrix = args[i];

    if (!Array.isArray(matrix)) {
      throw `Error: Matrix ${i + 1} is not an array`;
    }

    if (matrix.length === 0) {
      throw `Error: Matrix ${i + 1} is an empty array`;
    }

    if (!matrix.every((row) => Array.isArray(row))) {
      throw `Error: Matrix ${i + 1} has non-array elements`;
    }

    if (!matrix.every((row) => row.every((elem) => typeof elem === "number"))) {
      throw `Error: Matrix ${i + 1} has non-numeric elements`;
    }

    if (!matrix.every((row) => row.length === matrix[0].length)) {
      throw `Error: Matrix ${i + 1} has rows of different lengths`;
    }
  }

  let result = args[0];

  for (let i = 1; i < args.length; i++) {
    let matrix = args[i];

    if (result[0].length !== matrix.length) {
      throw `Error: Matrices ${i} and ${i + 1} cannot be multiplied`;
    }

    result = multiplyMatrices(result, matrix);
  }

  return result;
};
export { sortAndFilter, merge, matrixMultiply };
