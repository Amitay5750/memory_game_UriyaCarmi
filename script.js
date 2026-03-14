const board = document.getElementById('board');
const movesDisplay = document.getElementById('moves');
let moves = 0;
let flippedCards = [];
let matchedCount = 0;

// כאן יש להקפיד ששמות הקבצים תואמים בדיוק לשמות התמונות שבתיקייה שלך
const baseImages = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
    'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
    'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg',
    'img13.jpg', 'img14.jpg', 'img15.jpg', 'img16.jpg'
];

// שכפול הרשימה ליצירת 16 זוגות (32 קלפים)
const images = [...baseImages, ...baseImages];

// פונקציה לערבוב המערך
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// פונקציה לבניית הלוח
function createBoard() {
    const shuffledImages = shuffle(images);
    board.innerHTML = ''; // ניקוי הלוח הקיים
    
    shuffledImages.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = imgSrc; // שמירת שם התמונה לבדיקת התאמה
        
        // יצירת הגב והפנים של הקלף
        card.innerHTML = `
            <div class="card-back">❓</div>
            <div class="card-front"><img src="${imgSrc}" alt="תמונת משחק"></div>
        `;
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// פונקציה המטפלת בלחיצה על קלף
function flipCard() {
    // מונע לחיצה אם כבר יש 2 קלפים פתוחים, או אם לחצו על קלף שכבר פתוח/הותאם
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

// פונקציה לבדיקת התאמה בין שני הקלפים הפתוחים
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.value === card2.dataset.value) {
        // יש התאמה! נוסיף את אפקט ההצלחה
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        flippedCards = [];
        matchedCount += 2;
        
        // בדיקת ניצחון
        if (matchedCount === images.length) {
            setTimeout(() => alert(`כל הכבוד! סיימת את המשחק ב-${moves} ניסיונות!`), 600);
        }
    } else {
        // אין התאמה - הופכים חזרה אחרי שנייה
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// פונקציה לאיפוס המשחק
function resetGame() {
    moves = 0;
    matchedCount = 0;
    movesDisplay.innerText = moves;
    flippedCards = [];
    createBoard();
}

// הפעלה ראשונית של המשחק
createBoard();