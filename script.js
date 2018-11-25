let randomNumber = Math.floor(Math.random() * 100) + 1;
let min = 1
let max = 100

const guesses = document.getElementById('guesses');
const lastGuess = document.getElementById('lastGuess');
const highOrLow = document.getElementById('highOrLow');
const error = document.getElementById('error');
const guessSubmit = document.getElementById('guessSubmit');
const guessField = document.getElementById('guessField');
let resetButton = document.getElementById('resetButton');

let guessCount = 0;

function checkGuess() {
  let userGuess = Number(guessField.value);
  if (withinRange(userGuess)) {
    if (guessCount === 0) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
      lastGuess.textContent = 'Boom!';
      lastGuess.style.color = 'green';
      highOrLow.textContent = '';
      gameOver();
    } else if (guessCount === 10) {
      lastGuess.textContent = 'Game Over!';
      gameOver();
    } else {
      lastGuess.textContent = "Incorrect!";
      lastGuess.style.color = 'red';
      if (userGuess < randomNumber) {
        highOrLow.textContent = 'Too low!';
      } else {
        highOrLow.textContent = 'Too high!';
      }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();

    if (guessCount > 0) {
      resetButton.removeAttribute("disabled");
    }
  } else {
    return false;
  }
}



function gameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastGuess.style.color = 'white';

  generateRandomNumber(min, max);
}

function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function validate() {
  var guess = document.getElementById("guessField");
  var clear = document.getElementById('clearGuess');
  if(guess.value==="") {
    clear.disabled = true;
  } else {
    clear.disabled = false;
  }
}

function withinRange(guess) {
  if (guess < min || guess > max) {
    guessField.value = '';
    alert("Number outside of range!");
    return false;
  } else {
    return true;
  }
}

guessSubmit.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame)