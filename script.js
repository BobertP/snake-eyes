// script.js
const app  = document.getElementById("app");
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");

if (!app || !die1 || !die2) {
  console.error("Dice elements not found on the page.");
}

const faces = [
  "icons/dice-six-faces-one.svg",
  "icons/dice-six-faces-two.svg",
  "icons/dice-six-faces-three.svg",
  "icons/dice-six-faces-four.svg",
  "icons/dice-six-faces-five.svg",
  "icons/dice-six-faces-six.svg",
];

const r6 = () => Math.floor(Math.random() * 6) + 1;

let rolling = false;

function roll() {
  if (rolling || !app || !die1 || !die2) return;
  rolling = true;
  app.classList.add("rolling");

  const start = performance.now();
  const duration = 520;

  function frame(now) {
    if (now - start < duration) {
      die1.src = faces[r6() - 1];
      die2.src = faces[r6() - 1];
      setTimeout(() => requestAnimationFrame(frame), 38);
    } else {
      die1.src = faces[r6() - 1];
      die2.src = faces[r6() - 1];
      app.classList.remove("rolling");
      rolling = false;
    }
  }

  requestAnimationFrame(frame);
}

app?.addEventListener("pointerdown", roll, { passive: true });
setTimeout(roll, 300); // autoroll on load
