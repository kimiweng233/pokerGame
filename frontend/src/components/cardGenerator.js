export default function SetUpDeck() {
    const suits = ["spades", "clubs", "hearts", "diamonds"]
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    var deck = []
    var card

    for (var i=0; i<4; i++) {
        for (var j=0; j<13; j++) {
            card = {suit:suits[i], value:values[j]}
            deck.push(card)
        }
    }

    let currentIndex = deck.length, randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [deck[currentIndex], deck[randomIndex]] = [
            deck[randomIndex], deck[currentIndex]];
        }

    return deck
}