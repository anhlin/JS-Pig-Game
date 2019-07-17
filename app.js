/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* DOM: Document Object Model 
    - structured representation of an HTML document
    - The DOM is used to connect webpages to scripts like JS
    - For each HTML box there is an object in the DOM that we can access and interact with
*/

var scores, roundScore, currentPlayer, dice, prevDice, inProgress;

init(); 

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(inProgress){
        //1. Random Number 1-6
        dice = Math.floor(Math.random() * 6) + 1;
        //2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; 
        diceDOM.src = 'dice-' + dice + '.png'; 
        //3. Update round score if rolled number != 1 
        if (dice !== 1){
            //Add Score
            roundScore += dice; 
            document.getElementById('current-' + currentPlayer).textContent = roundScore;
        } else {
            togglePlayer(); 
        }
        if (prevDice === 6 && dice === 6){
            scores[currentPlayer] = 0; 
            document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
            togglePlayer();
        } 
        prevDice = dice; 
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    //Update scores array
    if(inProgress){
        scores[currentPlayer] += roundScore; 
        //Set overall score to current score
        document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
        if(scores[currentPlayer] >= 100) {
            document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            inProgress = false;
        } else {
            togglePlayer(); 
        }
    }
}); 

document.querySelector('.btn-new').addEventListener('click', init); 

function togglePlayer() {
        //Reset round score
        roundScore = 0; 
        //Switch players
        currentPlayer === 1 ? currentPlayer = 0 : currentPlayer = 1; 
        //Reset current scores
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}

function init () {
    scores = [0, 0]; 
    roundScore = 0; 
    currentPlayer = 0; 
    inProgress = true;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}