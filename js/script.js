/******************************************************
 * 1) FLASHCARDS DATA
 ******************************************************/
const flashcardSets = {
  japaneseWeek1: [
    {
      frontText: 'Kudasai',
      backText: 'Please',
      audioPath: '/assets/audio/kudasai.mp3',
    },
    {
      frontText: 'Hai',
      backText: 'Yes',
      audioPath: '/assets/audio/hai.mp3',
    },
    {
      frontText: 'Iie',
      backText: 'No',
      audioPath: '/assets/audio/iie.mp3',
    },
    {
      frontText: 'o namae wa?',
      backText: 'What is your name?',
      audioPath: 'assets/audio/o-namae-wa.mp3',
    },
    {
      frontText: 'Tanoshimi',
      backText: 'I’m excited',
      audioPath: '/assets/audio/tanoshimi.mp3',
    },
    {
      frontText: 'Konnichiwa',
      backText: 'Hello',
      audioPath: 'assets/audio/konnichiwa.mp3',
    },
    {
      frontText: 'Watashi wa [your name] desu',
      backText: 'I am [your name]',
    },
    {
      frontText: 'Ogenki desu ka?',
      backText: 'How are you?',
      audioPath: '/assets/audio/ogenki-desu-ka.mp3',
    },
    {
      frontText: 'Genki desu',
      backText: 'I’m good',
      audioPath: '/assets/audio/genki-desu.mp3',
    },
    {
      frontText: 'Jaa, mata',
      backText: 'Goodbye',
      audioPath: '/assets/audio/jaa.mp3',
    }
  ],

  japaneseWeek2: [
    {
      frontText: 'Grape',
      backText: 'Budou',
      audioPath: '',
    },
    {
      frontText: 'Apple',
      backText: 'Ringo',
      audioPath: '',
    },
    {
      frontText: 'Banana',
      backText: 'Banana',
      audioPath: '',
    },
    {
      frontText: 'Tamago',
      backText: 'Egg',
      audioPath: '',
    },
    {
      frontText: 'Gohan',
      backText: 'Rice', 
      audioPath: '',
    },
    {
      frontText: 'Koohii',
      backText: 'Coffee',
      audioPath: '',
    },
    {
      frontText: 'Mizu',  
      backText: 'Water',
      audioPath: '',
    },
    {
      frontText: 'Pan',
      backText: 'Bread',
      audioPath: '',
    },
  ]
};



// 3) Get the flashcards from the chosen set
const flashcards = flashcardSets[currentSetKey];

// 4) The index tracking stays the same
let currentIndex = 0;

/******************************************************
 * 2) SHOW / UPDATE FLASHCARD
 ******************************************************/
function showFlashcard(index) {
  // Clamping the index so we don't go past first/last
  if (index < 0) {
    index = 0; // stay at first card
  }
  if (index >= flashcards.length) {
    index = flashcards.length - 1; // stay at last card
  }

  // Update global pointer
  currentIndex = index;

  // Update text
  const frontTextEl = document.querySelector('.flashcard-front .flashcard-text');
  const backTextEl  = document.querySelector('.flashcard-back .back-text');
  if (frontTextEl) frontTextEl.textContent = flashcards[currentIndex].frontText;
  if (backTextEl)  backTextEl.textContent  = flashcards[currentIndex].backText;
  
  // Also update the counter
  updateCardCounter();
}

/******************************************************
 * 2.5) CARD COUNTER
 ******************************************************/
function updateCardCounter() {
  // For example, <p id="card-counter"></p> in HTML
  const counterEl = document.getElementById('card-counter');
  if (!counterEl) return;

  // currentIndex is 0-based, so we do +1 for user-friendly display
  const currentCardNumber = currentIndex + 1;
  const totalCards = flashcards.length;

  counterEl.textContent = `${currentCardNumber} / ${totalCards}`;
}

/******************************************************
 * 3) NAVIGATION
 ******************************************************/
function nextFlashcard() {
  showFlashcard(currentIndex + 1);
}

function previousFlashcard() {
  showFlashcard(currentIndex - 1);
}

/******************************************************
 * 4) FLIP LOGIC
 ******************************************************/
function flipCard(event) {
  // Don't flip if user clicked a button
  if (event.target.closest('.flashcard-button')) {
    return;
  }
  document.querySelector('.flashcard-inner').classList.toggle('is-flipped');
}

/******************************************************
 * 5) BUTTONS: LIGHTBULB, BOOK, SPEAKER, ETC.
 ******************************************************/
function showFirstLetter() {
  // We’re using the back text here (per your request)
  const flashcardText = document.querySelector('.flashcard-back .back-text');
  if (!flashcardText) {
    alert('No text found on the back!');
    return;
  }
  const text = flashcardText.textContent.trim();
  if (text.length > 0) {
    alert(`First letter: ${text[0]}`);
  } else {
    alert('No text found!');
  }
}

/******************************************************
 * 6) PAGE LOAD
 ******************************************************/
document.addEventListener('DOMContentLoaded', () => {
  // Show the first flashcard
  showFlashcard(0);

  // Lightbulb => show first letter
  document.querySelectorAll('.button-lightbulb').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation(); // prevent flip
      showFirstLetter();
    });
  });

  // Book => open google.com
  document.querySelectorAll('.button-book').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      window.open('https://www.google.com', '_blank');
    });
  });

  // Speaker => play audio for current card
  document.querySelectorAll('.button-speaker').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const audioPath = flashcards[currentIndex].audioPath || 'assets/audio/example.mp3';
      const audio = new Audio(audioPath);
      audio.play();
    });
  });

  // Right arrow => next flashcard
  document.querySelectorAll('.button-arrow.bottom-right').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      nextFlashcard();
    });
  });

  // Left arrow => previous flashcard
  document.querySelectorAll('.button-arrow.bottom-left').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      previousFlashcard();
    });
  });
});
