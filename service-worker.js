:root {
  --die-size: clamp(7rem, 22vw, 16rem);
  --gap: clamp(1rem, 4vw, 3rem);
}

* { box-sizing: border-box; }

html, body {
  height: 100%;
  margin: 0;
}

body {
  font-family: system-ui, Arial, sans-serif;
  background: #f6f8fb;
  color: #222;
  -webkit-tap-highlight-color: transparent;
}

#app {
  height: 100%;
  display: grid;
  place-items: center;
  user-select: none;
  touch-action: manipulation;
}

#dice {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
}

.die {
  width: var(--die-size);
  height: var(--die-size);
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.12));
  transition: transform 120ms ease;
}

#result {
  position: absolute;
  bottom: 5vh;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  opacity: 0.85;
}

.rolling .die {
  animation: wiggle 180ms linear infinite;
}

@keyframes wiggle {
  0%   { transform: translateY(0) rotate(0); }
  50%  { transform: translateY(-4px) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0); }
}