const board = document.getElementById('board');
const movesDisplay = document.getElementById('moves');
let moves = 0;
let flippedCards = [];
let matchedCount = 0;

// --- תוספת: הגדרת צליל מחיאות כפיים ---
// ודא שיש לך קובץ בשם cheer.mp3 בתיקייה
const cheerSound = new Audio('cheer.mp3'); 

const baseImages = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
    'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
    'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg',
    'img13.jpg', 'img14.jpg', 'img15.jpg', 'img16.jpg'
];

const images = [...baseImages, ...baseImages];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const shuffledImages = shuffle(images);
    board.innerHTML = ''; 
    
    shuffledImages.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = imgSrc;
        
        card.innerHTML = `
            <div class="card-back">❓</div>
            <div class="card-front"><img src="${imgSrc}" alt="תמונת משחק"></div>
        `;
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.value === card2.dataset.value) {
        // --- יש התאמה! ---
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        // --- תוספת: הפעלת צליל ---
        cheerSound.play(); 

        // --- תוספת: הפעלת קונפטי ---
        // זו פונקציה מהספרייה החיצונית שטענו ב-HTML
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 } // הקונפטי יתחיל קצת מתחת למרכז המסך
        });

        flippedCards = [];
        matchedCount += 2;
        
        if (matchedCount === images.length) {
            setTimeout(() => alert(`כל הכבוד! סיימת את המשחק ב-${moves} ניסיונות!`), 600);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    moves = 0;
    matchedCount = 0;
    movesDisplay.innerText = moves;
    flippedCards = [];
    createBoard();
}

createBoard();
