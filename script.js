const app  = document.getElementById("app");
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");

// exact filenames (lowercase, hyphens)
const faces = [
  "icons/dice-six-faces-one.svg",
  "icons/dice-six-faces-two.svg",
  "icons/dice-six-faces-three.svg",
  "icons/dice-six-faces-four.svg",
  "icons/dice-six-faces-five.svg",
  "icons/dice-six-faces-six.svg",
];

// preload & log missing assets
faces.forEach((src, i) => {
  const img = new Image();
  img.onerror = () => console.error(`❌ Missing file: ${src} (face ${i+1})`);
  img.src = src;
});

const r6 = () => Math.floor(Math.random() * 6) + 1;

let rolling = false;
let spinTimer = null;
let safetyTimer = null;

function clearTimers() {
  if (spinTimer)  { clearInterval(spinTimer);  spinTimer  = null; }
  if (safetyTimer){ clearTimeout(safetyTimer); safetyTimer = null; }
}

function endRoll(finalA, finalB) {
  try {
    die1.src = faces[finalA - 1];
    die2.src = faces[finalB - 1];
  } finally {
    app.classList.remove("rolling");
    rolling = false;
  }
}

function roll() {
  if (rolling) return;           // guard: ignore extra taps during spin
  rolling = true;
  app.classList.add("rolling");

  const duration = 520;          // total spin ms
  const frameMs  = 45;           // frame cadence

  try {
    // spin: show random faces quickly
    spinTimer = setInterval(() => {
      die1.src = faces[r6() - 1];
      die2.src = faces[r6() - 1];
    }, frameMs);

    // schedule final result + cleanup
    setTimeout(() => {
      const a = r6();
      const b = r6();
      clearTimers();
      endRoll(a, b);
    }, duration);

    // safety net to ensure we never get stuck
    safetyTimer = setTimeout(() => {
      console.warn("Safety reset triggered.");
      clearTimers();
      endRoll(r6(), r6());
    }, duration + 1500);
  } catch (e) {
    console.error(e);
    clearTimers();
    endRoll(r6(), r6());
  }
}

app.addEventListener("pointerdown", roll, { passive: true });
setTimeout(roll, 300); // optional autoroll on load
