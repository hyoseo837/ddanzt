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

/**
 * Returns the full deck of card for solitaire game.
 *
 * Cards from 1 to 9 with 3 shapes, three set of 4 shapecard, one bonus card
 * => (40) cards
 */
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

/**
 * return true if the game is finished (every card was arrainged)
 * @param {Array<Array<card>>} board
 * @returns
 */
function isFinished(board) {
    for (let i = 0; i < board.length; i++) {
        const element = board[i];
        if (element.length != 0) {
            return false;
        }
    }
    return true;
}

/**
 * return the board after 1 step and code of change
 * @param {*} board
 * @param {*} completed
 * @returns
 */
function step(board, completed) {
    let code = "none";
    for (let i = 0; i < board.length; i++) {
        const element = board[i];
        if (element.length == 0) {
            continue;
        }

        if (element.slice(-1)[0].shape == "bonus") {
            element.pop();
            code = "Bonus";
            break;
        }
        if (element.slice(-1)[0].shape === "a") {
            if (element.slice(-1)[0].number == completed + 1) {
                element.pop();
                code = "a";
                break;
            }
        }
        if (element.slice(-1)[0].shape === "b") {
            if (element.slice(-1)[0].number == completed + 1) {
                element.pop();
                code = "b";
                break;
            }
        }
        if (element.slice(-1)[0].shape === "c") {
            if (element.slice(-1)[0].number == completed + 1) {
                element.pop();
                code = "c";
                break;
            }
        }
    }
    return [board, code];
}

/**
 * move number of cards from
 * @param {Array<Array<card>>} board playing board
 * @param {number} from index of where it move from on the board
 * @param {number} numberOfCards  number of cards that is moving
 * @param {number} to  index of where it move to on the board
 * @returns
 */
function moveCard(board, from, numberOfCards, to) {
    if (from > 10 || to > 10 || from < 0 || to < 0) {
        console.log("wrong domain");
        return board;
    }
    if (from == to) {
        console.log("you can move to where it came from");
        return board;
    }
    if (to >= 8) {
        if (board[to].length != 0) {
            console.log("something is there");
            return board;
        } else {
            if (numberOfCards >= 2) {
                console.log("you cannot put more than 1 cards on extra holder");
                return board;
            } else {
                board[to].push(board[from].pop());
                console.log("moved!");
                console.log(board);
                return board;
            }
        }
    } else {
        let tmp = board[from].slice(0, numberOfCards);
        if (board[to].length == 0) {
            board[from] = board[from].slice(numberOfCards);
            board[to] = tmp;
            console.log("moved!");
            return board;
        } else {
            const topCard = tmp.slice[-1];
            const targetCard = board[to][0];
            if (topCard.shape == targetCard.shape) {
                console.log("you cannot put on the same shape");
                return board;
            } else {
                if (topCard.number == targetCard.number - 1) {
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

export { initializeBoard, moveCard, step, card };
