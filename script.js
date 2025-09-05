document.getElementById("roll-btn").addEventListener("click", rollDice);

function rollDice() {
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;

  document.getElementById("die1").textContent = getDieFace(die1);
  document.getElementById("die2").textContent = getDieFace(die2);

  let resultText = `You rolled ${die1} and ${die2}`;
  if (die1 === 1 && die2 === 1) {
    resultText += " 🎉 Snake Eyes!";
  }

  document.getElementById("result").textContent = resultText;
}

function getDieFace(num) {
  const diceFaces = ["⚀","⚁","⚂","⚃","⚄","⚅"];
  return diceFaces[num - 1];
}
