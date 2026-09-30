document.addEventListener('DOMContentLoaded', () => {
    // --- 6 Special Wedding Prizes ---
    const PRIZES = [
        {
            id: 'dubai',
            name: 'TRIP KE DUBAI',
            tag: 'LUXURY GETAWAY',
            icon: '✈️',
            desc: 'Nikmati kemewahan liburan impian tak terlupakan di Dubai!',
            theme: 'theme-dubai'
        },
        {
            id: 'italy',
            name: 'TRIP KE ITALY',
            tag: 'ROMANTIC ESCAPE',
            icon: '🏛️',
            desc: 'Wisata romantis menyusuri kanal dan kota bersejarah di Italia!',
            theme: 'theme-italy'
        },
        {
            id: 'korea',
            name: 'TRIP KE KOREA',
            tag: 'K-CULTURE TOUR',
            icon: '🌸',
            desc: 'Jelajahi keindahan sakura dan pesona romantis di Korea Selatan!',
            theme: 'theme-korea'
        },
        {
            id: 'swiss',
            name: 'TRIP KE SWISS',
            tag: 'ALPS ADVENTURE',
            icon: '🏔️',
            desc: 'Panorama magis pegunungan salju dan alam spektakuler di Swiss!',
            theme: 'theme-swiss'
        },
        {
            id: 'dinner',
            name: 'DINNER ROMANTIS',
            tag: 'SPECIAL DATE',
            icon: '🍷',
            desc: 'Makan malam eksklusif berdua dengan suasana penuh kehangatan cinta!',
            theme: 'theme-dinner'
        },
        {
            id: 'hair',
            name: 'HAIR TREATMENT',
            tag: 'PREMIUM SPA',
            icon: '💇‍♀️',
            desc: 'Manjakan diri dengan perawatan salon dan hair spa bintang lima!',
            theme: 'theme-hair'
        }
    ];

    // State
    let activePrizes = [...PRIZES];
    let isSoundEnabled = true;
    let audioCtx = null;

    // Elements
    const setupPage = document.getElementById('setup-page');
    const gamePage = document.getElementById('game-page');
    const btnStart = document.getElementById('btn-start');
    const btnBack = document.getElementById('btn-back');
    const btnShuffle = document.getElementById('btn-shuffle');
    const btnRevealAll = document.getElementById('btn-reveal-all');
    const btnSound = document.getElementById('btn-sound');
    const soundIcon = document.getElementById('sound-icon');
    const gridContainer = document.getElementById('grid-container');
    const gameStatusText = document.getElementById('game-status-text');

    // Modal Elements
    const winnerModal = document.getElementById('winner-modal');
    const modalBoxNumber = document.getElementById('modal-box-number');
    const modalPrizeIcon = document.getElementById('modal-prize-icon');
    const modalPrizeTitle = document.getElementById('modal-prize-title');
    const modalPrizeDesc = document.getElementById('modal-prize-desc');
    const btnCloseModal = document.getElementById('btn-close-modal');

    // --- Web Audio API Synthesizer (No external audio files needed) ---
    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSound(type) {
        if (!isSoundEnabled) return;
        try {
            initAudio();
            if (!audioCtx) return;

            const now = audioCtx.currentTime;

            if (type === 'flip') {
                // Gentle card flip whoosh
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(700, now + 0.14);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'win') {
                // Celebratory chord (C5, E5, G5, C6)
                const freqs = [523.25, 659.25, 783.99, 1046.50];
                freqs.forEach((freq, idx) => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.07);

                    gain.gain.setValueAtTime(0, now + idx * 0.07);
                    gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.07 + 0.03);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.6);

                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(now + idx * 0.07);
                    osc.stop(now + idx * 0.07 + 0.65);
                });
            } else if (type === 'click') {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.06);
            }
        } catch (e) {
            console.error('Audio playback error', e);
        }
    }

    // --- Lightweight Built-in Confetti Engine ---
    const confettiCanvas = document.getElementById('confetti-canvas');
    const ctx = confettiCanvas.getContext('2d');
    let confettiParticles = [];
    let isConfettiRunning = false;

    function resizeConfettiCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeConfettiCanvas);
    resizeConfettiCanvas();

    function triggerConfetti(startX, startY, count = 80) {
        const colors = ['#f5d061', '#ffd700', '#ffffff', '#ff6b8b', '#48dbfb', '#ff9ff3', '#1dd1a1'];
        const originX = startX !== undefined ? startX : window.innerWidth / 2;
        const originY = startY !== undefined ? startY : window.innerHeight / 2;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 4 + Math.random() * 9;
            confettiParticles.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 3,
                size: 6 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                opacity: 1,
                decay: 0.007 + Math.random() * 0.008
            });
        }

        if (!isConfettiRunning) {
            isConfettiRunning = true;
            requestAnimationFrame(renderConfetti);
        }
    }

    function renderConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        for (let i = confettiParticles.length - 1; i >= 0; i--) {
            const p = confettiParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.22; // gravity
            p.vx *= 0.98; // air resistance
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0 || p.y > confettiCanvas.height + 50) {
                confettiParticles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
        }

        if (confettiParticles.length > 0) {
            requestAnimationFrame(renderConfetti);
        } else {
            isConfettiRunning = false;
        }
    }

    // --- Generate Floating Background Stars ---
    const starsContainer = document.getElementById('stars-container');
    function generateStars() {
        starsContainer.innerHTML = '';
        const starCount = 35;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${2 + Math.random() * 4}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }
    generateStars();

    // --- Shuffle Function (Fisher-Yates) ---
    function shufflePrizes(array) {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // --- Page Navigation ---
    function showPage(pageToShow) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            setTimeout(() => {
                if (!page.classList.contains('active')) {
                    page.style.display = 'none';
                }
            }, 300);
        });

        setTimeout(() => {
            pageToShow.style.display = 'flex';
            void pageToShow.offsetWidth;
            pageToShow.classList.add('active');
        }, 50);
    }

    // --- Render the 6 Squares ---
    function renderGrid() {
        gridContainer.innerHTML = '';

        activePrizes.forEach((prize, index) => {
            const boxNum = index + 1;

            const card = document.createElement('div');
            card.className = 'grid-card';
            card.dataset.index = index;
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Kotak Rahasia nomor ${boxNum}`);

            card.innerHTML = `
                <div class="card-inner">
                    <!-- Front Face -->
                    <div class="card-face card-front">
                        <div class="card-box-crest">🎁</div>
                        <div class="card-number">${boxNum}</div>
                        <div class="card-label">KOTAK ${boxNum}</div>
                        <div class="card-tap-hint">✦ Buka Kotak ✦</div>
                    </div>

                    <!-- Back Face -->
                    <div class="card-face card-back ${prize.theme}">
                        <div class="revealed-tag">${prize.tag}</div>
                        <div class="revealed-icon">${prize.icon}</div>
                        <h4 class="revealed-title">${prize.name}</h4>
                        <p class="revealed-desc">${prize.desc}</p>
                        <div class="revealed-box-num">KOTAK #${boxNum}</div>
                    </div>
                </div>
            `;

            // Click listener
            card.addEventListener('click', (e) => {
                handleCardClick(card, prize, boxNum, e);
            });

            // Keyboard accessibility (Enter / Space)
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card, prize, boxNum, e);
                }
            });

            gridContainer.appendChild(card);
        });

        updateGameStatus();
    }

    function handleCardClick(card, prize, boxNum, event) {
        initAudio();
        if (card.classList.contains('revealed')) return;

        // Reveal card
        card.classList.add('revealed');
        playSound('flip');

        // Confetti burst from card coordinates
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setTimeout(() => {
            triggerConfetti(centerX, centerY, 70);
            playSound('win');
        }, 220);

        // Open Winner Celebration Modal
        setTimeout(() => {
            showWinnerModal(boxNum, prize);
        }, 500);

        updateGameStatus();
    }

    function showWinnerModal(boxNum, prize) {
        modalBoxNumber.textContent = `KOTAK #${boxNum}`;
        modalPrizeIcon.textContent = prize.icon;
        modalPrizeTitle.textContent = prize.name;
        modalPrizeDesc.textContent = prize.desc;

        winnerModal.classList.add('active');
        // Extra celebration confetti
        triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 60);
    }

    function closeModal() {
        winnerModal.classList.remove('active');
        playSound('click');
    }

    function updateGameStatus() {
        const revealedCount = document.querySelectorAll('.grid-card.revealed').length;
        if (revealedCount === 0) {
            gameStatusText.textContent = 'Semua 6 kotak masih tersembunyi. Silakan pilih salah satu!';
        } else if (revealedCount === 6) {
            gameStatusText.textContent = '🎉 Semua 6 hadiah telah terbuka!';
        } else {
            gameStatusText.textContent = `${revealedCount} dari 6 kotak telah terbuka.`;
        }
    }

    // --- Action Handlers ---
    btnStart.addEventListener('click', () => {
        initAudio();
        playSound('click');
        // Shuffle prizes when starting a new game
        activePrizes = shufflePrizes(PRIZES);
        renderGrid();
        showPage(gamePage);
    });

    btnBack.addEventListener('click', () => {
        playSound('click');
        showPage(setupPage);
    });

    btnShuffle.addEventListener('click', () => {
        initAudio();
        playSound('click');
        // Unreveal all cards first with animation
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(c => c.classList.remove('revealed'));

        setTimeout(() => {
            activePrizes = shufflePrizes(PRIZES);
            renderGrid();
            gameStatusText.textContent = '🔀 Posisi hadiah berhasil diacak kembali!';
        }, 350);
    });

    btnRevealAll.addEventListener('click', () => {
        initAudio();
        playSound('click');
        const cards = document.querySelectorAll('.grid-card:not(.revealed)');
        if (cards.length === 0) return;

        cards.forEach((card, idx) => {
            setTimeout(() => {
                card.classList.add('revealed');
                playSound('flip');
                const rect = card.getBoundingClientRect();
                triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
            }, idx * 180);
        });

        setTimeout(() => {
            playSound('win');
            triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.3, 100);
            updateGameStatus();
        }, cards.length * 180 + 100);
    });

    // Sound toggle
    btnSound.addEventListener('click', () => {
        initAudio();
        isSoundEnabled = !isSoundEnabled;
        soundIcon.textContent = isSoundEnabled ? '🔊' : '🔇';
        btnSound.title = isSoundEnabled ? 'Mute Sound' : 'Unmute Sound';
        if (isSoundEnabled) {
            playSound('click');
        }
    });

    // Modal close listeners
    btnCloseModal.addEventListener('click', closeModal);
    winnerModal.addEventListener('click', (e) => {
        if (e.target === winnerModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && winnerModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Initial page setup
    setupPage.style.display = 'flex';
    gamePage.style.display = 'none';
    setTimeout(() => {
        setupPage.classList.add('active');
    }, 50);
});
