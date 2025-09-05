const app  = document.getElementById("app");
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");

// Exact relative paths (lowercase, hyphens)
const faces = [
  "icons/dice-six-faces-one.svg",
  "icons/dice-six-faces-two.svg",
  "icons/dice-six-faces-three.svg",
  "icons/dice-six-faces-four.svg",
  "icons/dice-six-faces-five.svg",
  "icons/dice-six-faces-six.svg",
];

// Preload + verify (will log if any face is missing)
faces.forEach((src, i) => {
  const img = new Image();
  img.onload = () => {};
  img.onerror = () => console.error(`❌ Missing file: ${src} (face ${i + 1})`);
  img.src = src;
});

const r6 = () => Math.floor(Math.random() * 6) + 1;

let rolling = false;

function makeSpinSrc(idx) {
  // cache-bust only during the animation so we always see a face swap,
  // but don't pollute the final faces
  const url = new URL(faces[idx], location.href);
  url.searchParams.set("_t", Math.floor(performance.now())); // changes every frame
  return url.toString();
}

function roll() {
  if (rolling) return;
  rolling = true;
  app.classList.add("rolling");

  const start = performance.now();
  const duration = 520;

  function tick(now) {
    if (now - start < duration) {
      // show quick random frames (with cache-bust)
      die1.src = makeSpinSrc(r6() - 1);
      die2.src = makeSpinSrc(r6() - 1);
      setTimeout(() => requestAnimationFrame(tick), 38);
    } else {
      // final stable faces (no cache-bust)
      const a = r6() - 1;
      const b = r6() - 1;
      die1.src = faces[a];
      die2.src = faces[b];

      app.classList.remove("rolling");
      rolling = false;
    }
  }

  requestAnimationFrame(tick);
}

app.addEventListener("pointerdown", roll, { passive: true });
setTimeout(roll, 300); // optional autoroll on load
