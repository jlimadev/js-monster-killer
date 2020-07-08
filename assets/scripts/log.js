const LOG_EVENT_PLAYER_ATTACK = MODE_ATTACK;
const LOG_EVENT_PLAYER_STRONG_ATTACK = MODE_STRONG_ATTACK;
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
const LOG_EVENT_BONUS_LIFE = "BONUS_LIFE";

let battleLog = [];
let lastLogEntry;

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "MONSTER";
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = "MONSTER";
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_BONUS_LIFE:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_GAME_OVER:
      break;
    default:
      logEntry = {};
      break;
  }

  battleLog.push(logEntry);
}

function printLogHandler() {
  let i = 0;
  // for of [arrays]
  for (const logEntry of battleLog) {
    if ((!lastLogEntry && lastLogEntry !== 0) || lastLogEntry < i) {
      console.log(`Battle Log #${i}`);

      //for in [objects]
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLogEntry = i;
      break;
    }
    i++;
  }
}

logBtn.addEventListener("click", printLogHandler);
