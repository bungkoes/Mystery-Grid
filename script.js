document.addEventListener('DOMContentLoaded', () => {
    // --- 6 Default Wedding Prizes ---
    const DEFAULT_PRIZES = [
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

    // --- Quick Preset Templates ---
    const PRESET_TEMPLATES = {
        wedding: DEFAULT_PRIZES,
        gadget: [
            {
                id: 'gadget-1',
                name: 'IPHONE 16 PRO',
                tag: 'FLAGSHIP PHONE',
                icon: '📱',
                desc: 'Smartphone tercanggih dengan kamera pro dan performa luar biasa!',
                theme: 'theme-dubai'
            },
            {
                id: 'gadget-2',
                name: 'IPAD AIR M2',
                tag: 'CREATIVE TABLET',
                icon: '💻',
                desc: 'Layar jernih dan performa super kencang untuk kerja & kreasi!',
                theme: 'theme-swiss'
            },
            {
                id: 'gadget-3',
                name: 'APPLE WATCH S10',
                tag: 'SMARTWATCH',
                icon: '⌚',
                desc: 'Desain elegan dengan pemantau kesehatan dan kebugaran aktif!',
                theme: 'theme-dinner'
            },
            {
                id: 'gadget-4',
                name: 'AIRPODS PRO 2',
                tag: 'PREMIUM AUDIO',
                icon: '🎧',
                desc: 'Audio spasial berkelas dengan peredam kebisingan aktif terbaik!',
                theme: 'theme-hair'
            },
            {
                id: 'gadget-5',
                name: 'PLAYSTATION 5',
                tag: 'NEXT-GEN GAMING',
                icon: '🎮',
                desc: 'Konsol game generasi terbaru dengan pengalaman visual memukau!',
                theme: 'theme-korea'
            },
            {
                id: 'gadget-6',
                name: 'NESPRESSO MACHINE',
                tag: 'COFFEE MAKER',
                icon: '☕',
                desc: 'Nikmati kopi cita rasa kafe mewah langsung di rumah setiap pagi!',
                theme: 'theme-italy'
            }
        ],
        gold: [
            {
                id: 'gold-1',
                name: 'LOGAM MULIA 10G',
                tag: 'INVESTASI EMAS',
                icon: '🥇',
                desc: 'Emas murni 99.9% bersertifikat Antam untuk tabungan masa depan!',
                theme: 'theme-dubai'
            },
            {
                id: 'gold-2',
                name: 'UANG TUNAI RP 5JT',
                tag: 'GRAND CASH',
                icon: '💵',
                desc: 'Hadiah uang tunai langsung tanpa potongan untuk pemenang beruntung!',
                theme: 'theme-hair'
            },
            {
                id: 'gold-3',
                name: 'STAYCATION 5★',
                tag: 'LUXURY STAY',
                icon: '🏨',
                desc: 'Menginap mewah 3 hari 2 malam di hotel bintang lima favorit!',
                theme: 'theme-swiss'
            },
            {
                id: 'gold-4',
                name: 'VOUCHER BELANJA 2JT',
                tag: 'SHOPPING SPREE',
                icon: '🛍️',
                desc: 'Bebas belanja kebutuhan dan pakaian favorit di pusat perbelanjaan!',
                theme: 'theme-italy'
            },
            {
                id: 'gold-5',
                name: 'CINCIN EMAS SPESIAL',
                tag: 'JEWELRY GIFT',
                icon: '💍',
                desc: 'Perhiasan cincin emas berkilau indah penuh kenangan manis!',
                theme: 'theme-korea'
            },
            {
                id: 'gold-6',
                name: 'LUXURY SPA COUPLE',
                tag: 'RELAXATION',
                icon: '🧖‍♀️',
                desc: 'Paket relaksasi spa tubuh lengkap berdua di resort eksklusif!',
                theme: 'theme-dinner'
            }
        ]
    };

    const THEMES = [
        { value: 'theme-dubai', label: 'Emas Mewah (Gold)' },
        { value: 'theme-italy', label: 'Merah Romantis (Crimson)' },
        { value: 'theme-korea', label: 'Ungu Sakura (Purple)' },
        { value: 'theme-swiss', label: 'Biru Es Swiss (Azure)' },
        { value: 'theme-dinner', label: 'Mawar Elegan (Ruby)' },
        { value: 'theme-hair', label: 'Hijau Zamrud (Emerald)' }
    ];

    const QUICK_EMOJIS = ['🎁', '✈️', '💍', '📱', '🥇', '💵', '🏨', '🏖️', '🚗', '🛵', '🛍️', '🍷', '☕', '🎮', '⌚', '🎧'];

    const STORAGE_KEY = 'wedding_game_prizes_v1';

    // --- Local Storage Management ---
    function loadSavedPrizes() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length === 6) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn('Failed to load saved prizes:', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_PRIZES));
    }

    function savePrizesToStorage(prizesArray) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prizesArray));
        } catch (e) {
            console.error('Failed to save prizes:', e);
        }
    }

    // State
    let currentPrizes = loadSavedPrizes();
    let activePrizes = [...currentPrizes];
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
    const previewList = document.getElementById('preview-list');

    // Editor & Modal Elements
    const btnOpenEditor = document.getElementById('btn-open-editor');
    const btnEditPreview = document.getElementById('btn-edit-preview');
    const btnEditPrizesGame = document.getElementById('btn-edit-prizes-game');
    const editPrizesModal = document.getElementById('edit-prizes-modal');
    const btnCloseEditModalX = document.getElementById('btn-close-edit-modal-x');
    const btnCancelEdit = document.getElementById('btn-cancel-edit');
    const btnResetPrizes = document.getElementById('btn-reset-prizes');
    const editPrizesForm = document.getElementById('edit-prizes-form');
    const prizesEditorGrid = document.getElementById('prizes-editor-grid');
    const presetButtons = document.querySelectorAll('.btn-preset');
    const toastEl = document.getElementById('toast');

    // Winner Modal Elements
    const winnerModal = document.getElementById('winner-modal');
    const modalBoxNumber = document.getElementById('modal-box-number');
    const modalPrizeIcon = document.getElementById('modal-prize-icon');
    const modalPrizeTitle = document.getElementById('modal-prize-title');
    const modalPrizeDesc = document.getElementById('modal-prize-desc');
    const btnCloseModal = document.getElementById('btn-close-modal');

    // --- Toast Notification ---
    let toastTimeout = null;
    function showToast(message, icon = '✨') {
        if (!toastEl) return;
        toastEl.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastEl.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3200);
    }

    // --- Web Audio API Synthesizer ---
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

    // --- Built-in Confetti Engine ---
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
            p.vy += 0.22;
            p.vx *= 0.98;
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

    // --- Floating Background Stars ---
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
            star.animationDuration = `${2 + Math.random() * 4}s`;
            star.animationDelay = `${Math.random() * 3}s`;
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

    // --- Render Welcome Page Preview List ---
    function renderPreviewList() {
        if (!previewList) return;
        previewList.innerHTML = '';

        currentPrizes.forEach((prize, index) => {
            const li = document.createElement('li');
            li.setAttribute('role', 'button');
            li.setAttribute('tabindex', '0');
            li.title = `Klik untuk edit Hadiah #${index + 1}: ${prize.name}`;

            li.innerHTML = `
                <div class="preview-list-content">
                    <span class="prize-emoji">${prize.icon || '🎁'}</span>
                    <span class="prize-text">${prize.name}</span>
                </div>
                <span class="preview-item-edit-icon" title="Edit">✏️</span>
            `;

            const triggerEdit = () => {
                playSound('click');
                openEditModal(index);
            };

            li.addEventListener('click', triggerEdit);
            li.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerEdit();
                }
            });

            previewList.appendChild(li);
        });
    }

    // --- Populate Prize Editor Fields ---
    function populateEditorFields(prizesData) {
        if (!prizesEditorGrid) return;
        prizesEditorGrid.innerHTML = '';

        prizesData.forEach((prize, idx) => {
            const boxNum = idx + 1;
            const card = document.createElement('div');
            card.className = 'prize-edit-card';
            card.dataset.index = idx;

            card.innerHTML = `
                <div class="prize-edit-header">
                    <span class="prize-box-badge">KOTAK #${boxNum}</span>
                    <span class="field-label">PENGATURAN</span>
                </div>

                <div class="field-row">
                    <div class="field-group field-emoji">
                        <label class="field-label" for="prize-icon-${idx}">Ikon</label>
                        <input type="text" id="prize-icon-${idx}" class="field-input emoji-input" 
                               value="${prize.icon || '🎁'}" maxlength="4" required title="Emoji Hadiah">
                    </div>
                    <div class="field-group">
                        <label class="field-label" for="prize-name-${idx}">Nama Hadiah *</label>
                        <input type="text" id="prize-name-${idx}" class="field-input input-prize-name" 
                               value="${prize.name}" placeholder="Contoh: TRIP KE DUBAI" required>
                    </div>
                </div>

                <div class="quick-emojis">
                    ${QUICK_EMOJIS.slice(0, 8).map(em => `
                        <button type="button" class="quick-emoji-btn" data-target="prize-icon-${idx}" data-emoji="${em}">${em}</button>
                    `).join('')}
                </div>

                <div class="field-row">
                    <div class="field-group">
                        <label class="field-label" for="prize-tag-${idx}">Kategori / Badge</label>
                        <input type="text" id="prize-tag-${idx}" class="field-input input-prize-tag" 
                               value="${prize.tag || 'SPESIAL'}" placeholder="Contoh: GRAND PRIZE">
                    </div>
                    <div class="field-group">
                        <label class="field-label" for="prize-theme-${idx}">Warna Tema</label>
                        <select id="prize-theme-${idx}" class="field-select select-prize-theme">
                            ${THEMES.map(th => `
                                <option value="${th.value}" ${prize.theme === th.value ? 'selected' : ''}>${th.label}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label" for="prize-desc-${idx}">Deskripsi Hadiah</label>
                    <input type="text" id="prize-desc-${idx}" class="field-input input-prize-desc" 
                           value="${prize.desc || ''}" placeholder="Ucapan atau penjelasan hadiah">
                </div>
            `;

            prizesEditorGrid.appendChild(card);
        });

        // Attach quick emoji listeners
        prizesEditorGrid.querySelectorAll('.quick-emoji-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target');
                const emoji = btn.getAttribute('data-emoji');
                const input = document.getElementById(targetId);
                if (input) {
                    input.value = emoji;
                    playSound('click');
                    input.focus();
                }
            });
        });
    }

    // --- Open / Close Edit Modal ---
    function openEditModal(focusIndex = 0) {
        initAudio();
        populateEditorFields(currentPrizes);
        
        // Reset active state on preset buttons
        presetButtons.forEach(btn => btn.classList.remove('active'));

        editPrizesModal.classList.add('active');
        editPrizesModal.setAttribute('aria-hidden', 'false');

        // Scroll to and focus requested card
        setTimeout(() => {
            if (prizesEditorGrid.children[focusIndex]) {
                const targetCard = prizesEditorGrid.children[focusIndex];
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                const nameInput = targetCard.querySelector('.input-prize-name');
                if (nameInput) nameInput.focus();
            }
        }, 120);
    }

    function closeEditModal() {
        editPrizesModal.classList.remove('active');
        editPrizesModal.setAttribute('aria-hidden', 'true');
        playSound('click');
    }

    // --- Save Edited Prizes ---
    function handleSavePrizes(e) {
        if (e) e.preventDefault();
        initAudio();

        const cards = prizesEditorGrid.querySelectorAll('.prize-edit-card');
        const newPrizes = [];

        cards.forEach((card, idx) => {
            const iconInput = card.querySelector('.emoji-input');
            const nameInput = card.querySelector('.input-prize-name');
            const tagInput = card.querySelector('.input-prize-tag');
            const themeSelect = card.querySelector('.select-prize-theme');
            const descInput = card.querySelector('.input-prize-desc');

            const name = (nameInput?.value || '').trim() || `HADIAH #${idx + 1}`;
            const icon = (iconInput?.value || '').trim() || '🎁';
            const tag = (tagInput?.value || '').trim() || 'SPESIAL';
            const theme = themeSelect?.value || 'theme-dubai';
            const desc = (descInput?.value || '').trim() || 'Selamat! Kamu memenangkan hadiah ini!';

            newPrizes.push({
                id: `custom-prize-${idx + 1}`,
                name: name.toUpperCase(),
                tag: tag.toUpperCase(),
                icon,
                desc,
                theme
            });
        });

        if (newPrizes.length === 6) {
            currentPrizes = newPrizes;
            activePrizes = [...currentPrizes];
            savePrizesToStorage(currentPrizes);
            renderPreviewList();

            // Also update game grid if game is displayed
            if (gamePage.classList.contains('active')) {
                renderGrid();
            }

            closeEditModal();
            playSound('win');
            triggerConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 50);
            showToast('6 Hadiah berhasil diperbarui & disimpan!');
        }
    }

    // Preset buttons handler
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const presetKey = btn.dataset.preset;
            if (PRESET_TEMPLATES[presetKey]) {
                playSound('click');
                presetButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                populateEditorFields(PRESET_TEMPLATES[presetKey]);
                showToast(`Template "${btn.textContent.trim()}" dimuat! Klik Simpan untuk terapkan.`);
            }
        });
    });

    // Reset default handler
    btnResetPrizes.addEventListener('click', () => {
        initAudio();
        playSound('click');
        if (confirm('Kembalikan 6 hadiah ke daftar awal pernikahan (Trip ke Dubai, Italy, dll)?')) {
            currentPrizes = JSON.parse(JSON.stringify(DEFAULT_PRIZES));
            activePrizes = [...currentPrizes];
            savePrizesToStorage(currentPrizes);
            populateEditorFields(currentPrizes);
            renderPreviewList();
            if (gamePage.classList.contains('active')) {
                renderGrid();
            }
            closeEditModal();
            showToast('Hadiah berhasil direset ke pilihan awal!');
        }
    });

    // Modal listeners
    if (btnOpenEditor) btnOpenEditor.addEventListener('click', () => openEditModal(0));
    if (btnEditPreview) btnEditPreview.addEventListener('click', () => openEditModal(0));
    if (btnEditPrizesGame) btnEditPrizesGame.addEventListener('click', () => openEditModal(0));
    if (btnCloseEditModalX) btnCloseEditModalX.addEventListener('click', closeEditModal);
    if (btnCancelEdit) btnCancelEdit.addEventListener('click', closeEditModal);
    if (editPrizesForm) editPrizesForm.addEventListener('submit', handleSavePrizes);

    editPrizesModal.addEventListener('click', (e) => {
        if (e.target === editPrizesModal) {
            closeEditModal();
        }
    });

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
                    <div class="card-face card-back ${prize.theme || 'theme-dubai'}">
                        <div class="revealed-tag">${prize.tag || 'SPESIAL'}</div>
                        <div class="revealed-icon">${prize.icon || '🎁'}</div>
                        <h4 class="revealed-title">${prize.name}</h4>
                        <p class="revealed-desc">${prize.desc || ''}</p>
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
        modalPrizeIcon.textContent = prize.icon || '🎁';
        modalPrizeTitle.textContent = prize.name;
        modalPrizeDesc.textContent = prize.desc || '';

        winnerModal.classList.add('active');
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
        // Shuffle current prizes when starting game
        activePrizes = shufflePrizes(currentPrizes);
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
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach(c => c.classList.remove('revealed'));

        setTimeout(() => {
            activePrizes = shufflePrizes(currentPrizes);
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

    // Winner Modal close listeners
    btnCloseModal.addEventListener('click', closeModal);
    winnerModal.addEventListener('click', (e) => {
        if (e.target === winnerModal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (winnerModal.classList.contains('active')) {
                closeModal();
            } else if (editPrizesModal.classList.contains('active')) {
                closeEditModal();
            }
        }
    });

    // Initial page setup & preview list render
    renderPreviewList();
    setupPage.style.display = 'flex';
    gamePage.style.display = 'none';
    setTimeout(() => {
        setupPage.classList.add('active');
    }, 50);
});
