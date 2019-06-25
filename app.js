/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

const RESET_VALUE = 2;

let vin_value = 100;
let activePlayer = 0;
let current = 0;
let players = [0, 0];
let vinsTable = localStorage.getObj("vins_table") || {};
const diceElement_1 = document.getElementById('firstDice');
const diceElement_2 = document.getElementById('secondDice');

const Gamer = function(name, vins=0, score=0) {
  this.name = name;
  this.vins = vins;
  this.score = score; 
};

Gamer.prototype.getScore = function() {
  return this.score;
};
Gamer.prototype.setScore = function(score) {
  return this.score += score;  //add new score to scores
}; 
Gamer.prototype.resetScore = function() {
  return this.score = 0;
};


const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement_1.style.display = 'none';
  diceElement_2.style.display = 'none';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
  current = 0;
  vin_value = Math.round(document.getElementById('input-vin-value').value) || 100;
  document.getElementById('input-vin-value').value = vin_value;

  let player1_name = prompt("Имя первого игрока:", players[0].name) || "player1";
  let player2_name = prompt("Имя первого игрока:", players[1].name) || "player1";
  players[0] = (vinsTable[player1_name]) ? 
    new Gamer(player1_name, vinsTable[player1_name]) : new Gamer(player1_name);
  players[1] = (vinsTable[player2_name]) ? 
    new Gamer(player2_name, vinsTable[player2_name]) : new Gamer(player2_name);
  
  localStorage.setItem("test", players);
  console.log(localStorage.getItem("test")[1].name);
  document.getElementById('name-0').innerHTML = players[0].name;
  document.getElementById('name-1').innerHTML = players[1].name;
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

    if (players[activePlayer].score + current >= vin_value) {
      players[activePlayer].vins++;
      vinsTable[players[activePlayer].name] = players[activePlayer].vins;
      localStorage.setObj("vins_table", vinsTable);
      alert(`${players[activePlayer].name} won!!!`);
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
  players[activePlayer].setScore(current);
  document.querySelector(`#score-${activePlayer}`).textContent = players[activePlayer].getScore();
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

document.querySelector('.btn-vins').addEventListener('click', function() {
  let vinTable_sort_arr = Object.entries(vinsTable).sort(function(a, b) {
    if (a[1]<b[1]) return 1;
    if (a[1]>b[1]) return -1;
  });
  let message = '';
  for (i=0; i<vinTable_sort_arr.length; i++) {
    message += vinTable_sort_arr[i].join(' : ') + '\n\r';
  }
  alert(message);
});
