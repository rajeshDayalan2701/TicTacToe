const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let cellElements = document.querySelectorAll('[data-cell]');
let board = document.getElementById('board');
let isCircleTurn;
let winningCombinations = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
];
let restartButton = document.getElementById('restart-button');
let matchOverElement = document.getElementById('match-over-element');
let matchOverText = document.getElementById('match-over-text');
let playerName = document.getElementById('player-name');

restartButton.addEventListener('click', () => {
	startGame();
});

//starts the game
startGame();

function startGame () {
	isCircleTurn = false;
	matchOverElement.classList.remove('show');
	//remove if any classes attached with each cell
	cellElements.forEach(cell => {
		cell.classList.remove('x');
		cell.classList.remove('circle');
		cell.removeEventListener('click', handleClick);
	});

	//add event listener of CLICK for each cell
	cellElements.forEach(cell => {
		cell.addEventListener('click', handleClick, { once: true},);
	});

	//choose the player
	changePlayer();
}

function handleClick (e) {
	let cell = e.target;
	isCircleTurn ? cell.classList.add('circle') : cell.classList.add('x');

	if (checkForWin()) {
		populateMatchOverElement(false);
	} else if (checkForDraw()) {
		populateMatchOverElement(true);
	} else {
		//change the player
		isCircleTurn = !isCircleTurn;
		changePlayer();
	}
}

function changePlayer () {
	removeClassFromBoard();
	if (isCircleTurn) {
		board.classList.add('circle')
		playerName.innerText = 'Circle\'s Turn';
	} else {
		board.classList.add('x');
		playerName.innerText = 'X\'s Turn';
	}
}

function checkForWin () {
	return winningCombinations.some((combination) => {
		return combination.every((position) => {
			if (isCircleTurn) {
				return cellElements[position - 1].classList.contains('circle');
			} else {
				return cellElements[position - 1].classList.contains('x');
			}
		});
	});
}

function checkForDraw () {
	return [...cellElements].every((cell) => cell.classList.contains('circle') || cell.classList.contains('x'));
}

function populateMatchOverElement (draw) {
	matchOverElement.classList.add('show');
	if (draw) {
		matchOverText.innerText = 'Match Draw';
	} else {
		if (isCircleTurn) {
			matchOverText.innerText = 'Circle-Wins'
		} else {
			matchOverText.innerText = 'X-Wins'
		}
	}
}

function removeClassFromBoard () {
	board.classList.remove('circle');
	board.classList.remove('x');
}
