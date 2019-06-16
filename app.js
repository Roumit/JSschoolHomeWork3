/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;
const VIN_VALUE = 100;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
const diceElement_1 = document.getElementById('firstDice');
const diceElement_2 = document.getElementById('secondDice');

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement_1.style.display = 'none';
  diceElement_2.style.display = 'none';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
  scores = [0, 0];
  current = 0;
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  let dice_1 = Math.floor(Math.random() * 6) + 1;
  let dice_2 = Math.floor(Math.random() * 6) + 1;

  diceElement_1.src = `dice-${dice_1}.png`;
  diceElement_1.style.display = 'block';
  diceElement_2.src = `dice-${dice_2}.png`;
  diceElement_2.style.display = 'block';

  if (dice_1 !== RESET_VALUE && dice_2 !== RESET_VALUE && dice_1 !== dice_2) {
    current += dice_1 + dice_2;
    document.getElementById('current-'+activePlayer).textContent = current;

    if (scores[activePlayer] + current >= VIN_VALUE) {
      alert(`Player ${activePlayer+1} won!!!`);
      document.querySelector('.btn-roll').style.display = 'none';
      document.querySelector('.btn-hold').style.display = 'none';

    }
    
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElement_1.style.display = 'none';
  diceElement_2.style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
