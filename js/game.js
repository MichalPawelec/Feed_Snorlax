const Snorlax = require('./snorlax.js');
const Orange = require('./orange.js');
const Apple = require('./apple.js');
const Opponent = require('./opponent.js');

const Game = function() {
    const self = this;

    this.singleField = document.querySelectorAll('#board div');
    this.gameBoard = document.getElementById('board');
    this.scoreBackground = document.querySelector('#score div')
    this.snorlax = new Snorlax();
    this.orange = new Orange();
    this.apple = new Apple();
    this.opponent = new Opponent();
    this.score = 0;
    
    this.index = function (x, y) {
        return x + (y * 10);
    };
    
    this.showSnorlax = function() {
        this.singleField[this.index(this.snorlax.x, this.snorlax.y)].classList.add('snorlax');
    };
    
    this.showOrange = function() {
        this.singleField[this.index(this.orange.x, this.orange.y)].classList.add('orange');
    };
    
    this.showApple = function() {
        this.singleField[this.index(this.apple.x, this.apple.y)].classList.add('apple');
    };

    this.showOpponent = function() {
        this.singleField[this.index(this.opponent.x, this.opponent.y)].classList.add('opponent');

        const imgArray = ['alakazam.png', 'machamp.png', 'golem.png', 'pinsir.png', 'charizard.png', 'tyranitar.png'];
        const basePath = 'images/';
        let randomImg = imgArray[Math.floor(Math.random() * imgArray.length)];
        document.querySelector('.opponent').style.backgroundImage = "url(" + (basePath + randomImg) + ")";
    };

    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveSnorlax();
        }, 300);
    };
    
    this.changeBackground = function () {
        if (this.score >= 5 && this.score < 10) {
            this.gameBoard.style.backgroundImage = "url(images/desert.png)";
            self.scoreBackground.style.backgroundColor='#966824';
        } else if (this.score >= 10 && this.score < 20) {
            this.gameBoard.style.backgroundImage = "none";
            this.gameBoard.style.backgroundColor = "#ffa544";
            self.scoreBackground.style.backgroundColor='#f44430';
        } else if (this.score >= 20) {
            this.gameBoard.style.backgroundColor = "#13ada3";
            self.scoreBackground.style.backgroundColor='0084ad';
        }
    };

    this.moveSnorlax = function() {
        this.gameOver();
        this.hideVisibleSnorlax();

        if (this.snorlax.direction === 'right') {
            this.snorlax.x = this.snorlax.x + 1;
        } else if (this.snorlax.direction === 'left') {
            this.snorlax.x = this.snorlax.x - 1;
        } else if (this.snorlax.direction === 'up') {
            this.snorlax.y = this.snorlax.y + 1;
        } else if (this.snorlax.direction === 'down') {
            this.snorlax.y = this.snorlax.y - 1;
        }
        this.showSnorlax();
        this.checkOrangeCollision();
        this.checkAppleCollision();
    };

    this.gameSpeedUp = function() {
        if (this.score >= 5 && this.score < 10) {
            clearInterval(self.idSetInterval);
            self.idSetInterval = setInterval(function() {
                self.moveSnorlax();
            }, 250);
        } else if (this.score >= 10 && this.score < 20) {
            clearInterval(self.idSetInterval);
            self.idSetInterval = setInterval(function() {
                self.moveSnorlax();
            }, 200);
        } else if (this.score >= 20) {
            clearInterval(self.idSetInterval);
            self.idSetInterval = setInterval(function() {
                self.moveSnorlax();
            }, 150);
        }
    };

    this.turnSnorlax = function (event) {
        switch (event.which) {
            case 39:
                self.snorlax.direction = 'right';
                break;
            case 37:
                self.snorlax.direction = 'left';
                break;
            case 40:
                self.snorlax.direction = 'up';
                break;
            case 38:
                self.snorlax.direction = 'down';
                break;
            default:
        }
    };

    this.checkOrangeCollision = function() {
        if (this.snorlax.x === this.orange.x && this.snorlax.y === this.orange.y) {
            document.getElementById('collectSound').play();
            document.querySelector('.orange').classList.remove('orange');
            const scoreCounter = document.querySelector('#score div strong');

            this.orange = new Orange();
            this.showOrange();

<<<<<<< HEAD
            // this.hideVisibleOpponent();
            //
            // this.opponent = new Opponent();
            // this.showOpponent();
=======
            this.hideVisibleOpponent();

            this.opponent = new Opponent();
            this.showOpponent();
>>>>>>> 15a21b7ebb5ceee7f40c1adaed29ee8969d43a5b

            this.score++;
            this.gameSpeedUp();
            this.changeBackground();
            scoreCounter.innerText = this.score;
        }
    };

    this.checkAppleCollision = function() {
        if (this.snorlax.x === this.apple.x && this.snorlax.y === this.apple.y) {
            document.getElementById('collectSound').play();
            document.querySelector('.apple').classList.remove('apple');
            const scoreCounter = document.querySelector('#score div strong');

            this.apple = new Apple();
            this.showApple();

<<<<<<< HEAD
            // this.hideVisibleOpponent();
            //
            // this.opponent = new Opponent();
            // this.showOpponent();
=======
            this.hideVisibleOpponent();

            this.opponent = new Opponent();
            this.showOpponent();
>>>>>>> 15a21b7ebb5ceee7f40c1adaed29ee8969d43a5b

            this.score++;
            this.gameSpeedUp();
            this.changeBackground();
            scoreCounter.innerText = this.score;
        }
    };

    this.hideVisibleSnorlax = function() {
        document.querySelector('.snorlax').classList.remove('snorlax');
    };

    this.hideVisibleOpponent = function() {
        document.querySelector('.opponent').classList.remove('opponent');
        this.singleField[this.index(this.opponent.x, this.opponent.y)].classList.remove('opponent');
    };

    this.gameOver = function() {
        if (this.snorlax.x < 0 || this.snorlax.y < 0 || this.snorlax.x > 9 || this.snorlax.y > 9 || this.snorlax.x === this.opponent.x && this.snorlax.y === this.opponent.y) {
            clearInterval(this.idSetInterval);
            document.getElementById('gameOverSound').play();
            this.singleField[this.index(this.orange.x, this.orange.y)].classList.remove('orange');
            this.singleField[this.index(this.apple.x, this.apple.y)].classList.remove('apple');
            this.gameBoard.classList.add('invisible');
            this.hideVisibleOpponent();
            document.querySelector('#score').classList.add('invisible');
            document.querySelector('#over').classList.remove('invisible');
            const pre = document.createElement('pre');
            document.querySelector('#over').appendChild(pre);
            pre.innerText = this.score;
            document.querySelector('#over pre').innerText = this.score;
            this.hideVisibleSnorlax();
        }
    };
};

module.exports = Game;