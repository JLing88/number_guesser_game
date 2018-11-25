let randomNumber = Math.floor(Math.random() * 100) + 1;
let min = 1
let max = 100

const guesses = document.getElementById('guesses');
const lastGuess = document.getElementById('lastGuess');
const highOrLow = document.getElementById('highOrLow');

const guessSubmit = document.getElementById('guessSubmit');
const guessField = document.getElementById('guessField');
let resetButton = document.getElementById('resetButton');

let guessCount = 1;

function checkGuess() {
  let userGuess = Number(guessField.value);

  if (guessCount > 1) {
    resetButton.removeAttribute("disabled");
  }
  if (guessCount === 1) {
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
}

function gameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  // resetButton = document.createElement('button');
  // resetButton.textContent = 'New Game';
  // document.body.appendChild(resetButton);
  // resetButton.addEventListener('click', resetGame)
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}

function success() {
  if(document.getElementById("guessField").value==="") {
    document.getElementById('clearGuess').disabled = true;
  } else {
    document.getElementById('clearGuess').disabled = false;
  }
}

guessSubmit.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame)