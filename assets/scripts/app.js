const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const DEFAULT_MAX_LIFE = 100;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

let chosenMaxLife;

function getMaxLifeValue() {
  const enteredValue = prompt("Maximum Life for the game: ", "50");

  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw (
      "Invalid user input, must be a number \n" + "Default value in use (50)"
    );
  }
  return parsedValue;
}

try {
  chosenMaxLife = getMaxLifeValue();
} catch (error) {
  console.log(error);
  chosenMaxLife = 50;
} 

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event) {}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function attackMonster(mode) {
  const maxDemage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  const monsterDemage = dealMonsterDamage(maxDemage);
  currentMonsterHealth -= monsterDemage;
  writeToLog(
    logEvent,
    monsterDemage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function endRound() {
  auxPlayerHealth = currentPlayerHealth;
  let playerDemage = 0;

  if (currentMonsterHealth > 0) {
    playerDemage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDemage;
  }

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDemage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = auxPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert("You would be dead! Bonus life to you!");
    writeToLog(
      LOG_EVENT_BONUS_LIFE,
      "BONUS LIFE USED",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  let isOver = currentMonsterHealth <= 0 || currentPlayerHealth <= 0;

  if (isOver) {
    let winner = "";
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert("You Win, congrats!");
      winner = "PLAYER WON";
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert("You Lost! The monster killed everyone.");
      winner = "MONSTER WON";
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert("It is a Draw! You Died, but saved the city!");
      winner = "A DRAW";
    }
    writeToLog(
      LOG_EVENT_GAME_OVER,
      winner,
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
