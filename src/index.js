/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

import { getVinValue, askForName, initDOM, hide } from "./init";
import { formVinTable } from "./vinTable";
import { btn_roll, btn_hold, setCurrentValue, setDicePicture, diceElement_1, diceElement_2, btn_vins, btn_new, setScoreValue, toggleActivePanel } from "./dom_read_write";


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


function initGame() {
  initDOM();
  current = 0;
  vin_value = getVinValue();
  players = askForName(vinsTable);
}

initGame();

btn_roll.addEventListener('click', function() {
  let dice_1 = Math.floor(Math.random() * 6) + 1;
  let dice_2 = Math.floor(Math.random() * 6) + 1;

  setDicePicture(dice_1, dice_2);

  if (dice_1 !== RESET_VALUE && dice_2 !== RESET_VALUE && dice_1 !== dice_2) {
    current += dice_1 + dice_2;
    setCurrentValue(activePlayer, current);

    if (players[activePlayer].score + current >= vin_value) {
      players[activePlayer].vins++;
      vinsTable[players[activePlayer].name] = players[activePlayer].vins;
      localStorage.setObj("vins_table", vinsTable);
      alert(`${players[activePlayer].name} won!!!`);
      hide(btn_roll);
      hide(btn_hold);
    }
    
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  setCurrentValue(activePlayer, 0);
  toggleActivePanel(activePlayer);
  activePlayer = +!activePlayer;
  hide(diceElement_1);
  hide(diceElement_2);
  toggleActivePanel(activePlayer);
}

btn_hold.addEventListener('click', function() {
  players[activePlayer].setScore(current);
  setScoreValue(activePlayer, players[activePlayer].getScore());
  changePlayer();
});

btn_new.addEventListener('click', function() {
  initGame();
});

btn_vins.addEventListener('click', function() {
  alert(formVinTable(vinsTable));
});
