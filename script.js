const numbers = ['20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', 'T', 'D', 'B', 'H'];
const scores = {
    player1: {},
    player2: {}
};

numbers.forEach(num => {
    scores.player1[num] = 0;
    scores.player2[num] = 0;
});

const history = [];

document.addEventListener('DOMContentLoaded', () => {
    const player1Body = document.getElementById('scoreboard-body-player1');
    const player2Body = document.getElementById('scoreboard-body-player2');
    
    numbers.forEach(num => {
        const row1 = createRow(num, 'player1');
        player1Body.appendChild(row1);
        
        const row2 = createRow(num, 'player2');
        player2Body.appendChild(row2);
    });
});

function createRow(num, player) {
    const row = document.createElement('tr');
    const numCell = document.createElement('td');
    numCell.textContent = num;
    const markCell = document.createElement('td');
    markCell.id = `score-${player}-${num}`;
    markCell.textContent = '';
    markCell.addEventListener('click', () => markScore(num, player));
    row.appendChild(numCell);
    row.appendChild(markCell);
    return row;
}

function markScore(number, player) {
    if (scores[player][number] < 3) {
        scores[player][number]++;
        updateScore(number, player);
        history.push({ player, number });
    }
}

function updateScore(number, player) {
    const markCell = document.getElementById(`score-${player}-${number}`);
    const score = scores[player][number];
    let marks = '';
    
    if (score === 1) {
        marks = '/';
    } else if (score === 2) {
        marks = 'X';
    } else if (score === 3) {
        marks = 'O';
    }
    
    markCell.textContent = marks;
}

function undo() {
    if (history.length > 0) {
        const lastAction = history.pop();
        const { player, number } = lastAction;
        if (scores[player][number] > 0) {
            scores[player][number]--;
            updateScore(number, player);
        }
    }
}

function reset() {
    numbers.forEach(num => {
        scores.player1[num] = 0;
        scores.player2[num] = 0;
    });
    history.length = 0; // Clear history
    numbers.forEach(num => {
        updateScore(num, 'player1');
        updateScore(num, 'player2');
    });
}
