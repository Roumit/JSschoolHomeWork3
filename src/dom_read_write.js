

export const diceElement_1 = document.getElementById('firstDice');
export const diceElement_2 = document.getElementById('secondDice');

export const btn_roll = document.querySelector('.btn-roll');
export const btn_hold = document.querySelector('.btn-hold');
export const btn_new = document.querySelector('.btn-new');
export const btn_vins = document.querySelector('.btn-vins')
export const input_vin_value = document.getElementById('input-vin-value');

export function setCurrentValue(activePlayer, value){
    return document.getElementById('current-'+activePlayer).textContent = value;
};

export function setScoreValue(activePlayer, score){
    document.querySelector(`#score-${activePlayer}`).textContent = score;
}

export function setDicePicture(dice_1, dice_2){
    diceElement_1.src = `dice-${dice_1}.png`;
    diceElement_1.style.display = 'block';
    diceElement_2.src = `dice-${dice_2}.png`;
    diceElement_2.style.display = 'block';
};

export function writeName(name, num){
    document.getElementById(`name-${num}`).innerHTML = name;
};

export function toggleActivePanel(activePlayer){
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};


