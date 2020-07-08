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

adjustHealthBars(chosenMaxLife);