const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const DEFAULT_MAX_LIFE = 100;
const MODE_ATTACK = "PLAYER NORMAL ATTACK";
const MODE_STRONG_ATTACK = "PLAYER STRONG_ATTACK";

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

function attackHandler() {
  playerRoundHandler(MODE_ATTACK);
}

function strongAttackHandler() {
  playerRoundHandler(MODE_STRONG_ATTACK);
}

function playerRoundHandler(mode) {
  const maxDemage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
  const monsterDemage = dealMonsterDamage(maxDemage);
  currentMonsterHealth -= monsterDemage;
  writeToLog(logEvent, monsterDemage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function monsterRoundHandler(currentMonsterHealth) {
  let playerDemage = 0;
  playerDemage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDemage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDemage, currentMonsterHealth, currentPlayerHealth);
}

function bonusLifeHandler(auxPlayerHealth) {
  hasBonusLife = false;
  removeBonusLife();
  currentPlayerHealth = auxPlayerHealth;
  setPlayerHealth(auxPlayerHealth);
  alert("You would be dead! Bonus life to you!");
  writeToLog(LOG_EVENT_BONUS_LIFE, "BONUS LIFE USED", currentMonsterHealth, currentPlayerHealth);
}

function endBattleHandler(currentMonsterHealth, currentPlayerHealth) {
  let winner = "";
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      winner = "PLAYER WON";
      alert("You Win, congrats!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      winner = "MONSTER WON";
      alert("You Lost! The monster killed everyone.");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      winner = "A DRAW";
      alert("It is a Draw! You Died, but saved the city!");
    }
    writeToLog(LOG_EVENT_GAME_OVER,winner,currentMonsterHealth,currentPlayerHealth
    );
}

function endRound() {
  const auxPlayerHealth = currentPlayerHealth;
  let isOver = false;
  if (currentMonsterHealth > 0) {
    monsterRoundHandler(currentMonsterHealth);
  }

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    bonusLifeHandler(auxPlayerHealth);
  }

  isOver = currentMonsterHealth <= 0 || currentPlayerHealth <= 0;
  if (isOver) {
    endBattleHandler(currentMonsterHealth, currentPlayerHealth);
    reset();
  }
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
