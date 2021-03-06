// the computer will pick a random word 
var userOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var computerOptions = ["longbow", "dagger", "swords", "musket", "elephant", "pike", "castle", "moat", "drawbridge"];
var computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];

// for verifying functionality
console.log("Computer choice: " + computerChoice);

// setting up variables
var numWins = 0;
var attempts = 12;

// this array will store the letters already guessed
var guesses = [];

// this array will store the hidden word
var hiddenWord = [];

// this array will hold the computer word to check for a win
var computerWord = [];

// this function will reset the game after a win or loss
function resetGame() {

    attempts = 12;
    attemptsText.textContent = attempts;

    guesses = [];
    guessesText.textContent = guesses;

    // picking a new word from the array
    computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    console.log("Computer choice: " + computerChoice);

    // resetting arrays for comparison
    hiddenWord = [];
    computerWord = [];

    for (var i = 0; i < computerChoice.length; i++) {
        hiddenWord.push("-");
    }
    wordDisplay.textContent = hiddenWord.join("");
    
    for (var i = 0; i < computerChoice.length; i++) {
        computerWord.push(computerChoice[i]);
    }

    return attempts, guesses, computerChoice, hiddenWord, computerWord;
}

// function to check if hiddenWord and computerWord are identical
function checkArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        } 
    }
    return true;
}

// function to display photo after a win
function displayPhoto(medieval) {
    if (medieval == "longbow") {
        medievalImage.src = "assets/images/longbow.jpg"
    } else if (medieval == "dagger") {
        medievalImage.src = "assets/images/dagger.jpg"
    } else if (medieval == "swords") {
        medievalImage.src = "assets/images/swords.jpg"
    } else if (medieval == "musket") {
        medievalImage.src = "assets/images/musket.jpg"
    } else if (medieval == "elephant") {
        medievalImage.src = "assets/images/elephant.jpg"
    } else if (medieval == "pike") {
        medievalImage.src = "assets/images/pike.jpg"
    } else if (medieval == "castle") {
        medievalImage.src = "assets/images/castle.jpg"
    } else if (medieval == "moat") {
        medievalImage.src = "assets/images/moat.jpeg"
    } else if (medieval == "drawbridge") {
        medievalImage.src = "assets/images/drawbridge.jpg"
    }
}

// assigning variables to the HTML elements we're changing
var winsText = document.getElementById("wins");
var wordDisplay = document.getElementById("word-display");
var attemptsText = document.getElementById("guesses-left");
var guessesText = document.getElementById("already-guessed");
var medievalImage = document.getElementById("medievalImage");

for (var i = 0; i < computerChoice.length; i++) {
    hiddenWord[i] = "-";
}
wordDisplay.textContent = hiddenWord.join("");

for (var i = 0; i < computerChoice.length; i++) {
    computerWord[i] = computerChoice[i];
}

document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();

    // checking that the input is a letter and has not already been guessed
    if ((userOptions.indexOf(letter) > -1) && (guesses.indexOf(letter) < 0)) {
        // checking if the input is in the computer's word
        if (computerWord.indexOf(letter) > -1) {
            // replacing the "-" in the hidden word with the correct letter
            for (var i = 0; i < computerWord.length; i++) {
                if (letter == computerWord[i]) {
                    hiddenWord[i] = letter;
                    wordDisplay.textContent = hiddenWord.join("");
                }
            }

            // updating the guessed letters
            guesses += letter;
            guessesText.textContent = guesses;
        } else {
            // lose an attempt for an incorrect guess
            attempts -= 1;
            attemptsText.textContent = attempts;

            // updating the guessed letters
            guesses += letter;
            guessesText.textContent = guesses;
        }

        // conditions for a win
        if (checkArrays(hiddenWord, computerWord)) {
            numWins += 1;
            winsText.textContent = numWins;
            displayPhoto(computerChoice);
            resetGame();
        }
        // conditions for a loss
        if (attempts === 0) {
            resetGame();
        }
    }
}
