import {Gamer} from "./gamer";
import { writeName, setCurrentValue, setScoreValue, diceElement_1, diceElement_2, btn_roll, btn_hold, input_vin_value } from "./dom_read_write";


export function initDOM() {
    setCurrentValue(0, 0);
    setCurrentValue(1, 0);
    setScoreValue(0, 0);
    setScoreValue(1, 0);
    hide(diceElement_1);
    hide(diceElement_2);
    btn_roll.style.display = 'block';
    btn_hold.style.display = 'block';
};

export function getVinValue() {
    let vin_value = Math.round(input_vin_value.value) || 100;
    input_vin_value.value = vin_value;
    return vin_value;
};

export function askForName(vinsTable){
    let players = localStorage.getObj("last_payers") || [0, 0];
    let player1_name = prompt("Имя первого игрока:", players[0].name) || "player1";
    let player2_name = prompt("Имя первого игрока:", players[1].name) || "player1";
    players[0] = (vinsTable[player1_name]) ? 
    new Gamer(player1_name, vinsTable[player1_name]) : new Gamer(player1_name);
    players[1] = (vinsTable[player2_name]) ? 
    new Gamer(player2_name, vinsTable[player2_name]) : new Gamer(player2_name);

    writeName(players[0].name, 0);
    writeName(players[1].name, 1);

    localStorage.setObj("last_payers", players);

    return players;
};

export function hide(elem){
    if (elem!=null){
        elem.style.display = 'none';
    }
};