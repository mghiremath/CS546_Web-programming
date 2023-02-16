/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let areObjectsEqual = (...args) => {
  if (args.length < 2) {
    throw "Error: At least two objects must be passed into the function";
  }

  let isObject = (obj) => {
    return (
      obj != null && typeof obj === "object" && Array.isArray(obj) === false
    );
  };

  let compareObjects = (a, b) => {
    let aKeys = Object.keys(a).sort();
    let bKeys = Object.keys(b).sort();

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let i = 0; i < aKeys.length; i++) {
      let key = aKeys[i];

      if (!b.hasOwnProperty(key)) {
        return false;
      }

      if (isObject(a[key]) && isObject(b[key])) {
        if (!compareObjects(a[key], b[key])) {
          return false;
        }
      } else if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        if (a[key].length !== b[key].length) {
          return false;
        }
        let aSorted = a[key].slice().sort();
        let bSorted = b[key].slice().sort();
        for (let j = 0; j < aSorted.length; j++) {
          if (aSorted[j] !== bSorted[j]) {
            return false;
          }
        }
      } else if (a[key] !== b[key]) {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i < args.length; i++) {
    if (!isObject(args[i])) {
      throw "Error: All inputs must be objects";
    }
  }

  for (let i = 1; i < args.length; i++) {
    if (!compareObjects(args[0], args[i])) {
      return false;
    }
  }

  return true;
};

let calculateObject = (object, funcs) => {
  if (typeof object === "undefined" || typeof funcs === "undefined") {
    throw "Error: Please pass all the inputs";
  }
  if (typeof object !== "object" || object === null || Array.isArray(object)) {
    throw "Error:  The input object must be an object";
  }

  if (!Array.isArray(funcs)) {
    throw "Error:  The input funcs must be an array";
  }

  if (
    Object.values(object).some(
      (value) => typeof value !== "number" || isNaN(value)
    )
  ) {
    throw "Error:  The values of the input 'object' must all be numbers";
  }

  if (funcs.length < 1 || !funcs.every((func) => typeof func === "function")) {
    throw "Error:  The input 'funcs' must contain at least one function";
  }

  let result = {};

  funcs.reduce((previousValue, currentFunc) => {
    let currentResult = {};

    for (let [key, value] of Object.entries(object)) {
      currentResult[key] = currentFunc(value);
    }

    result = currentResult;
    object = currentResult;
    previousValue = currentResult;

    return previousValue;
  }, {});

  for (let [key, value] of Object.entries(result)) {
    result[key] = Number(value.toFixed(2));
  }

  return result;
};

let combineObjects = (...args) => {
  if (args.length < 2) {
    throw "Error: combineObjects requires at least two objects";
  }
  let keys = {};
  args.forEach((obj, index) => {
    if (
      typeof obj !== "object" ||
      obj === null ||
      Object.keys(obj).length === 0
    ) {
      throw `Error: ${index} is not a valid object`;
    }
    Object.keys(obj).forEach((key) => {
      if (keys[key] !== undefined) {
        return;
      }
      for (let i = index + 1; i < args.length; i++) {
        if (args[i][key] !== undefined) {
          keys[key] = obj[key];
          return;
        }
      }
    });
  });
  return keys;
};

export { areObjectsEqual, calculateObject, combineObjects };
