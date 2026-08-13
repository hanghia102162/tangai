/* ==========================================================================
   CHUYẾN XE GỬI THƯ CUTE 🚚✨ - STARRY NIGHT & SHOOTING STAR ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DATA POOL - FRIENDLY & CUTE MESSAGES (FOR NEW ACQUAINTANCES)
  // ------------------------------------------------------------------------
  const defaultLetters = [
    {
      id: 1,
      title: "Lời Chào Nhỏ 🌸",
      date: "Hôm nay, 08:30 AM",
      content: "Chào em nha! Chúc em có một ngày mới thật nhiều năng lượng và gặp nhiều điều vui vẻ nè. Mong là hôm nay mọi việc của em đều diễn ra thật thuận lợi và suôn sẻ nha! ✨",
      sender: "Hà Trọng Nghĩa",
      likes: 128
    },
    {
      id: 2,
      title: "Cà Phê & Thư Giãn ☕",
      date: "Hôm nay, 10:15 AM",
      content: "Hôm nay công việc hay học tập có bận rộn lắm không em? Nhớ dành chút thời gian nghỉ ngơi, uống ly trà hoặc cà phê em thích cho thật tỉnh táo nha! 🍵✨",
      sender: "Hà Trọng Nghĩa",
      likes: 256
    },
    {
      id: 3,
      title: "Rất Vui Được Quen Em ✨",
      date: "Hôm nay, 02:20 PM",
      content: "Rất vui vì được quen biết và trò chuyện cùng em. Hy vọng chiếc xe tải nhỏ này mang đến cho em một chút niềm vui nho nhỏ và nụ cười thoải mái trong ngày hôm nay nè! 🚚💌",
      sender: "Hà Trọng Nghĩa",
      likes: 310
    },
    {
      id: 4,
      title: "Lời Nhắn Dịu Dàng ☁️",
      date: "Hôm nay, 05:45 PM",
      content: "Một ngày sắp trôi qua rồi, em nhớ ăn uống đầy đủ và giữ sức khỏe nhé. Chúc em có một buổi tối thật yên bình và thư thái sau giờ làm việc/học tập nha! 🧸☁️",
      sender: "Hà Trọng Nghĩa",
      likes: 420
    },
    {
      id: 5,
      title: "Góc Thư Giãn 🎧",
      date: "Hôm nay, 08:00 PM",
      content: "Nếu hôm nay có chút mệt mỏi hay áp lực, hãy bật một bản nhạc dịu êm, uống một chút nước ấm và thả lỏng tinh thần nhé. Mọi chuyện rồi sẽ ổn và tốt đẹp thôi nè! 🎵🌟",
      sender: "Hà Trọng Nghĩa",
      likes: 512
    },
    {
      id: 6,
      title: "Năng Lượng Tích Cực 🌟",
      date: "Hôm nay, 09:30 PM",
      content: "Cảm ơn em vì những cuộc trò chuyện rất vui vẻ vừa qua. Chúc em luôn giữ được tinh thần lạc quan, năng lượng tích cực và nụ cười rạng rỡ mỗi ngày nha! 🌸✨",
      sender: "Hà Trọng Nghĩa",
      likes: 666
    }
  ];

  let letterPool = [...defaultLetters];
  let activeDroppedLetters = [];
  let currentActiveModalIndex = 0;

  // ------------------------------------------------------------------------
  // 2. LIGHTWEIGHT AUDIO SYNTHESIZER
  // ------------------------------------------------------------------------
  let isSoundMuted = false;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTypingSound() {
    if (isSoundMuted) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + Math.random() * 300, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch(e) {}
  }

  function playDropSound() {
    if (isSoundMuted) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}
  }

  function playOpenSound() {
    if (isSoundMuted) return;
    try {
      initAudio();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.05 + 0.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * 0.05);
        osc.stop(audioCtx.currentTime + idx * 0.05 + 0.2);
      });
    } catch(e) {}
  }

  function playTruckHorn() {
    if (isSoundMuted) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch(e) {}
  }

  // Sound Toggle Listener
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  
  soundToggleBtn.addEventListener('click', () => {
    isSoundMuted = !isSoundMuted;
    soundIcon.textContent = isSoundMuted ? '🔇' : '🔊';
    soundToggleBtn.style.opacity = isSoundMuted ? '0.6' : '1';
    if (!isSoundMuted) {
      initAudio();
      playOpenSound();
    }
  });

  // ------------------------------------------------------------------------
  // 3. SHOOTING STAR & NIGHT SKY CANVAS ENGINE (MAGICAL 60FPS)
  // ------------------------------------------------------------------------
  const bgCanvas = document.getElementById('bg-canvas');
  const bgCtx = bgCanvas.getContext('2d');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confettiCtx = confettiCanvas.getContext('2d');

  function resizeCanvases() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  // Background Star Particles
  const bgParticles = [];
  for (let i = 0; i < 40; i++) {
    bgParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedY: -(Math.random() * 0.35 + 0.1),
      alpha: Math.random() * 0.7 + 0.3
    });
  }

  // Shooting Star Particles Array
  let shootingStars = [];

  function triggerShootingStarRain(count = 15) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        shootingStars.push({
          x: Math.random() * (window.innerWidth * 0.8),
          y: Math.random() * (window.innerHeight * 0.4),
          length: Math.random() * 80 + 60,
          speed: Math.random() * 14 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg diagonal
          alpha: 1,
          width: Math.random() * 2 + 1.5,
          color: Math.random() > 0.5 ? '#38bdf8' : '#fde047'
        });
      }, i * 180);
    }
  }

  // Sparkle Burst Array for letter click
  let sparkleParticles = [];
  function triggerSparkleBurst(originX, originY) {
    const colors = ['#38bdf8', '#34d399', '#fde047', '#ffffff', '#a78bfa'];
    for (let i = 0; i < 24; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      sparkleParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.12,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }
  }

  // Unified Render Loop
  function unifiedRenderLoop() {
    // 1. Render Ambient Sky Stars
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = '#ffffff';
    
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.y += p.speedY;
      if (p.y < -10) p.y = bgCanvas.height + 10;

      bgCtx.globalAlpha = p.alpha;
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      bgCtx.fill();
    }

    // 2. Render Shooting Stars & Sparkles
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    // Shooting Stars
    if (shootingStars.length > 0) {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= 0.018;

        if (star.alpha <= 0 || star.x > window.innerWidth || star.y > window.innerHeight) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = confettiCtx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'transparent');

        confettiCtx.save();
        confettiCtx.globalAlpha = star.alpha;
        confettiCtx.strokeStyle = gradient;
        confettiCtx.lineWidth = star.width;
        confettiCtx.lineCap = 'round';

        confettiCtx.beginPath();
        confettiCtx.moveTo(star.x, star.y);
        confettiCtx.lineTo(tailX, tailY);
        confettiCtx.stroke();

        // Glowing Star Head
        confettiCtx.fillStyle = '#ffffff';
        confettiCtx.beginPath();
        confettiCtx.arc(star.x, star.y, star.width + 1.5, 0, Math.PI * 2);
        confettiCtx.fill();

        confettiCtx.restore();
      }
    }

    // Sparkle Burst Particles
    if (sparkleParticles.length > 0) {
      for (let i = sparkleParticles.length - 1; i >= 0; i--) {
        const p = sparkleParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          sparkleParticles.splice(i, 1);
          continue;
        }

        confettiCtx.save();
        confettiCtx.globalAlpha = p.alpha;
        confettiCtx.fillStyle = p.color;
        confettiCtx.beginPath();
        confettiCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        confettiCtx.fill();
        confettiCtx.restore();
      }
    }

    requestAnimationFrame(unifiedRenderLoop);
  }
  unifiedRenderLoop();

  // ------------------------------------------------------------------------
  // 4. PHASE 1: LOADING SCREEN CONTROLLER
  // ------------------------------------------------------------------------
  const loadingScreen = document.getElementById('loading-screen');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressText = document.getElementById('progress-text');
  const progressStatus = document.getElementById('progress-status');
  const mainStage = document.getElementById('main-stage');

  const statusMessages = [
    "Đang soạn tin nhắn...",
    "Đang gói phong bì xinh...",
    "Đang dán nhãn ngôi sao...",
    "Đang xếp thư lên xe tải...",
    "Chuyến xe chuẩn bị khởi hành! 🚚✨"
  ];

  let currentPercent = 0;

  function startLoadingSequence() {
    const loadingTimer = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 10) + 6;
      if (currentPercent > 100) currentPercent = 100;

      progressBarFill.style.transform = `scaleX(${currentPercent / 100})`;
      progressText.textContent = `${currentPercent}%`;

      if (currentPercent % 4 === 0) playTypingSound();

      if (currentPercent < 25) {
        progressStatus.textContent = statusMessages[0];
      } else if (currentPercent < 50) {
        progressStatus.textContent = statusMessages[1];
      } else if (currentPercent < 75) {
        progressStatus.textContent = statusMessages[2];
      } else if (currentPercent < 95) {
        progressStatus.textContent = statusMessages[3];
      } else {
        progressStatus.textContent = statusMessages[4];
      }

      if (currentPercent >= 100) {
        clearInterval(loadingTimer);
        setTimeout(finishLoadingAndStartScene, 350);
      }
    }, 110);
  }

  function finishLoadingAndStartScene() {
    loadingScreen.classList.add('screen-hidden');
    mainStage.classList.remove('stage-hidden');
    
    playTruckHorn();
    setTimeout(() => {
      triggerTruckDeliveryRun();
    }, 300);
  }

  startLoadingSequence();

  // ------------------------------------------------------------------------
  // 5. PHASE 2: TRUCK & FALLING LETTERS ENGINE
  // ------------------------------------------------------------------------
  const truckWrapper = document.getElementById('truck-wrapper');
  const lettersContainer = document.getElementById('letters-container');
  let isTruckRunning = false;

  function triggerTruckDeliveryRun() {
    if (isTruckRunning) return;
    isTruckRunning = true;

    truckWrapper.classList.remove('driving');
    void truckWrapper.offsetWidth;
    truckWrapper.classList.add('driving');

    playTruckHorn();

    const screenWidth = window.innerWidth;
    const dropPoints = [0.15, 0.30, 0.45, 0.60, 0.75, 0.88];

    dropPoints.forEach((ratio, idx) => {
      setTimeout(() => {
        const truckCurrentX = (screenWidth + 380) * ratio - 140;
        const letterData = letterPool[idx % letterPool.length];
        spawnFallingLetter(truckCurrentX, letterData, idx);
      }, ratio * 6800);
    });

    setTimeout(() => {
      isTruckRunning = false;
    }, 7200);
  }

  function spawnFallingLetter(startX, letterData, index) {
    const letterEl = document.createElement('div');
    letterEl.className = 'falling-letter dropping';
    
    const maxLeft = Math.max(15, Math.min(window.innerWidth - 75, startX));
    letterEl.style.left = `${maxLeft}px`;
    
    const randomRot = (Math.random() - 0.5) * 24;
    letterEl.style.setProperty('--random-rotation', `${randomRot}deg`);

    letterEl.innerHTML = `
      <div class="envelope-mini">
        <span class="seal-heart">⭐</span>
      </div>
    `;

    lettersContainer.appendChild(letterEl);
    playDropSound();

    const activeObj = {
      element: letterEl,
      data: letterData
    };
    activeDroppedLetters.push(activeObj);

    setTimeout(() => {
      letterEl.classList.remove('dropping');
      letterEl.classList.add('landed');
    }, 1500);

    letterEl.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetterModalByData(letterData, activeObj);
      
      const rect = letterEl.getBoundingClientRect();
      triggerSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }

  // ------------------------------------------------------------------------
  // 6. PHASE 3: LETTER READING MODAL & NAVIGATION
  // ------------------------------------------------------------------------
  const letterModal = document.getElementById('letter-modal');
  const modalTitle = document.getElementById('modal-letter-title');
  const modalContent = document.getElementById('modal-letter-content');
  const modalDate = document.getElementById('modal-letter-date');
  const modalSender = document.getElementById('modal-sender-name');
  const likeCountEl = document.getElementById('like-count');
  
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnPrevLetter = document.getElementById('btn-prev-letter');
  const btnNextLetter = document.getElementById('btn-next-letter');
  const btnLikeLetter = document.getElementById('btn-like-letter');

  function openLetterModalByData(data, activeObj) {
    playOpenSound();
    
    currentActiveModalIndex = letterPool.findIndex(l => l.id === data.id);
    if (currentActiveModalIndex === -1) currentActiveModalIndex = 0;

    renderModalContent(letterPool[currentActiveModalIndex]);
    letterModal.classList.remove('modal-hidden');
  }

  function renderModalContent(item) {
    modalTitle.textContent = item.title;
    modalContent.textContent = item.content;
    modalDate.textContent = item.date || "Hôm nay";
    modalSender.textContent = item.sender || "Hà Trọng Nghĩa";
    likeCountEl.textContent = item.likes;
  }

  function closeModal() {
    letterModal.classList.add('modal-hidden');
  }

  btnCloseModal.addEventListener('click', closeModal);
  document.querySelector('#letter-modal .modal-backdrop').addEventListener('click', closeModal);

  btnPrevLetter.addEventListener('click', () => {
    currentActiveModalIndex = (currentActiveModalIndex - 1 + letterPool.length) % letterPool.length;
    renderModalContent(letterPool[currentActiveModalIndex]);
    playTypingSound();
  });

  btnNextLetter.addEventListener('click', () => {
    currentActiveModalIndex = (currentActiveModalIndex + 1) % letterPool.length;
    renderModalContent(letterPool[currentActiveModalIndex]);
    playTypingSound();
  });

  btnLikeLetter.addEventListener('click', (e) => {
    letterPool[currentActiveModalIndex].likes += 1;
    likeCountEl.textContent = letterPool[currentActiveModalIndex].likes;
    
    const rect = btnLikeLetter.getBoundingClientRect();
    triggerSparkleBurst(rect.left + rect.width / 2, rect.top);
    playOpenSound();
  });

  // ------------------------------------------------------------------------
  // 7. CONTROL BAR ACTIONS ("MƯA SAO BĂNG" SHOOTING STAR RAIN)
  // ------------------------------------------------------------------------
  const btnReplayTruck = document.getElementById('btn-replay-truck');
  const btnAddLetter = document.getElementById('btn-add-letter');
  const btnStarStorm = document.getElementById('btn-star-storm');

  btnReplayTruck.addEventListener('click', () => {
    triggerTruckDeliveryRun();
  });

  // MAGICAL SHOOTING STAR RAIN EFFECT 🌠
  btnStarStorm.addEventListener('click', () => {
    playOpenSound();
    triggerShootingStarRain(18);
  });
});
