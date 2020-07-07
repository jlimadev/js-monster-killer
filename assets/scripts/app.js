const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const DEFAULT_MAX_LIFE = 100;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'

const enteredValue = prompt('Welcome! Please, set the maximum life for you and the monster');
let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = DEFAULT_MAX_LIFE;
}

let currentMonsterHealth = chosenMaxLife; 
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function attackMonster(mode) {
  let maxDemage = 0;
  if (mode === MODE_ATTACK) {
    maxDemage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDemage = STRONG_ATTACK_VALUE;
  }
  const monsterDemage = dealMonsterDamage(maxDemage);
  currentMonsterHealth -= monsterDemage;
  endRound();
}

function endRound() {
  auxPlayerHealth = currentPlayerHealth;
  const playerDemage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDemage;
  
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = auxPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert('You would be dead! Bonus life to you!')
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Win, congrats!')
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost! The monster killed everyone.')
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('It is a Draw! You Died, but saved the city!')
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function healPlayerHandler() {
  let healValue; 
  if (currentPlayerHealth >= (chosenMaxLife - HEAL_VALUE)){
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

function reset() {
  currentMonsterHealth = chosenMaxLife; 
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife); //vendor.js
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)