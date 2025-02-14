// 1) An array of flashcards
const flashcards = [
    {
      frontText: 'Hello',
      backText: 'This is the Answer!',
      audioPath: 'assets/audio/hello.mp3',
      // anything else you need
    },
    {
      frontText: 'Bonjour',
      backText: 'C’est la réponse!',
      audioPath: 'assets/audio/bonjour.mp3'
    },
    // add as many as you like
  ];
  
  let currentIndex = 0;
  
  // 2) The function to show a card at a given index
  function showFlashcard(index) {
    const frontTextEl = document.querySelector('.flashcard-front .flashcard-text');
    const backTextEl = document.querySelector('.flashcard-back .back-text');
  
    // Bound the index just in case
    if (index < 0) index = flashcards.length - 1;
    if (index >= flashcards.length) index = 0;
    
    // Update the global pointer
    currentIndex = index;
    
    // Update the front/back text
    frontTextEl.textContent = flashcards[index].frontText;
    backTextEl.textContent   = flashcards[index].backText;
    
    // If you store icons or anything else, update them here
  }
  
  // 3) Next/Previous
  function nextFlashcard() {
    showFlashcard(currentIndex + 1);
  }
  
  function previousFlashcard() {
    showFlashcard(currentIndex - 1);
  }
  
  // 4) At page load, show the first card
  document.addEventListener('DOMContentLoaded', () => {
    showFlashcard(0);
  });
  