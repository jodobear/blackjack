// blackjack codeworks 19-05-10

// getting buttons as js objects
const deal = document.getElementById("deal")
const hit = document.getElementById("hit")
const stay = document.getElementById("stay")
const again = document.getElementById("again")

// getting elements as js objects
let pHand = document.getElementById("playerHand")
let dHand = document.getElementById("dealerHand")
let pBoard = document.getElementById("playerScore")
let dBoard = document.getElementById("dealerScore")

// variables init
let pScore = 0;
let dScore = 0;
let points = 0;
let usedCards = [];

const deck = [];
const suits = ['S', 'H', 'C', 'D'];
const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const createDeck = () => {
    for (let i=0; i < suits.length; i++) {
        for (let j=0; j < faces.length; j++) {
            let value = parseInt(faces[j]);
            if (faces[j] == 'J' || faces[j] == 'Q' || faces[j] == 'K') {
                value = 10;
            }
            if (faces[j] == 'A') {
                value = 11;
            }
            let card = {face: faces[j], suit: suits[i], weight: value};
            deck.push(card);
        }
    }
}
createDeck()

console.log(deck)
const dealCard = () => {    // card dealing func
    let rand = Math.floor(Math.random() * deck.length);
    card = deck[rand]
    usedCards.push(card);
    points = card.weight;
    deck.splice(rand, 1);
    return "Cards/" + card.face + card.suit + ".jpg";
}
const draw = () => {        // draw func
    pBoard.textContent = "Player Score: " + pScore + "Phew! It's a Draw!";
    dBoard.textContent = "Dealer Score: " + dScore + "What th-! A Draw?!";
    hit.disabled = true;
    stay.disabled = true;
}
const pWin = () => {        // player win
    pBoard.textContent = "!!! Player Score: " + pScore + " Take the money and GO! !!!";
    dBoard.textContent = " Dealer Score: " + dScore + " ********!";
    hit.disabled = true;
    stay.disabled = true;
}
const pLose = () => {       //player lose
    pBoard.textContent = "Player Score: " + pScore + " What a Looser! Boo!!!";
    dBoard.textContent = "!!! Dealer Score: " + dScore + " Gotcha !!!";
    hit.disabled = true;
    stay.disabled = true;
}
const dWin = () => {        // dealer win
    dBoard.textContent = "!!! Dealer Score: " + dScore + " Gotcha !!!";
    pBoard.textContent = "Player Score: " + pScore + " What a Looser! Boo!!!";
    hit.disabled = true;
    stay.disabled = true;
}
const dLose = () => {       // dealer lose
    dBoard.textContent = " Dealer Score: " + dScore + " ********!";
    pBoard.textContent = "!!! Player Score: " + pScore + " Take the money and GO! !!!";
    hit.disabled = true;
    stay.disabled = true;
}

const reset = () => {       // reset func

    for (let i=0; i <= usedCards.length; i++) {   // returning usedCards to deck
    let card = usedCards.pop();
    deck.push(card);
    }
    while (pHand.firstChild) {                    // removing player cards
        pHand.removeChild(pHand.firstChild);
    }
    while (dHand.firstChild) {                    // removing dealer cards
        dHand.removeChild(dHand.firstChild);
    }
    // init
    pScore = 0;
    dScore = 0;
    pBoard.textContent = "Player:";
    dBoard.textContent = "Dealer:";
}

hit.disabled = true;
stay.disabled = true;

$(document).ready(() => {
    $('#deal').on('click', () => {                      // deal button
        hit.disabled = false;
        stay.disabled = false;

        for (let i=0; i <= 1; i++) {                    // first hand to player
        var img = document.createElement('img');
        img.src = dealCard();
        pHand.appendChild(img);
        pScore += points;
        }
        var img = document.createElement('img');         // dealer's first card
        img.src = dealCard();
        dHand.appendChild(img);
        dScore += points;

        var img = document.createElement('img');          // dealer's second card - down card
        img.src = './Cards/Red_back.jpg';
        img.id = 'down_card';
        dHand.appendChild(img);

        pBoard.textContent = "Player: " + " " + pScore;  // player score update
        dBoard.textContent = "Dealer: " + " " + dScore;  // dealer score update

        if (pScore > 21) pLose();                        // player > 21
        if (pScore == 21) {                              // first hand blackjack for player: natural
            pWin();
            pBoard.textContent = pScore + "!!! What a natural born JACK you are, Blackyjack !!!";
        }
        deal.disabled = true;
    });

    $('#hit').on('click', () => {                       // hit button
        var img = document.createElement('img');
        img.src = dealCard();
        pHand.appendChild(img);
        (pScore > 10 && card.face == "A") ? pScore += 1 : pScore += points; // ace rule

        pBoard.textContent = "Player: " + " " + pScore;

        if (pScore > 21) pLose();   // player > 21
        if (pScore == 21) pWin();   // player == 21
    });

    $('#stay').on('click', () => {                      // stay Button

        document.getElementById('down_card').remove();  // removing dealer's down card

        while (dScore < 17) {                           // dealing dealer
            var img = document.createElement('img');
            img.src = dealCard();
            dHand.appendChild(img);
            (dScore > 10 && card.face == "A") ? dScore += 1 : dScore += points; // ace rule
        }
        dBoard.textContent = "Dealer:" + " " + dScore;

        if (dScore > 21) dLose();                          // dealer > 21
        else if (dScore == pScore) draw();                 // dealer == player
        else if (dScore == 21 && pScore < dScore) dWin();  // dealer == 21
        else if (dScore > pScore && dScore < 21) dWin();   // 21 > dealer > player
        else if (dScore < pScore && dScore < 21) dLose();  // 21 > player > dealer
    });

    $('#again').on('click', () => {                         // Play again button
        reset();
        deal.disabled = false;
        hit.disabled = true;
        stay.disabled = true;
    });

const $deal = $("#deal")
console.log()

})