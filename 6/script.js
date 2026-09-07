// ==========================================================
// 1. CANVAS: MƯA CÁNH HOA ĐÀO & ÁNH SÁNG PASTEL LUNG LINH
// ==========================================================

const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
const confettiCanvas = document.getElementById('confetti-canvas');
const confCtx = confettiCanvas.getContext('2d');

let width = (bgCanvas.width = confettiCanvas.width = window.innerWidth);
let height = (bgCanvas.height = confettiCanvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = bgCanvas.width = confettiCanvas.width = window.innerWidth;
  height = bgCanvas.height = confettiCanvas.height = window.innerHeight;
});

// Cánh hoa đào & hạt sáng hồng phấn bay lượn nhẹ nhàng
class SakuraPetal {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = Math.random() * 7 + 5;
    this.speedY = Math.random() * 1.2 + 0.8;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 1.5;
    this.opacity = Math.random() * 0.6 + 0.35;
    this.colors = ['#ffccd5', '#ffb3c1', '#ff85a1', '#ffffff', '#ffd1dc'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.015) * 0.8 + this.speedX;
    this.rotation += this.rotSpeed;
    if (this.y > height + 20) {
      this.reset();
      this.y = -10;
    }
  }
  draw() {
    bgCtx.save();
    bgCtx.globalAlpha = this.opacity;
    bgCtx.translate(this.x, this.y);
    bgCtx.rotate((this.rotation * Math.PI) / 180);
    bgCtx.fillStyle = this.color;
    
    // Vẽ hình cánh hoa mềm mại
    bgCtx.beginPath();
    bgCtx.moveTo(0, 0);
    bgCtx.quadraticCurveTo(this.size / 2, -this.size / 2, this.size, 0);
    bgCtx.quadraticCurveTo(this.size / 2, this.size / 2, 0, 0);
    bgCtx.fill();
    bgCtx.restore();
  }
}

const petals = Array.from({ length: 45 }, () => new SakuraPetal());

function animateBg() {
  bgCtx.clearRect(0, 0, width, height);
  petals.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateBg);
}
animateBg();

// ==========================================================
// 2. PHÁO HOA & CONFETTI TONE HỒNG NGỌT NGÀO
// ==========================================================
let confettiPieces = [];
let fireworkRays = [];

class PinkConfettiPiece {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 6;
    this.speedX = (Math.random() - 0.5) * 15;
    this.speedY = Math.random() * -13 - 4;
    this.gravity = 0.33;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 12;
    this.colors = ['#ff758f', '#ff4d6d', '#ffb3c1', '#ffd166', '#ffffff', '#ffccd5'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.opacity = 1;
    this.decay = Math.random() * 0.01 + 0.008;
  }
  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.opacity -= this.decay;
  }
  draw() {
    confCtx.save();
    confCtx.globalAlpha = Math.max(0, this.opacity);
    confCtx.translate(this.x, this.y);
    confCtx.rotate((this.rotation * Math.PI) / 180);
    confCtx.fillStyle = this.color;
    confCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.65);
    confCtx.restore();
  }
}

class SweetFireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6.8 + 2;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    this.color = color;
    this.size = Math.random() * 3 + 1.2;
    this.opacity = 1;
    this.decay = Math.random() * 0.02 + 0.012;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.07;
    this.opacity -= this.decay;
  }
  draw() {
    confCtx.save();
    confCtx.globalAlpha = Math.max(0, this.opacity);
    confCtx.fillStyle = this.color;
    confCtx.beginPath();
    confCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    confCtx.fill();
    confCtx.restore();
  }
}

function launchConfetti(originX = width / 2, originY = height / 2, amount = 100) {
  for (let i = 0; i < amount; i++) {
    confettiPieces.push(new PinkConfettiPiece(originX, originY));
  }
}

function launchFirework(x = Math.random() * width, y = Math.random() * (height * 0.45) + 80) {
  const sweetColors = ['#ff758f', '#ff4d6d', '#ffb3c1', '#ffd166', '#ffffff', '#ff9ebb'];
  const color = sweetColors[Math.floor(Math.random() * sweetColors.length)];
  for (let i = 0; i < 55; i++) {
    fireworkRays.push(new SweetFireworkParticle(x, y, color));
  }
}

function animateConfetti() {
  confCtx.clearRect(0, 0, width, height);

  confettiPieces = confettiPieces.filter(p => p.opacity > 0);
  confettiPieces.forEach(p => {
    p.update();
    p.draw();
  });

  fireworkRays = fireworkRays.filter(p => p.opacity > 0);
  fireworkRays.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// ==========================================================
// 3. NHẠC SINH NHẬT ÊM DỊU & TIẾNG CHUÔNG HỘP NHẠC
// ==========================================================
let audioCtx = null;
let isMusicPlaying = false;
let melodyTimeoutId = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const NOTE_FREQS = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
};

const HAPPY_BIRTHDAY_SCORE = [
  { note: 'G4', dur: 0.75 }, { note: 'G4', dur: 0.25 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'B4', dur: 2 },
  { note: 'G4', dur: 0.75 }, { note: 'G4', dur: 0.25 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 2 },
  { note: 'G4', dur: 0.75 }, { note: 'G4', dur: 0.25 }, { note: 'G5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'B4', dur: 1 }, { note: 'A4', dur: 2 },
  { note: 'F5', dur: 0.75 }, { note: 'F5', dur: 0.25 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 3 }
];

function playTone(freq, startTime, duration, type = 'sine', gainVal = 0.15) {
  if (!audioCtx || !freq) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.1);
}

function playCelebrationFanfare() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const chord = [NOTE_FREQS.C4, NOTE_FREQS.E4, NOTE_FREQS.G4, NOTE_FREQS.C5, NOTE_FREQS.E5];
  chord.forEach((freq, idx) => {
    playTone(freq, now + idx * 0.12, 1.3, 'triangle', 0.18);
  });
}

function startHappyBirthdayMelody() {
  if (isMusicPlaying) return;
  const ctx = getAudioContext();
  isMusicPlaying = true;
  updateMusicUI(true);

  const tempo = 132;
  const beatTime = 60 / tempo;

  function scheduleMelody() {
    if (!isMusicPlaying) return;
    let currTime = ctx.currentTime + 0.1;

    HAPPY_BIRTHDAY_SCORE.forEach(item => {
      const freq = NOTE_FREQS[item.note];
      const duration = item.dur * beatTime;
      // Âm thanh hộp nhạc ngọt ngào
      playTone(freq, currTime, duration * 0.9, 'sine', 0.16);
      playTone(freq * 0.5, currTime, duration * 0.9, 'triangle', 0.07);

      currTime += duration;
    });

    const totalDuration = HAPPY_BIRTHDAY_SCORE.reduce((acc, cur) => acc + cur.dur * beatTime, 0);
    melodyTimeoutId = setTimeout(() => {
      if (isMusicPlaying) {
        scheduleMelody();
      }
    }, (totalDuration + 1.5) * 1000);
  }

  scheduleMelody();
}

function stopHappyBirthdayMelody() {
  isMusicPlaying = false;
  if (melodyTimeoutId) {
    clearTimeout(melodyTimeoutId);
    melodyTimeoutId = null;
  }
  updateMusicUI(false);
}

function updateMusicUI(playing) {
  const btn = document.getElementById('music-toggle-btn');
  const icon = document.getElementById('music-icon');
  if (playing) {
    btn.classList.add('playing');
    icon.textContent = '🎶';
  } else {
    btn.classList.remove('playing');
    icon.textContent = '🎵';
  }
}

document.getElementById('music-toggle-btn').addEventListener('click', () => {
  getAudioContext();
  if (isMusicPlaying) {
    stopHappyBirthdayMelody();
  } else {
    startHappyBirthdayMelody();
  }
});

// ==========================================================
// 4. CHUYỂN CẢNH TRẢI NGHIỆM ẤM ÁP
// ==========================================================
const stageGift = document.getElementById('stage-gift');
const stageCake = document.getElementById('stage-cake');
const stageCelebration = document.getElementById('stage-celebration');

function switchStage(fromStage, toStage) {
  fromStage.style.opacity = '0';
  fromStage.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    fromStage.classList.add('hidden');
    fromStage.classList.remove('active');

    toStage.classList.remove('hidden');
    toStage.style.opacity = '0';
    toStage.style.transform = 'translateY(20px)';
    
    void toStage.offsetWidth;

    toStage.classList.add('active');
    toStage.style.opacity = '1';
    toStage.style.transform = 'translateY(0)';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 600);
}

// 1. Mở Hộp Quà Hồng
const giftTrigger = document.getElementById('gift-box-trigger');
giftTrigger.addEventListener('click', () => {
  const giftBox = giftTrigger.querySelector('.cute-gift-box');
  if (giftBox) giftBox.classList.add('open');
  launchConfetti(window.innerWidth / 2, window.innerHeight / 2, 85);

  setTimeout(() => {
    switchStage(stageGift, stageCake);
  }, 900);
});

// 2. Thổi Nến Bánh Kem Dâu Tây
const blowBtn = document.getElementById('blow-candle-btn');
const cakeInteractive = document.getElementById('cake-interactive');
let candleBlown = false;

function blowOutCandle() {
  if (candleBlown) return;
  candleBlown = true;

  getAudioContext();
  playCelebrationFanfare();

  // Tắt nến
  const flames = document.querySelectorAll('.flame');
  flames.forEach(flame => {
    flame.classList.remove('active');
    flame.classList.add('extinguished');
  });

  // Khói hồng bay lên
  const candles = document.querySelectorAll('.num-candle-item');
  candles.forEach(candle => {
    const rect = candle.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-puff';
      smoke.style.left = `${rect.left + rect.width / 2 - 7}px`;
      smoke.style.top = `${rect.top}px`;
      document.body.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1500);
    }
  });

  // Bắn pháo hoa rực rỡ & khởi động nhạc
  launchConfetti(width / 2, height / 2, 140);
  launchFirework(width * 0.3, height * 0.3);
  launchFirework(width * 0.7, height * 0.3);
  startHappyBirthdayMelody();

  // Chuyển sang thiệp chúc mừng
  setTimeout(() => {
    switchStage(stageCake, stageCelebration);
    setTimeout(() => {
      launchFirework(width / 2, height * 0.25);
      launchConfetti(width / 2, height * 0.4, 90);
    }, 400);
  }, 1600);
}

blowBtn.addEventListener('click', blowOutCandle);
cakeInteractive.addEventListener('click', blowOutCandle);

// 3. Nút Thổi Lại Nến
document.getElementById('replay-btn').addEventListener('click', () => {
  candleBlown = false;
  const flames = document.querySelectorAll('.flame');
  flames.forEach(flame => {
    flame.classList.add('active');
    flame.classList.remove('extinguished');
  });
  const giftBox = giftTrigger.querySelector('.cute-gift-box');
  if (giftBox) giftBox.classList.remove('open');

  switchStage(stageCelebration, stageCake);
});

// Nút Về Hộp Quà Đầu Tiên
const restartAllBtn = document.getElementById('restart-all-btn');
if (restartAllBtn) {
  restartAllBtn.addEventListener('click', () => {
    candleBlown = false;
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
      flame.classList.add('active');
      flame.classList.remove('extinguished');
    });
    const giftBox = giftTrigger.querySelector('.cute-gift-box');
    if (giftBox) giftBox.classList.remove('open');

    switchStage(stageCelebration, stageGift);
  });
}

// 4. Chọn Ảnh Cho Khung Polaroid Dán Washi Tape
const photoUploadInput = document.getElementById('photo-upload-input');
const polaroidFrameTrigger = document.getElementById('polaroid-frame-trigger');
const customPhotoImg = document.getElementById('custom-photo-img');
const placeholderContent = document.getElementById('photo-placeholder-content');

if (polaroidFrameTrigger && photoUploadInput) {
  polaroidFrameTrigger.addEventListener('click', () => {
    photoUploadInput.click();
  });

  photoUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        customPhotoImg.src = event.target.result;
        customPhotoImg.classList.remove('hidden');
        if (placeholderContent) {
          placeholderContent.style.display = 'none';
        }
        launchConfetti(window.innerWidth / 2, window.innerHeight / 2, 75);
      };
      reader.readAsDataURL(file);
    }
  });
}

// ==========================================================
// 5. HIỆU ỨNG TƯƠNG TÁC: THẢ TIM HỒNG & PHÁO HOA
// ==========================================================
const heartBurstBtn = document.getElementById('heart-burst-btn');
const fireworksBtn = document.getElementById('fireworks-btn');

function spawnPinkHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  const hearts = ['🌸', '💕', '💖', '✨', '🍓', '🌷', '🥰', '💐'];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2400);
}

heartBurstBtn.addEventListener('click', () => {
  const rect = heartBurstBtn.getBoundingClientRect();
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const randX = rect.left + (Math.random() - 0.5) * 110;
      const randY = rect.top + (Math.random() - 0.5) * 50;
      spawnPinkHeart(randX, randY);
    }, i * 60);
  }
});

fireworksBtn.addEventListener('click', () => {
  const randX = Math.random() * (width * 0.6) + width * 0.2;
  const randY = Math.random() * (height * 0.4) + 100;
  launchFirework(randX, randY);
  launchConfetti(randX, randY, 65);
});

// Click bất kỳ trên màn hình thả tim hồng và hoa
document.addEventListener('click', (e) => {
  if (e.target.closest('button') || e.target.closest('.gift-box-wrapper') || e.target.closest('.flip-card')) {
    return;
  }
  spawnPinkHeart(e.clientX, e.clientY);
});
