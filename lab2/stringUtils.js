/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
  if (typeof string === "undefined") {
    throw "Error: The array must be provided.";
  }
  if (!Array.isArray(string)) {
    throw "Error: The input must be an array.";
  }
  if (string.length === 0) {
    throw "Error: The array cannot be empty.";
  }
  let palindromeMap = {};
  for (let str of string) {
    if (typeof str !== "string") {
      throw "Error: Each element in the array must be a string.";
    }
    let strippedStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (strippedStr.length === 0) {
      throw "Error: Each string must consist of at least one alphanumeric character.";
    }
    let isPalindrome = strippedStr.split("").reverse().join("") === strippedStr;
    palindromeMap[strippedStr] = isPalindrome;
  }
  return palindromeMap;
};

let censorWords = (string, badWordsList) => {
  if (typeof string === "undefined" || typeof badWordsList === "undefined") {
    throw "Error: Please provide both string inputs";
  }
  if (string.trim.length === 0) {
    throw "Error: Input string cannot be an empty string";
  }
  if (!Array.isArray(badWordsList)) {
    throw "Error: Bad words list must be an array";
  }
  if (badWordsList.trim.length === 0) {
    throw "Error: Bad words list cannot be empty";
  }
  for (let word of badWordsList) {
    if (typeof word !== "string") {
      throw "Error: Each element in the bad words list must be a string";
    }
    if (!string.includes(word)) {
      throw `Error: '${word}' does not exist in the input string`;
    }
  }

  let badWordRegexes = badWordsList.map((badWord) => new RegExp(badWord, "gi"));
  let patterns = ["!", "@", "$", "#"];
  let patternIndex = 0;
  let badWordMap = new Map();
  for (let regex of badWordRegexes) {
    let match = regex.exec(string);
    while (match) {
      let badWord = match[0].toLowerCase();
      let pattern = badWordMap.get(badWord);
      if (pattern === undefined) {
        pattern = "";
        for (let i = 0; i < badWord.length; i++) {
          pattern += patterns[patternIndex];
          patternIndex = (patternIndex + 1) % patterns.length;
        }
        badWordMap.set(badWord, pattern);
      }
      let startIndex = match.index;
      let endIndex = match.index + badWord.length;
      string =
        string.substring(0, startIndex) + pattern + string.substring(endIndex);
      match = regex.exec(string);
    }
  }

  return string;
};

let distance = (string, word1, word2) => {
  if (
    typeof string === "undefined" ||
    typeof word1 === "undefined" ||
    typeof word2 === "undefined"
  ) {
    throw "Error: Please pass all the inputs";
  }
  if (string === null) {
    throw "Error: string does not exist";
  }

  if (word1 === null) {
    throw "Error: word1 does not exist";
  }
  if (word2 === null) {
    throw "Error: word2 does not exist";
  }

  if (
    typeof string !== "string" ||
    typeof word1 !== "string" ||
    typeof word2 !== "string"
  ) {
    throw "Error: All inputs must be of type string";
  }

  if (!string.trim() || !word1.trim() || !word2.trim()) {
    throw "Error: Any of the inputs must not be empty";
  }

  if (
    !/[a-zA-Z]/.test(string) ||
    !/[a-zA-Z]/.test(word1) ||
    !/[a-zA-Z]/.test(word2)
  ) {
    throw "Error: Input string, word1, or word2 is just punctuation symbols";
  }
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();

  if (word1 === word2) {
    throw "Error: word1 and word2 should not be the same";
  }

  let words = string.toLowerCase().split(/\W+/);

  word1 = word1.split(/\W+/);
  word2 = word2.split(/\W+/);
  let word1Index = words.lastIndexOf(word1[word1.length - 1]);
  let word2Index = words.lastIndexOf(word2[0]);

  if (word1Index === -1 || word2Index === -1) {
    throw "Error: word1 and word2 should exist in the input string";
  }

  if (word1Index >= word2Index) {
    throw "Error: word1 must appear before word2 in the string";
  }

  return word2Index - word1Index;
};

export { palindromes, censorWords, distance };
