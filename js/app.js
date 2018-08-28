const Game = require("./game.js");

const newGame = new Game();
newGame.showSnorlax();
newGame.showOrange();
newGame.showApple();
newGame.showOpponent();
newGame.startGame();

document.addEventListener("keydown", function(event) {
    newGame.turnSnorlax(event);
});