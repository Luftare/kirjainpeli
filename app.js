const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖ'.split('');
const vokaalit = 'AEIOUYÄÖ'.split('');
const konsonantit = allChars.filter((c) => !vokaalit.includes(c));

let includedChars = [...allChars];
let currentChar =
  includedChars[Math.floor(Math.random() * includedChars.length)];

const applyChars = (chars) => {
  includedChars = [...chars];
  handleCharTap();
  renderOptionSelection();
};

const handleCharTap = () => {
  const root = document.getElementById('char-root');
  const possibleChars = includedChars.filter((v) => v !== currentChar);
  currentChar =
    possibleChars[Math.floor(Math.random() * possibleChars.length)] || '?';
  root.innerHTML = `
    <button onclick="handleCharTap()" class="char">${currentChar}</button>
  `;

  addParticles();
};

const addParticles = () => {
  const root = document.getElementById('char-root');
  const hash = `data-${Math.floor(Math.random() * 99999999)}`;
  const selector = `.particle[${hash}]`;

  const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

  [...Array(40)].forEach(() => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.setAttribute(hash, true);
    particle.style.background = color;
    root.appendChild(particle);
  });

  requestAnimationFrame(() => {
    document.querySelectorAll(selector).forEach((e) => {
      e.style.transform = `translate(-50%, -50%) translate(${
        (Math.random() - 0.5) * 800
      }px, ${(Math.random() - 0.5) * 800}px)`;
      e.style.opacity = 0.0;
    });
  });

  setTimeout(() => {
    const root = document.getElementById('char-root');

    document.querySelectorAll(selector).forEach((e) => {
      root.removeChild(e);
    });
  }, 1500);
};

const toggleChar = (c) => {
  const alreadyContained = includedChars.includes(c);

  if (alreadyContained) {
    includedChars = includedChars.filter((v) => v !== c);
  } else {
    includedChars.push(c);
  }

  renderOptionSelection();
};

const renderOptionSelection = () => {
  const root = document.getElementById('options-root');

  root.innerHTML = `
    ${allChars
      .map(
        (c) => `
      <button class="char-option" onclick="toggleChar('${c}')" ${
          includedChars.includes(c) ? 'data-selected' : ''
        }>${c}</button>
    `
      )
      .join('')}
  <br>
    <button class="preset" onclick="applyChars(allChars)">Kaikki kirjaimet</button>  
    <button class="preset" onclick="applyChars([])">Poista kaikki</button>
    <button class="preset" onclick="applyChars(vokaalit)">Vokaalit</button>
    <button class="preset" onclick="applyChars(konsonantit)">Konsonantit</button>
  `;
};

handleCharTap();
renderOptionSelection();
