const welcomeContplayer2ner = document.getElementById('welcome');
const gameContplayer2ner = document.getElementById('game');
const start = document.getElementById('start');
const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restart = document.getElementById('restart');

const player1 = 'X';
const player2 = 'O';
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

start.addEventListener('click', () => {
    welcomeContplayer2ner.style.display = 'none';
    gameContplayer2ner.style.display = 'block';
});

cells.forEach(cell => {
    cell.addEventListener('click', onCellClick);
});

restart.addEventListener('click', restartGame);

function onCellClick(e) {
    const index = e.target.dataset.index;

    if (!board[index]) {
        makeMove(index, player1);
        if (!checkWin(player1) && !checkTie()) {
            player2Move();
        }
    }
}

function makeMove(index, currentplayer1) {
    board[index] = currentplayer1;
    cells[index].textContent = currentplayer1;
}

function checkWin(currentplayer1) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentplayer1);
    });
}

function checkTie() {
    if (board.every(cell => cell)) {
        alert('It\'s a tie!');
        return true;
    }
    return false;
}

function player2Move() {
    const index = minimax(board, player2).index;
    makeMove(index, player2);
    if (checkWin(player2)) {
        alert('player2 wins!');
    }
}

function minimax(newBoard, currentplayer1) {
    const avplayer2lSpots = newBoard.filter(s => s === null);

    if (checkWin(player1)) {
        return { score: -10 };
    } else if (checkWin(player2)) {
        return { score: 10 };
    } else if (avplayer2lSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    avplayer2lSpots.forEach((_, i) => {
        const move = {};
        move.index = newBoard.indexOf(null, i);

        newBoard[move.index] = currentplayer1;

        if (currentplayer1 === player2) {
            move.score = minimax(newBoard, player1).score;
        } else {
            move.score = minimax(newBoard, player2).score;
        }

        newBoard[move.index] = null;

        moves.push(move);
    });

    let bestMove;
    if (currentplayer1 === player2) {
        let bestScore = -Infinity;
        moves.forEach(move => {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    } else {
        let bestScore = Infinity;
        moves.forEach(move => {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }

    return bestMove;
}

function restartGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
}
