//sets variables to be used throughout program-vas will change, const will not
var randomNumber = generateRandomNumber(1, 100);
var min;
var max;
const guesses = document.getElementById('guesses');
const lastGuess = document.getElementById('lastGuess');
const highOrLow = document.getElementById('highOrLow');
const error = document.getElementById('error');
const guessSubmit = document.getElementById('guessSubmit');
const guessField = document.getElementById('guessField');
const userMin = document.getElementById('minField');
const userMax = document.getElementById('maxField');
var resetButton = document.getElementById('resetButton');
var guessCount = 0;

//validates user guess and checks against randomNumber
function checkGuess() {
  //get the user's guess from input field
  let userGuess = Number(guessField.value);
  //if user's guess is within the range
  if (withinRange(userGuess)) {
    //only execute this block if it is the first turn
    if (guessCount === 0) {
      //sets the guesses p tag to display string of guesses
      guesses.textContent = 'Previous guesses: ';
    }
    //adds the most recent guess to end of string
    guesses.textContent += userGuess + ' ';

    //if user's guess is correct
    if (userGuess === randomNumber) {
      //show message, change color, and call gameOver()
      lastGuess.textContent = 'Boom!';
      lastGuess.style.color = 'green';
      highOrLow.textContent = '';
      gameOver();
      //else user has guessed 10 times, gameOver
    } else if (guessCount === 10) {
      lastGuess.textContent = 'Game Over!';
      gameOver();
      //let user know high or low and that they were incorrect, changes text color
    } else {
      lastGuess.textContent = "Incorrect!";
      lastGuess.style.color = 'red';
      if (userGuess < randomNumber) {
        highOrLow.textContent = 'Too low!';
      } else {
        highOrLow.textContent = 'Too high!';
      }
    }
    //increment guessCount, reset input field, put input field in focus
    guessCount++;
    guessField.value = '';
    guessField.focus();
    //if guessCount is greater than 0, enable resetButton
    if (guessCount > 0) {
      resetButton.removeAttribute("disabled");
    }
    //invalid guess returns false
  } else {
    return false;
  }
}


//gameOver function disables buttons and resets game.
function gameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetGame(min, max);
}

//resets game
function resetGame(min, max) {
  //generatesRandomNumber
  debugger;
  randomNumber = generateRandomNumber(min, max);
  //set guessCount to 0
  guessCount = 0;

  //resets the values of the previous guess string
  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }
  //disables fields again
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastGuess.style.color = 'white';
  min = 1;
  max = 100;
}

//generates random number
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//validates input so that they can't submit nil values and enables clear button
function validate() {
  var guess = document.getElementById("guessField");
  var clear = document.getElementById('clearGuess');
  if(guess.value==="") {
    clear.disabled = true;
  } else {
    clear.disabled = false;
  }
}

//checks if number is within range
function withinRange(guess) {
  if (guess < min || guess > max) {
    guessField.value = '';
    alert("Number outside of range!");
    return false;
  } else {
    return true;
  }
}

function setMinMax() {
  min = parseInt(userMin.value);
  max = parseInt(userMax.value);
  resetGame(min, max);
}

//adds event listeners to submit and reset buttons
guessSubmit.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame)
