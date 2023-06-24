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
        this.timeRemaining = this.totalTime;
        this.countdown = this.startCountdown();
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
    
    shuffleCards() {
        for (let i = this.cardsArray.length() - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }   
    }

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
        let exp = document.getElementsByClassName("card");
        for (let i = 0; i < 10; i++) {
            exp[i].style.backgroundColor = randomColor;
        }
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new ColorMatch(10, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove("visible");
            game.startGame();
        })
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.countCard(card);
            game.setRandomColor();
        });
    });
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} 
else {
    ready();
}

