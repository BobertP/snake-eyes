// Minimal dice roller (no text). Includes cache-busting and robust cleanup.

const app  = document.getElementById("app");
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");

// Sanity: ensure elements exist
if (!app || !die1 || !die2) {
  console.error("Dice elements not found. Check index.html IDs.");
}

// Version token to bust any stale caching on the icons (query param is safe)
const V = "v3";

// Exact filenames (lowercase, hyphens). Keep these names in /icons/.
const faces = [
  `icons/dice-six-faces-one.svg?${V}`,
  `icons/dice-six-faces-two.svg?${V}`,
  `icons/dice-six-faces-three.svg?${V}`,
  `icons/dice-six-faces-four.svg?${V}`,
  `icons/dice-six-faces-five.svg?${V}`,
  `icons/dice-six-faces-six.svg?${V}`,
];

// Preload and log if any are missing (does not break the app)
faces.forEach((src, i) => {
  const img = new Image();
  img.onerror = () => console.error(`❌ Missing file: ${src} (face ${i + 1})`);
  img.src = src;
});

const r6 = () => Math.floor(Math.random() * 6) + 1;

let rolling = false;
let spinTimer = null;
let safetyTimer = null;

function clearTimers() {
  if (spinTimer)  { clearInterval(spinTimer);  spinTimer = null; }
  if (safetyTimer){ clearTimeout(safetyTimer); safetyTimer = null; }
  app && app.classList.remove("rolling");
  rolling = false;
}

function startRoll() {
  if (rolling || !app || !die1 || !die2) return;
  rolling = true;
  app.classList.add("rolling");

  const duration = 520; // ms
  const frameMs  = 45;  // ms per spin frame

  // Spin: show random faces quickly
  spinTimer = setInterval(() => {
    die1.src = faces[r6() - 1];
    die2.src = faces[r6() - 1];
  }, frameMs);

  // Finalize faces after duration
  setTimeout(() => {
    try {
      die1.src = faces[r6() - 1];
      die2.src = faces[r6() - 1];
    } finally {
      clearTimers();
    }
  }, duration);

  // Safety: never get stuck in "rolling" even if something odd happens
  safetyTimer = setTimeout(() => {
    if (rolling) {
      console.warn("Safety reset triggered.");
      clearTimers();
    }
  }, duration + 1500);
}

// Tap/click anywhere
app && app.addEventListener("pointerdown", startRoll, { passive: true });
// Autoroll on load
setTimeout(startRoll, 300);
