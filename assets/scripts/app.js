const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife; 
let currentPlayerLife = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  attack(ATTACK_VALUE);
}

function strongAttackHandler() {
  attack(STRONG_ATTACK_VALUE);
}

function attack(playerAttack) {
  const monsterDemage = dealMonsterDamage(playerAttack);
  currentMonsterHealth -= monsterDemage;
  const playerDemage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerDemage;
  if (currentMonsterHealth <= 0 && currentPlayerLife > 0) {
    alert('You Win, congrats!')
  } else if (currentPlayerLife <= 0 && currentMonsterHealth > 0) {
    alert('You Lost! The monster killed everyone.')
  } else if (currentPlayerLife <= 0 && currentMonsterHealth <= 0) {
    alert('It is a Draw! You Died, but saved the city!')
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);