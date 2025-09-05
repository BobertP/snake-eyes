const app  = document.getElementById("app");
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");

// exact filenames (lowercase)
const faces = [
  "icons/dice-six-faces-one.svg",
  "icons/dice-six-faces-two.svg",
  "icons/dice-six-faces-three.svg",
  "icons/dice-six-faces-four.svg",
  "icons/dice-six-faces-five.svg",
  "icons/dice-six-faces-six.svg",
];

// sanity check (won't crash the app)
if (!app || !die1 || !die2) {
  console.error("Dice elements not found. Check your index.html element IDs.");
}

const r6 = () => Math.floor(Math.random() * 6) + 1;

let rolling = false;
let intervalId = null;

function clearSpin() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  app?.classList.remove("rolling");
  rolling = false;
}

function roll() {
  if (rolling) return;
  if (!app || !die1 || !die2) return;
  rolling = true;
  app.classList.add("rolling");

  const duration = 520;   // total spin
  const frameMs  = 45;    // frame cadence

  // spin animation (random faces)
  intervalId = setInterval(() => {
    die1.src = faces[r6() - 1];
    die2.src = faces[r6() - 1];
  }, frameMs);

  // stop and set final faces
  setTimeout(() => {
    try {
      die1.src = faces[r6() - 1];
      die2.src = faces[r6() - 1];
    } finally {
      clearSpin();
    }
  }, duration);

  // ultimate safety (never get stuck)
  setTimeout(() => {
    if (rolling) {
      console.warn("Safety reset triggered.");
      clearSpin();
    }
  }, duration + 1500);
}

// tap anywhere
app?.addEventListener("pointerdown", roll, { passive: true });
// autoroll on load
setTimeout(roll, 300);
