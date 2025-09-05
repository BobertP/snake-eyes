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

// preload & log missing
faces.forEach((src, i) => {
  const img = new Image();
  img.onerror = () => console.error(`❌ Missing file: ${src} (face ${i+1})`);
  img.src = src;
});

const r6 = () => Math.floor(Math.random() * 6) + 1;

let rolling = false;
let spinTimer = null;

function clearSpin() {
  if (spinTimer) { clearInterval(spinTimer); spinTimer = null; }
  app.classList.remove("rolling");
  rolling = false;
}

function roll() {
  if (rolling) return;
  rolling = true;
  app.classList.add("rolling");

  const duration = 520;   // total spin ms
  const frameMs  = 45;    // frame cadence

  // spin frames
  spinTimer = setInterval(() => {
    die1.src = faces[r6() - 1];
    die2.src = faces[r6() - 1];
  }, frameMs);

  // final faces
  setTimeout(() => {
    try {
      die1.src = faces[r6() - 1];
      die2.src = faces[r6() - 1];
    } finally {
      clearSpin();
    }
  }, duration);

  // safety fuse in case anything goes weird
  setTimeout(() => {
    if (rolling) {
      console.warn("Safety reset triggered.");
      clearSpin();
    }
  }, duration + 1500);
}

app.addEventListener("pointerdown", roll, { passive: true });
setTimeout(roll, 300);
