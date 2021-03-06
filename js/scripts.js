


var newGameBtn = document.getElementById('js-newGameButton'), 
	pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
	playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');


newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('kamień') });
pickPaper.addEventListener('click', function() { playerPick('papier') });
pickScissors.addEventListener('click', function() { playerPick('nożyczki') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
        break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();
var x = Math.random();
Math.floor(Math.random()*3);

function getComputerPick() {
    var possiblePicks = ['kamień', 'papier', 'nożyczki'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; 
    } else if (
        (computerPick == 'kamień' &&  playerPick == 'nożyczki') ||
        (computerPick == 'nożyczki' &&  playerPick == 'papier') ||
        (computerPick == 'papier' &&  playerPick == 'kamień') ) {
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    }
    setGamePoints();
    checkGameWinner(player.score, computer.score);
}

function checkGameWinner(playerScore, computerScore) {
    if (playerScore == 10 ) {
        alert('Wygral gracz! ' + player.name);
        setGameElements(gameState = 'ended');
    } else if (computerScore == 10) {
        alert('Wygral komputer!');
        setGameElements(gameState = 'ended');
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');

    if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}








