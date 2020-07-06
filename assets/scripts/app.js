const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife; 
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  attackMonster(ATTACK_VALUE);
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_VALUE);
}

function attackMonster(playerAttack) {
  const monsterDemage = dealMonsterDamage(playerAttack);
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

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler)