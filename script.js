document.addEventListener('DOMContentLoaded', () => {
    const setupPage = document.getElementById('setup-page');
    const gamePage = document.getElementById('game-page');
    const setupForm = document.getElementById('setup-form');
    const btnBack = document.getElementById('btn-back');
    const gridContainer = document.getElementById('grid-container');

    // Generate letters array A-Z for columns
    const getLetters = (num) => {
        const letters = [];
        for (let i = 0; i < num; i++) {
            letters.push(numberToColumnName(i + 1));
        }
        return letters;
    };

    const numberToColumnName = (num) => {
        let ret = '';
        for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        }
        return ret;
    };

    // Shuffle array function (Fisher-Yates)
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const showPage = (pageToShow) => {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            setTimeout(() => {
                if(!page.classList.contains('active')) {
                    page.style.display = 'none';
                }
            }, 500); // Wait for transition
        });
        
        setTimeout(() => {
            pageToShow.style.display = pageToShow.id === 'setup-page' ? 'flex' : 'block';
            // Trigger reflow
            void pageToShow.offsetWidth;
            pageToShow.classList.add('active');
        }, 10);
    };

    const createGrid = (rows, cols) => {
        gridContainer.innerHTML = '';
        
        // CSS Grid setup: 1 column for row numbers + `cols` columns
        gridContainer.style.gridTemplateColumns = `auto repeat(${cols}, 1fr)`;

        // Total numbers
        const totalCells = rows * cols;
        const numbers = Array.from({ length: totalCells }, (_, i) => i + 1);
        const shuffledNumbers = shuffleArray(numbers);

        // Letters for column headers
        const colLetters = getLetters(cols);

        // --- Create headers ---
        
        // 1. Top-left empty cell
        const topLeft = document.createElement('div');
        gridContainer.appendChild(topLeft);

        // 2. Column headers (A, B, C...)
        for (let c = 0; c < cols; c++) {
            const header = document.createElement('div');
            header.className = 'grid-header-cell';
            header.textContent = colLetters[c];
            gridContainer.appendChild(header);
        }

        let numIndex = 0;

        // --- Create rows ---
        for (let r = 0; r < rows; r++) {
            // Row header (1, 2, 3...)
            const rowHeader = document.createElement('div');
            rowHeader.className = 'grid-header-cell';
            rowHeader.textContent = r + 1;
            gridContainer.appendChild(rowHeader);

            // Cells for this row
            for (let c = 0; c < cols; c++) {
                const cellWrapper = document.createElement('div');
                cellWrapper.className = 'grid-cell';
                
                const cellInner = document.createElement('div');
                cellInner.className = 'grid-cell-inner';

                const cellFront = document.createElement('div');
                cellFront.className = 'grid-cell-front';

                const cellBack = document.createElement('div');
                cellBack.className = 'grid-cell-back';
                cellBack.textContent = shuffledNumbers[numIndex];

                cellInner.appendChild(cellFront);
                cellInner.appendChild(cellBack);
                cellWrapper.appendChild(cellInner);

                // Click event to reveal
                cellWrapper.addEventListener('click', function() {
                    if (!this.classList.contains('revealed')) {
                        this.classList.add('revealed');
                    }
                });

                gridContainer.appendChild(cellWrapper);
                numIndex++;
            }
        }
    };

    setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rows = parseInt(document.getElementById('rows').value);
        const cols = parseInt(document.getElementById('cols').value);
        
        if (rows > 0 && cols > 0) {
            createGrid(rows, cols);
            showPage(gamePage);
        }
    });

    btnBack.addEventListener('click', () => {
        showPage(setupPage);
        // Clear grid to prevent memory leaks/stale data
        setTimeout(() => {
            gridContainer.innerHTML = '';
        }, 500);
    });
    
    // Initial display
    setupPage.style.display = 'flex';
    gamePage.style.display = 'none';
    
    // Trigger initial transition
    setTimeout(() => {
        setupPage.classList.add('active');
    }, 100);
});
