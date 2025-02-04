const colors = ["#8A2BE2", "#D2691E", "#FFD700", "#D2691E", "#5F9EA0", "#FF6347"];

let correctColor = "";
let score = 0;


const colorBox = document.getElementById('colorBox');
const gameInstructions = document.getElementById('gameInstructions');
const gameStatus = document.getElementById('gameStatus');
const scoreElement = document.getElementById('score');
const colorOptionsContainer = document.getElementById('colorOptions');
const newGameButton = document.getElementById('newGameButton');

function startNewGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    gameStatus.textContent = "";
    gameInstructions.textContent = "Guess the correct color!";
    generateNewColor();
    generateColorOptions();
}

function generateNewColor() {
    correctColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = correctColor;
}


function generateColorOptions() {
    colorOptionsContainer.innerHTML = "";
    const shuffledColors = shuffle([...colors]);
    
    shuffledColors.forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.style.backgroundColor = color;
        colorButton.setAttribute('data-testid', 'colorOption');
        colorButton.addEventListener('click', () => checkGuess(color));
        colorOptionsContainer.appendChild(colorButton);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkGuess(guessedColor) {
    if (guessedColor === correctColor) {
        gameStatus.textContent = "Correct! Well done!";
        gameStatus.style.color = "green";
        score++; // Increase score
        scoreElement.textContent = `Score: ${score}`;
        setTimeout(() => {
            generateNewColor(); 
            generateColorOptions(); 
            gameStatus.textContent = ""; 
        }, 1000); 
    } else {
        gameStatus.textContent = "Wrong! Try again!";
        gameStatus.style.color = "red";
    }
}

// Event listeners
newGameButton.addEventListener('click', startNewGame);

startNewGame();
