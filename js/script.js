const $ = (selector) => document.querySelector(selector);

const lunaMessages = [
  '“67 67 67 67 67 67 67 67 67 67 67 67 FELIZ CUMPLE”',
  '“Espero que cumplas más Hiba pero porfa para de ponerme peluches encima.”',
  '“21 años y la cama sin hacer durante 3 meses, me recuerdas a mi futuro esposo (PABLO).”',
  '“Hiba te queremos mucho tanto Pablo como yo y te vamos a invitar a nuestra boda🫂”'
];

const brainrotPredictions = [
  'Los astros dicen que hoy tienes un 98,7% de posibilidades de decir “literalmente yo” viendo un anime.',
  'Tu aura de cumpleaños está en nivel SIGMA ROSA. Darwin te ha dado like mentalmente.',
  'El algoritmo te ha elegido: recibirás un meme tan absurdo que tendrás que explicarlo y perderá toda la gracia.',
  'Luna ha confirmado que tu destino es ser icónica. También ha confirmado que quiere comida.',
  'En tu próxima vida serás la protagonista de un manga, pero tu gata será la villana final.'
];

const blessings = [
  'Bendición activada: +21 de suerte, +100 de aura y cero vergüenza al disfrutar de tus gustos. 💗',
  'Que el próximo arco de tu vida tenga buena animación, opening increíble y ningún episodio de relleno. ✨',
  'Ojalá que una estrella k-poper como tu nunca deje de brillar. 👑',
  'Tu misión secundaria: comer algo rico, reírte mucho y recordar que eres una personita muy especial. 🎀'
];

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function launchConfetti(amount = 90) {
  const layer = $('#confettiLayer');
  const colors = ['#ff76b7', '#ffc6df', '#d9b8ff', '#ffe08a', '#ffffff', '#ff9e9e'];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2.2 + Math.random() * 2.4}s`;
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    layer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 5200);
  }
}

$('#confettiButton').addEventListener('click', () => {
  launchConfetti();
  showToast('¡CONFETI PARA LA REINA HIBA! 🎉');
});

$('#chaosButton').addEventListener('click', (event) => {
  const enabled = document.body.classList.toggle('brainrot-mode');
  event.currentTarget.innerHTML = `Modo brainrot: ${enabled ? 'ON' : 'OFF'} <span>${enabled ? '🗿' : '🧠'}</span>`;
  showToast(enabled ? 'Skibidi aura desbloqueada. 💀' : 'Volvemos a la civilización. 💗');
  if (enabled) launchConfetti(35);
});

$('#lunaButton').addEventListener('click', () => {
  const current = $('#lunaMessage').textContent;
  const choices = lunaMessages.filter(message => message !== current);
  $('#lunaMessage').textContent = choices[Math.floor(Math.random() * choices.length)];
});

const giftContent = {
  message: {
    icon: '💌',
    text: 'Hiba, feliz cumpleaños. Espero que tus 21 estén llenos de cosas que te hagan feliz, personas que te quieran bien y momentos que recuerdes con una sonrisa. No cambies esa mezcla tuya de dulzura, humor raro y gustos increíbles. Te mereces cosas bonitas. ♡'
  },
  music: {
    icon: '🎧',
    text: 'Banda sonora oficial del día: “Masterpiece” de Motionless In White a todo volumen (que le den a los vecinos).',
    link: 'https://open.spotify.com/search/Motionless%20In%20White%20Masterpiece',
    linkText: 'Buscar la canción en Spotify ↗'
  },
  brainrot: {
    icon: '🧠',
    text: ''
  }
};

document.querySelectorAll('[data-gift]').forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.dataset.gift;
    const content = { ...giftContent[type] };
    if (type === 'brainrot') content.text = brainrotPredictions[Math.floor(Math.random() * brainrotPredictions.length)];

    const result = $('#giftResult');
    result.replaceChildren();
    const icon = document.createElement('span');
    icon.className = 'result-icon';
    icon.textContent = content.icon;
    const message = document.createElement('p');
    message.textContent = content.text;
    result.append(icon, message);
    if (content.link) {
      const link = document.createElement('a');
      link.href = content.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'button secondary';
      link.textContent = content.linkText;
      result.append(link);
    }
    if (type === 'brainrot') showToast('La predicción ha hablado. 🧠');
    if (type === 'message') launchConfetti(28);
  });
});

$('#finalButton').addEventListener('click', () => {
  const blessing = blessings[Math.floor(Math.random() * blessings.length)];
  const element = $('#blessing');
  element.textContent = blessing;
  element.hidden = false;
  launchConfetti(120);
  showToast('Bendición de cumpleaños recibida ✨');
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
