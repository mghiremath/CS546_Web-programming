const input_form = document.querySelector("form");
const results = document.getElementById("results");
const errorMessage = document.getElementById("error-message");

input_form.addEventListener("submit", function (event) {
  event.preventDefault();
  errorMessage.innerText = "";
  const text_input = document.getElementById("text_input").value;
  if (!text_input) {
    errorMessage.innerText = "Enter something!";
    return;
  }
  if (text_input.trim() == "") {
    errorMessage.innerText = "Enter something! Only spaces not allowed";
    return;
  }
  const to_lower_case = text_input.toLowerCase();
  const letter = /[a-z]/;
  const word = /[a-z]+/g;
  let letters = 0;
  let nonLetters = 0;
  const totalWords = to_lower_case.match(word) || [];
  const uniqueWords = new Set(totalWords);
  const vowel = /[aeiou]/;
  const consonant = /[bcdfghjklmnpqrstvwxyz]/;
  let vowels = 0;
  let consonants = 0;
  let longWords = 0;
  let shortWords = 0;

  for (const i of to_lower_case) {
    if (letter.test(i)) {
      letters++;
      if (vowel.test(i)) {
        vowels++;
      } else if (consonant.test(i)) {
        consonants++;
      }
    } else {
      nonLetters++;
    }
  }
  for (const j of totalWords) {
    if (j.length >= 6) {
      longWords++;
    } else if (j.length <= 3) {
      shortWords++;
    }
  }
  const dl = document.createElement("dl");
  const analysis = [
    ["Original Input:", text_input],
    ["Total Letters", letters],
    ["Total Non-Letters", nonLetters],
    ["Total Vowels", vowels],
    ["Total Consonants", consonants],
    ["Total Words", totalWords.length],
    ["Unique Words", uniqueWords.size],
    ["Long Words", longWords],
    ["Short Words", shortWords],
  ];
  for (const [a, b] of analysis) {
    const dt = document.createElement("dt");
    dt.innerText = a;
    dl.appendChild(dt);
    const dd = document.createElement("dd");
    dd.innerText = b;
    dl.appendChild(dd);
  }
  results.appendChild(dl);
  input_form.reset();
});
