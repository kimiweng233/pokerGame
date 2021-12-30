export default function SetUpDeck() {
    const faces1 = ["🀀", "🀁", "🀂", "🀃", "🀄", "🀅", "🀆"]
    const faces2 = [["🀇", "🀈", "🀉", "🀊", "🀋", "🀌", "🀍", "🀎", "🀏"],
        ["🀐", "🀑", "🀒", "🀓", "🀔", "🀕", "🀖", "🀗", "🀘"],
        ["🀙", "🀚", "🀛", "🀜", "🀝", "🀞", "🀟", "🀠", "🀡"]]

    var deck = []
    var card

    for (var i=0; i < faces1.length; i++) {
        for (var j=0; j < 4; j++) {
            card = {'face': faces1[i], 'value': null}
            deck.push(card)
        }
    }
    for (var i=0; i < 3; i++) {
        for (var j=0; j < 9; j++) {
            for (var k=0; k < 4; k++) {
                card = {'face': faces2[i][j], 'value': j+1}
                deck.push(card)
            }
        }
    }

    let currentIndex = deck.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [deck[currentIndex], deck[randomIndex]] = [
            deck[randomIndex], deck[currentIndex]];
        }

    return deck
}