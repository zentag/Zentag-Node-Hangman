import readline from "readline";
import { generate, count } from "random-words";
console.clear();
console.log("Welcome!");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.clear();
start(false);
function start(tryagain) {
  rl.question(
    `${tryagain ? "Enter a whole number! " : ""}How many players? > `,
    (players) => {
      if (Number(players) == 1) {
        play(generate({exactly:1,minLength:6}).toString(), Number(players), false);
      } else if (
        Number.isNaN(Number(players)) ||
        !Number.isInteger(Number(players)) ||
        Math.sign(Number(players)) === -1
      ) {
        start(true);
      } else {
        choiceorgenerate();
        function choiceorgenerate() {
          rl.question(
            "Would you like to choose a word or generate one? (1 for choose, 2 for generate) > ",
            (choice) => {
              if (choice == 1) {
                console.clear();
                console.log("Welcome!");
                rl.question("Player 1, what's your word? > ", (word) =>
                  play(word, Number(players), true)
                );
              }
              else if (choice == 2) play(generate({exactly:1,minLength:6}).toString(), Number(players), false);
              else {
                console.clear();
                console.log("Try again!");
                choiceorgenerate();
              }
            }
          );
        }
      }
    }
  );
}
function play(word, totalPlayers, playerChoiceWord) {
  console.clear();
  const letters = word.split("");
  let mistakes = [];
  let guesses = [];
  let playerNumber = playerChoiceWord ? 1 : 0;
  letters.forEach(() => {
    guesses.push("_");
  });
  drawHangman(mistakes, word);
  console.log(guesses.join(" "));
  ask();
  function ask() {
    rl.question(
      `Player ${
        playerNumber == totalPlayers ? (playerNumber = playerChoiceWord ? 2 : 1) : ++playerNumber
      }, what's your letter? > `,
      (answer) => {
        if (letters.includes(answer)) {
          letters.forEach((value, position) => {
            if (answer == letters[position]) {
              guesses[position] = answer;
            }
          });
          if (guesses.includes("_")) {
            console.clear();
            drawHangman(mistakes, word);
            console.log(guesses.join(" "));
            console.log("Good guess!");
            console.log("Wrongo Bongo letters:", mistakes.join(" "));
            console.log("Guesses remaining: ", 6 - mistakes.length);
            ask();
          } else {
            console.clear(mistakes);
            drawHangman(mistakes, word);
            console.log(guesses.join(" "));
            console.log("You win!");
            console.log("Guesses remaining: ", 6 - mistakes.length);
          }
        } else {
          console.clear();
          if (
            !mistakes.includes(answer) &&
            answer.length === 1 &&
            answer.match(/[a-z]/i)
          )
            mistakes.push(answer);
          else console.log("Enter a letter that hasn't been entered!");
          mistakes.sort(function (a, b) {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          });
          const gameOver = drawHangman(mistakes, word);
          console.log(guesses.join(" "));
          console.log("Go fish");
          console.log("Buzz!  Wrongo Bongo letters:", mistakes.join(" "));
          console.log("Guesses remaining: ", 6 - mistakes.length);
          if (gameOver) {
            console.log("Correct answer: ", word);
            console.log("Game over!");
          } else ask();
        }
      }
    );
  }
}
function drawHangman(mistakes, word) {
  let gameOver = false;
  switch (mistakes.length) {
    case 0:
      console.log("  _\n   |\n   |\n   |\n ---");
      break;
    case 1:
      console.log("  _\n O |\n   |\n   |\n ---");
      break;
    case 2:
      console.log("  _\n O |\n | |\n   |\n ---");
      break;
    case 3:
      console.log("  _\n O |\n | |\n ^ |\n ---");

      break;
    case 4:
      console.log("  _\n O |\n-| |\n ^ |\n ---");
      break;
    case 5:
      console.log("  _\n O |\n-|-|\n ^ |\n ---");
      break;
    case 6:
      console.log("  _\n X |\n-|-|\n ^ |\n ---");
      gameOver = true;
      break;
  }
  return gameOver;
}
