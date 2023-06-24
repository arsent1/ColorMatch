class ColorMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById("time-remaining");
        this.ticker = document.getElementById("points");
    }

    startGame() {
        this.totalPoints = 0;
        this.level = 0;
        this.ticker.innerText = this.totalPoints;
        this.timer.innerText = this.totalTime;
        this.timeRemaining = this.totalTime;
        this.countdown = this.startCountdown();
        this.getDiffIndex();
        this.setRandomColor();
        this.setDiffCard(this.diffIndex);
    }

    countCard(card) {
        if (this.correctCard(card)) {
            this.totalPoints++;
            this.ticker.innerText = this.totalPoints;
        }
    }

    correctCard() {
        return true;
    }
    
    // shuffleCards() {     
    //     for (let i = this.cardsArray.length() - 1; i > 0; i--) {
    //         let randIndex = Math.floor(Math.random() * (i+1));
    //         this.cardsArray[randIndex].style.order = i;
    //         this.cardsArray[i].style.order = randIndex;
    //     }   
    // }

    startCountdown() {
        return setInterval( () => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining == 0) {
                this.gameOver();
            }
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        document.getElementById("game-over-text").classList.add("visible");
    }

    generateRandomColor(){
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);   
        return `#${randColor.toUpperCase()}`
    }
    
    setRandomColor() {
        let randomColor = this.generateRandomColor();
        for (let i = 0; i < 9; i++) {
            this.cardsArray[i].style.backgroundColor = randomColor;
        }
    }

    getDiffIndex() {
        let index = Math.floor(Math.random() * 9);
        this.diffIndex = index; //Update class member that stores the index of diffrent colored tile
    }

    setDiffCard(index) {
        let element = this.cardsArray[index];

        // Get the current color of the element
        let currentColor = getComputedStyle(element).getPropertyValue("background-color");

        // Convert the color to RGB format
        let rgbValues = currentColor.match(/\d+/g);
        let red = parseInt(rgbValues[0]);
        let green = parseInt(rgbValues[1]);
        let blue = parseInt(rgbValues[2]);

        // Calculate the new color values by adding/subtracting an offset
        let colorOffset = 50; // Adjust this value as needed

        if (this.level == 1) {
            colorOffset = 25;
        } 
        else if (this.level == 2) {
            colorOffset = 12;
        }
        else if (this.level == 3) {
            colorOffset = 6;
        }

        let newRed = red + colorOffset;
        let newGreen = green + colorOffset;
        let newBlue = blue + colorOffset;

        // Apply the new color to the element
        element.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
    }

    getCardIndex(card) {
        let cardIndex = null;
        for (let i = 0; i < 9; i++) {
            if (this.cardsArray[i] == card) {
                cardIndex = i;
            }
        }
        return cardIndex;
    }

    // Check if card clicked is == to the diffIndex go to next round, if not game over
    checkCorrect(card1) {
        if (this.getCardIndex(card1) == this.diffIndex) {
            this.countCard(card1);
            this.setLevel();
            this.setRandomColor();
            this.getDiffIndex();
            this.setDiffCard(this.diffIndex);
        }
        else {
            this.gameOver();
        }
    }

    setLevel() {
        if (this.totalPoints < 10) {
            this.level = 0;
        }
        else if (this.totalPoints >= 10 && this.totalPoints < 20) {
            this.level = 1;
        }
        else if (this.totalPoints >= 20 && this.totalPoints < 30) {
            this.level = 2;
        }
        else {
            this.level = 3;
        }
    }

    
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new ColorMatch(30, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove("visible");
            game.startGame();
        })
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.checkCorrect(card);
        });
    });
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} 
else {
    ready();
}

