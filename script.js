const app   = document.getElementById("app");
const die1  = document.getElementById("die1");
const die2  = document.getElementById("die2");
const out   = document.getElementById("result");

const names = ["one", "two", "three", "four", "five", "six"];
const face  = n => `icons/dice-six-faces-${names[n - 1]}.svg`;
const r6    = () => Math.floor(Math.random() * 6) + 1;

let rolling = false;

function roll() {
  if (rolling) return;
  rolling = true;
  app.classList.add("rolling");

  const start = performance.now();
  const duration = 520;

  function tick(now) {
    if (now - start < duration) {
      die1.src = face(r6());
      die2.src = face(r6());
      setTimeout(() => requestAnimationFrame(tick), 38);
    } else {
      const a = r6();
      const b = r6();
      die1.src = face(a);
      die2.src = face(b);

      out.textContent = (a === 1 && b === 1) ? "Snake Eyes" : `${a} and ${b}`;

      app.classList.remove("rolling");
      rolling = false;
    }
  }

  requestAnimationFrame(tick);
}

app.addEventListener("pointerdown", roll, { passive: true });
setTimeout(roll, 300); // optional autoroll on load
