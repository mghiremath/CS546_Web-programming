import * as lab1 from "./lab1.mjs";

//questionOne
console.log(lab1.questionOne([8, 4, 9])); // returns{ '1305': false }
console.log(lab1.questionOne([5, 3, 5])); // returns{ '277': true }
console.log(lab1.questionOne([567, 1008, 128731])); // returns{ '2133288903718666': false }
console.log(lab1.questionOne([80, 21334, 619])); // returns{ '9710184976363': false }
console.log(lab1.questionOne([1, 90])); // returns{ '729001': false }

//questionTwo
console.log(lab1.questionTwo([11, 12, 13, 14, 15, 16, 17])); // returns[ true ]
console.log(lab1.questionTwo([21, 24, 4, 13])); // returns[ false, 1, 2 ]
console.log(lab1.questionTwo([28, 565, 1002, 10000])); // returns[ true ]
console.log(lab1.questionTwo([12, 8, 3, 8])); // returns[ false, 0, 2 ]

//questionThree
console.log(lab1.questionThree({ f: 5, g: 6, h: 5 }, { h: 7, f: 4, g: 5 })); // returns{ f: true, g: true, h: true }

console.log(
  lab1.questionThree(
    { a: 1, b: 2, c: 3, d: 4 },
    { f: 10, b: 20, e: 30, d: 40, c: 50, a: 60 }
  )
); // returns { a: true, b: true, c: true, d: true, f: false, e: false }

console.log(
  lab1.questionThree(
    {
      Patrick: "I'm foo",
      Hill: "I'm bar",
      is: "I'm fizz",
      good: "I'm buzz",
      Teacher: "I'm fuzz",
    },
    {
      Patrick: "I'm not buzz",
      Hill: "I'm not bar",
      is: "I'm not fizz",
      good: "I'm not foo",
      lecturer: 50,
      grader: 60,
    }
  )
); // returns { Patrick: true, Hill: true, is: true, good: true, Teacher: false, lecturer: false, grader: false ß}

console.log(
  lab1.questionThree(
    { 4: 10, 5: 20, 6: 30, 7: 40, 8: 50, 9: 60 },
    { 4: 1, 5: 2, 6: 3 }
  )
); // returns { '4': true, '5': true, '6': true, '7': false, '8': false, '9': false }

//questionFour
console.log(
  lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`)
); // returns
// [
//   [ 'Patrick', 'Hill', 'cs546' ],
//   [ 'Jared', 'Bass', 'cs115' ],
//   [ 'Shudong', 'Hao', 'cs570' ]]

console.log(
  lab1.questionFour(`Kevin, Ryan, aai551
Edward,Amoroso,cs573
Richard,Ens,cs555`)
); // returns [
// [ 'Kevin', ' Ryan', ' aai551' ],
// [ 'Edward', 'Amoroso', 'cs573' ],
// [ 'Richard', 'Ens', 'cs555' ]]
