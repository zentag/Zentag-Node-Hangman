const readline = require("readline");
console.clear()
console.log("Welcome!");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("What's your word? > ", (word) => {
  console.clear();
  const letters = word.split("");
  let mistakes = [];
  let guesses = [];
  letters.forEach(() => {
    guesses.push("_");
  });
  console.log(guesses.join(" "));
  ask();
  function ask() {
    rl.question("What's your letter? > ", (answer) => {
      if (letters.includes(answer)) {
        letters.forEach((value, position) => {
          if (answer == letters[position]) {
            guesses[position] = answer;
          }
        });
        if (guesses.includes("_")) {
          console.clear();
          console.log(guesses.join(" "));
          console.log("Good guess!");
          console.log("Wrongo Bongo letters:", mistakes.join(" "));
          console.log("Guesses remaining: ", 6 - mistakes.length);
          ask();
        } else {
          console.clear();
          console.log(guesses.join(" "));
          console.log("You win!");
          console.log("Guesses remaining: ", 6 - mistakes.length);
        }
      } else {
        console.clear();
        console.log(guesses.join(" "));
        console.log("Go fish");
        if(!mistakes.includes(answer)) mistakes.push(answer);
        mistakes.sort(function (a, b) {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          })
        console.log("Buzz!  Wrongo Bongo letters:", mistakes.join(" "));
        console.log("Guesses remaining: ", 6 - mistakes.length);
        if (mistakes.length == 6) {
            console.log("Correct answer: ",word)
          console.log("Game over!");
        } else ask();
      }
    });
  }
});
