let blackjackGame = {
    'you': { 'scorespan': '#your-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scorespan': '#dealer-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
    'cards-map': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'A': [1, 11], 'J': 10, 'K': 10, 'Q': 10 },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const HITSOUND = new Audio("/sounds/swish.m4a");
const WINSOUND = new Audio("/sounds/cash.mp3");
const LOSTSOUND = new Audio("/sounds/aww.mp3");

document.querySelector('#hit-btn').addEventListener('click', blackjackHit);

document.querySelector('#stand-btn').addEventListener('click', dealerLogic);

document.querySelector('#deal-btn').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randmCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randmCard() {
    let rNum = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][rNum];
}


function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HITSOUND.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector("#your-box").querySelectorAll('img');
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++)
            yourImages[i].remove();
        for (let i = 0; i < dealerImages.length; i++)
            dealerImages[i].remove();

        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(YOU['scorespan']).textContent = 0;
        document.querySelector(YOU['scorespan']).style.color = 'white';

        document.querySelector(DEALER['scorespan']).textContent = 0;
        document.querySelector(DEALER['scorespan']).style.color = 'white';

        document.querySelector("#blackjack-result").textContent = "Let's Play!";
        document.querySelector("#blackjack-result").style.color = 'white';

        blackjackGame['turnsOver'] = true;

    }

}

function updateScore(card, activePlayer) {
    //If Ace is encountered.

    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cards-map'][card][1] <= 21)
            activePlayer['score'] += blackjackGame['cards-map'][card][1];
        else
            activePlayer['score'] += blackjackGame['cards-map'][card][0];
    } else
        activePlayer['score'] += blackjackGame['cards-map'][card];
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    } else
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
}
const sleep = m => new Promise(r => setTimeout(r, m))

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randmCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(800);
    }

    blackjackGame['turnsOver'] = true;
    showResult(computeWinner());
}

function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (blackjackGame['turnsOver'] == true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "You won!";
            messageColor = 'green';
            WINSOUND.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "You lost!";
            messageColor = 'red';
            LOSTSOUND.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "You drew!";
            messageColor = 'white';
        }

        document.querySelector("#blackjack-result").textContent = message;
        document.querySelector("#blackjack-result").style.color = messageColor;
    }
}