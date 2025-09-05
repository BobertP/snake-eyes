const app = document.getElementById("app");
const dieEl1 = document.getElementById("die1");
const dieEl2 = document.getElementById("die2");

function getDieSrc(num) {
  const names = ["one", "two", "three", "four", "five", "six"];
  return `icons/dice-six-faces-${names[num - 1]}.svg`;
}

let rolling = false;

function rollDiceFast() {
  if (rolling) return;
  rolling = true;
  app.classList.add("rolling");

  const start = performance.now();
  const duration = 520;

  function frame(now) {
    if (now - start < duration) {
      dieEl1.src = getDieSrc(rand1to6());
      dieEl2.src = getDieSrc(rand1to6());
      setTimeout(() => requestAnimationFrame(frame), 38);
    } else {
      const n1 = rand1to6();
      const n2 = rand1to6();
      dieEl1.src = getDieSrc(n1);
      dieEl2.src = getDieSrc(n2);
      app.classList.remove("rolling");
      rolling = false;
    }
  }

  requestAnimationFrame(frame);
}

function rand1to6() {
  return Math.floor(Math.random() * 6) + 1;
}

// tap/click anywhere
app.addEventListener("pointerdown", rollDiceFast, { passive: true });

// auto-roll on load
setTimeout(rollDiceFast, 300);
