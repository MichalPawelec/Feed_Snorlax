const Snorlax = require("./snorlax.js");
const Orange = require("./orange.js");
const Apple = require("./apple.js");
const Machamp = require("./machamp.js");

const Game = function() {
    const self = this;

    this.board = document.querySelectorAll("#board div");
    this.snorlax = new Snorlax();
    this.orange = new Orange();
    this.apple = new Apple();
    this.machamp = new Machamp();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showSnorlax = function() {
        this.board[this.index(this.snorlax.x, this.snorlax.y)].classList.add("snorlax");
    };
    this.showOrange = function() {
        this.board[this.index(this.orange.x, this.orange.y)].classList.add("orange");
    };
    this.showApple = function() {
        this.board[this.index(this.apple.x, this.apple.y)].classList.add("apple");
    };
    this.showMachamp = function() {
        this.board[this.index(this.machamp.x, this.machamp.y)].classList.add("machamp");
    };
    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveSnorlax();
        }, 250);
    };

    this.moveSnorlax = function() {
        this.gameOver();
        this.hideVisibleSnorlax();

        if (this.snorlax.direction === "right") {
            this.snorlax.x = this.snorlax.x + 1;
        } else if (this.snorlax.direction === "left") {
            this.snorlax.x = this.snorlax.x - 1;
        } else if (this.snorlax.direction === "up") {
            this.snorlax.y = this.snorlax.y + 1;
        } else if (this.snorlax.direction === "down") {
            this.snorlax.y = this.snorlax.y - 1;
        }
        this.showSnorlax();
        this.checkOrangeCollision();
        this.checkAppleCollision();
    };
    this.hideVisibleSnorlax = function() {
        document.querySelector(".snorlax").classList.remove("snorlax");
    };

    this.turnSnorlax = function (event) {
        switch (event.which) {
            case 39:
                self.snorlax.direction = "right";
                break;
            case 37:
                self.snorlax.direction = "left";
                break;
            case 40:
                self.snorlax.direction = "up";
                break;
            case 38:
                self.snorlax.direction = "down";
                break;
            default:
        }
    };

    this.checkOrangeCollision = function() {
        if (this.snorlax.x === this.orange.x && this.snorlax.y === this.orange.y) {
            document.querySelector(".orange").classList.remove("orange");
            const scoreCounter = document.querySelector("#score div strong");

            this.orange = new Orange();
            this.showOrange();

            this.score++;
            scoreCounter.innerText = this.score;
        }
    };

    this.checkAppleCollision = function() {
        if (this.snorlax.x === this.apple.x && this.snorlax.y === this.apple.y) {
            document.querySelector(".apple").classList.remove("apple");
            const scoreCounter = document.querySelector("#score div strong");

            this.apple = new Apple();
            this.showApple();

            this.score++;
            scoreCounter.innerText = this.score;
        }
    };

    this.gameOver = function() {
        if (this.snorlax.x < 0 || this.snorlax.y < 0 || this.snorlax.x > 9 || this.snorlax.y > 9 || this.snorlax.x === this.machamp.x && this.snorlax.y === this.machamp.y) {
            clearInterval(this.idSetInterval);
            this.board[this.index(this.orange.x, this.orange.y)].classList.remove("orange");
            this.board[this.index(this.apple.x, this.apple.y)].classList.remove("apple");
            document.querySelector("#board").classList.add("invisible");
            document.querySelector("#score").classList.add("invisible");
            document.querySelector("#over").classList.remove("invisible");
            const pre = document.createElement("pre");
            document.querySelector("#over").appendChild(pre);
            pre.innerText = this.score;
            document.querySelector("#over pre").innerText = this.score;
            this.hideVisibleSnorlax();
        }
    };
};

module.exports = Game;