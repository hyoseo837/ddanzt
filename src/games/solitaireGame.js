class card {
    constructor(shape, number) {
        this.shape = shape;
        this.number = number;
    }
    prt() {
        console.log(this.number, this.shape);
    }
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function fullDeck() {
    const wholeDeck = [];
    for (let i = 0; i < 9; i++) {
        wholeDeck.push(new card("a", i + 1));
    }
    for (let i = 0; i < 9; i++) {
        wholeDeck.push(new card("b", i + 1));
    }
    for (let i = 0; i < 9; i++) {
        wholeDeck.push(new card("c", i + 1));
    }
    for (let i = 0; i < 4; i++) {
        wholeDeck.push(new card("x", i));
        wholeDeck.push(new card("y", i));
        wholeDeck.push(new card("z", i));
    }
    wholeDeck.push(new card("bonus", 0));
    return wholeDeck;
}

function initializeBoard() {
    let board = [[], [], [], [], [], [], [], [], [], [], []];
    let deck = fullDeck();
    shuffle(deck);
    for (let i = 0; i < deck.length; i++) {
        const element = deck[i];
        board[i % 8].push(element);
    }
    return board;
}

function isSelectable(lst) {
    if (lst.length === 1) {
        return true;
    } else {
        for (let i = 0; i < lst.length; i++) {
            const element = lst[i];
            if (["x", "y", "z", "bonus"].includes(element.shape)) {
                return false;
            }
        }
        for (let i = 0; i < lst.length - 1; i++) {
            if (lst[i].shape === lst[i + 1].shape) {
                return false;
            } else {
                if (lst[i].number !== lst[i + 1].number - 1) {
                    return false;
                }
            }
        }
        return true;
    }
}

function shownCards(board) {
    let tmp = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i].length === 0) {
            tmp.push(null);
            continue;
        }
        tmp.push(board[i][0]);
    }
    return tmp;
}

function moveCard(board, from, numberOfCards, to) {
    if (from > 10 || to > 10 || from < 0 || to < 0) {
        console.log("wrong domain");
        return board;
    }
    if (from === to) {
        console.log("you can move to where it came from");
        return board;
    }
    if (to >= 8) {
        if (board[to].length !== 0) {
            console.log("something is there");
            return board;
        } else {
            if (numberOfCards >= 2) {
                console.log("you cannot put more than 1 cards on extra holder");
                return board;
            } else {
                board[to].unshift(board[from].shift());
                console.log("moved!");
                return board;
            }
        }
    } else {
        let tmp = board[from].slice(0, numberOfCards);
        if (board[to].length === 0) {
            board[from] = board[from].slice(numberOfCards);
            board[to] = tmp;
            console.log("moved!");
            return board;
        } else {
            const topCard = tmp.slice(-1)[0];
            const targetCard = board[to][0];
            if (["x", "y", "z", "bonus"].includes(targetCard.shape)) {
                console.log("you cannot put on the special card");
                return board;
            }
            if (["x", "y", "z", "bonus"].includes(topCard.shape)) {
                console.log("you cannot put the special card ");
                return board;
            }
            if (topCard.shape === targetCard.shape) {
                console.log("you cannot put on the same shape");
                return board;
            } else {
                if (topCard.number === targetCard.number - 1) {
                    board[from] = board[from].slice(numberOfCards);
                    board[to] = [...tmp, ...board[to]];
                    console.log("moved!");
                    return board;
                } else {
                    console.log("you cannot put on that number");
                    return board;
                }
            }
        }
    }
}

export { initializeBoard, moveCard, card, isSelectable, shownCards };
