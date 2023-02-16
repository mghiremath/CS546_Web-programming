import { sortAndFilter, merge, matrixMultiply } from "./arrayUtils.js";
import { palindromes, censorWords, distance } from "./stringUtils.js";
import {
  areObjectsEqual,
  calculateObject,
  combineObjects,
} from "./objectUtils.js";

let people = [
  { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
  { name: "Greg", age: "22", location: "New York", role: "Student" },
  { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];

try {
  console.log(
    sortAndFilter(
      people,
      ["name", "asc"],
      ["location", "asc"],
      "role",
      "Student"
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(
      people,
      ["name", "asc"],
      ["location", "desc"],
      "role",
      "Student"
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(people, ["location", "asc"], ["name", "asc"], "age", "22")
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(people, ["ssn", "asc"], ["name", "asc"], "age", "22")
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(people, ["location", "none"], ["name", "asc"], "age", "22")
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(people, ["location", "asc"], ["name", "asc"], "phone", "22")
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(sortAndFilter(["location", "asc"], ["name", "asc"], "age", "22"));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(
      ["string", {}],
      ["location", "asc"],
      ["name", "asc"],
      "age",
      "22"
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(people, ["location", "asc"], ["name", "asc"], "age", 22)
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    sortAndFilter(
      [
        { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
        { name: "Greg", age: 22, location: "New York", role: "Student" },
      ],
      "location",
      "age",
      "22"
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    merge(
      [3, 0, "Lab2", 2, "Aiden"],
      ["CS-546", "Computer Science", 8, 15],
      [6, 3, "!Patrick", 25, 29]
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(merge(["bar", 0, 1, [[[5, "foo"]]]], [7, "buzz", ["fizz", 8]]));
} catch (error) {
  console.log(error);
}
try {
  console.log(merge([3, 0, 1, 2, 4], [1, 2, 8, 15], "not an array"));
} catch (error) {
  console.log(error);
}
try {
  console.log(merge());
} catch (error) {
  console.log(error);
}
try {
  console.log(
    matrixMultiply(
      [
        [2, 3],
        [3, 4],
        [4, 5],
      ],
      [
        [1, 1, 1],
        [2, 2, 2],
      ],
      [[3], [2], [1]]
    )
  );
} catch (error) {
  console.error(error);
}

try {
  console.log(matrixMultiply([[3, 5]], [[4], [4]]));
} catch (error) {
  console.error(error);
}
try {
  console.log(matrixMultiply([[1, 2]], [["foobar"], [6]]));
} catch (error) {
  console.log(error);
}
try {
  console.log(matrixMultiply([]));
} catch (error) {
  console.error(error);
}

try {
  console.log(
    matrixMultiply([
      [1, 2],
      [3, 3],
    ])
  );
} catch (error) {
  console.error(error);
}
const a = [
  [1, 2, 3],
  [4, 5, 6],
];
const b = [
  [7, 8],
  [9, 10],
  [11, 12],
];
const c = [
  [13, 14, 15],
  [16, 17, 18],
];
const d = [[19], [20], [21]];

try {
  console.log(matrixMultiply(a, b, c, d));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    palindromes([
      "Madam",
      "Loot",
      "Was it a cat I saw?",
      "Poor Dan is in a droop",
      "Anna",
      "Nope",
    ])
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(palindromes());
} catch (error) {
  console.log(error);
}

try {
  console.log(palindromes("hi"));
} catch (error) {
  console.log(error);
}

try {
  console.log(palindromes("    "));
} catch (error) {
  console.log(error);
}

try {
  console.log(palindromes([123, "foo", "bar"]));
} catch (error) {
  console.log(error);
}

try {
  console.log(palindromes(["", "  ", "!!!"]));
} catch (error) {
  console.log(error);
}
try {
  console.log(palindromes(1));
} catch (error) {
  console.log(error);
}

const badWords = ["bread", "chocolate", "pop"];

try {
  console.log(
    censorWords(
      "I like bread that has chocolate chips in it but I do not like lollipops",
      badWords
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(censorWords("     ", badWords));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    censorWords("I like bread that has chocolate chips in it", [2, "wow"])
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(censorWords("I like breading", ["bread"]));
} catch (error) {
  console.log(error);
}

try {
  console.log(distance());
} catch (error) {
  console.log(error);
}
try {
  console.log(distance([], true));
} catch (error) {
  console.log(error);
}
try {
  console.log(distance("", "", ""));
} catch (error) {
  console.log(error);
}
try {
  console.log(distance("Hello World!", "   !?!", "    ...  "));
} catch (error) {
  console.log(error);
}
try {
  console.log(distance("Patrick", "Patrick", "Patrick"));
} catch (error) {
  console.log(error);
}
try {
  console.log(distance(123, "CS", "Patrick"));
} catch (error) {
  console.log(error);
}
try {
  console.log(distance("Hello there", "hello", ""));
} catch (error) {
  console.log(error);
}
try {
  console.log(distance("Give me music suggestions", "rock", "pop"));
} catch (error) {
  console.log(error);
}
try {
  console.log(distance("Bob met Adam on wednesday", "Adam", "Bob"));
} catch (error) {
  console.log(error);
}
try {
  console.log(
    distance(
      "I was going to buy preworkout powder yesterday",
      "going to",
      "workout powder"
    )
  );
} catch (error) {
  console.log(error);
}
try {
  console.log(distance("The brown fox jumped over the lazy dog", "fox", "dog"));
} catch (error) {
  console.log(error);
}
try {
  console.log(
    distance(
      "I was going to buy workout powder yesterday",
      "going to",
      "workout powder"
    )
  );
} catch (error) {
  console.log(error);
}
try {
  console.log(
    distance("sphinx of black quartz, judge my vow", "QUARTZ", "vOW")
  );
} catch (error) {
  console.log(error);
}
try {
  console.log(
    distance("I really hope it will snow soon because I like snow", "I", "snow")
  );
} catch (error) {
  console.log(error);
}
try {
  console.log(
    distance("I like sweet and salty but I like sweet more", "salty", "sweet")
  );
} catch (error) {
  console.log(error);
}

const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { a: 2, b: 3 };
const forth = {
  a: { sA: "Hello", sB: "There", sC: "Class" },
  b: 7,
  c: true,
  d: "Test",
};
const fifth = {
  c: true,
  b: 7,
  d: "Test",
  a: { sB: "There", sC: "Class", sA: "Hello" },
};
const sixth = {
  name: { firstName: "Patrick", lastName: "Hill" },
  age: 47,
  dob: "9/25/1975",
  hobbies: ["Playing music", "Movies", "Spending time with family"],
};
const seventh = {
  age: 47,
  name: { firstName: "Patrick", lastName: "Hill" },
  hobbies: ["Playing music", "Movies", "Spending time with family"],
  dob: "9/25/1975",
};
const eighth = { b: 3, a: 2 };
try {
  console.log(areObjectsEqual(first, second, third));
} catch (error) {
  console.log(error);
}
try {
  console.log(areObjectsEqual(forth, fifth));
} catch (error) {
  console.log(error);
}
try {
  console.log(areObjectsEqual(forth, third, sixth));
} catch (error) {
  console.log(error);
}
try {
  console.log(areObjectsEqual(sixth, seventh));
} catch (error) {
  console.log(error);
}
try {
  console.log(areObjectsEqual(first, eighth, third));
} catch (error) {
  console.log(error);
}
try {
  console.log(areObjectsEqual({}, {}, {}, {}, {}));
} catch (error) {
  console.log(error);
}
try {
  console.log(areObjectsEqual([1, 2, 3], [1, 2, 3]));
} catch (error) {
  console.log(error);
}
try {
  console.log(areObjectsEqual("foo", "bar"));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    calculateObject({ a: 3, b: 7, c: 5 }, [(n) => n * 2, (n) => Math.sqrt(n)])
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(calculateObject({ a: "Hello", b: 7, c: false }, [(n) => n * n]));
} catch (error) {
  console.log(error);
}

try {
  console.log(calculateObject({ a: 1, b: 2, c: 3 }, [false]));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    combineObjects({ a: 3, b: 7, c: 5 }, { d: 4, e: 9 }, { a: 8, d: 2 })
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    combineObjects(
      { b: 7, c: 5 },
      { d: 4, e: 9, a: "waffle" },
      { a: 8, d: 2 },
      { d: 3, e: "hello" }
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    combineObjects(
      { apple: "orange", orange: "pear" },
      { pear: "blueberry", fruit: 4 },
      { cool: false, intelligence: -2 }
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(combineObjects({ wow: "crazy", super: "duper" }, false));
} catch (error) {
  console.log(error);
}
