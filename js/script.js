/******************************************************
 * 1) FLASHCARDS DATA
 ******************************************************/
const flashcards = [
    {
      frontText: 'Hello',
      backText: 'This is the Answer!',
      audioPath: 'assets/audio/hello.mp3',
    },
    {
      frontText: 'Bonjour',
      backText: 'C’est la réponse!',
      audioPath: 'assets/audio/bonjour.mp3'
    },
    // Add more flashcards here...
  ];
  
  let currentIndex = 0;
  
  /******************************************************
   * 2) SHOW / UPDATE FLASHCARD
   ******************************************************/
  function showFlashcard(index) {
    if (index < 0) index = flashcards.length - 1;
    if (index >= flashcards.length) index = 0;
  
    currentIndex = index;
  
    const frontTextEl = document.querySelector('.flashcard-front .flashcard-text');
    const backTextEl  = document.querySelector('.flashcard-back .back-text');
  
    if (frontTextEl) frontTextEl.textContent = flashcards[currentIndex].frontText;
    if (backTextEl)  backTextEl.textContent  = flashcards[currentIndex].backText;
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
    const flashcardText = document.querySelector('.flashcard-back .back-text');
    if (!flashcardText) {
      alert('No text found!');
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
  