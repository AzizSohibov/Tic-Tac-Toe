const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';

function checkWinner() {
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

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        winnerText.textContent = currentPlayer;
        winnerMessage.classList.remove('hidden');
        restartButton.classList.remove('hidden');
    } else if (isDraw()) {
        winnerText.textContent = 'Ничья';
        winnerMessage.classList.remove('hidden');
        restartButton.classList.remove('hidden');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X';
    winnerMessage.classList.add('hidden');
    restartButton.classList.add('hidden');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);