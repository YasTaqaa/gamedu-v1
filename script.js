let currentQuestion = 0;
let score = 0;
let questions = [];
let selectedLetters = [];
let letterSlots = [];

const soalKategori = {
  fruits: [
    { gambar: 'images/fruits/apple.jpg', jawaban: 'APPLE', nama: 'Apel' },
    { gambar: 'images/fruits/banana.jpg', jawaban: 'BANANA', nama: 'Pisang' },
    { gambar: 'images/fruits/grape.jpg', jawaban: 'GRAPE', nama: 'Anggur' },
    { gambar: 'images/fruits/melon.jpg', jawaban: 'MELON', nama: 'Melon' },
    { gambar: 'images/fruits/orange.jpg', jawaban: 'ORANGE', nama: 'Jeruk' },
    { gambar: 'images/fruits/coconut.jpg', jawaban: 'COCONUT', nama: 'Kelapa' },
    { gambar: 'images/fruits/pineapple.jpg', jawaban: 'PINEAPPLE', nama: 'Nanas' },
    { gambar: 'images/fruits/watermelon.jpg', jawaban: 'WATERMELON', nama: 'Semangka' },
    { gambar: 'images/fruits/guava.jpg', jawaban: 'GUAVA', nama: 'Jambu Biji' },
    { gambar: 'images/fruits/mango.jpg', jawaban: 'MANGO', nama: 'Mangga' }
  ],
  animals: [
    { gambar: 'images/animals/cat.jpg', jawaban: 'CAT', nama: 'Kucing' },
    { gambar: 'images/animals/dog.jpg', jawaban: 'DOG', nama: 'Anjing' },
    { gambar: 'images/animals/fish.jpg', jawaban: 'FISH', nama: 'Ikan' },
    { gambar: 'images/animals/bird.jpg', jawaban: 'BIRD', nama: 'Burung' },
    { gambar: 'images/animals/lion.jpg', jawaban: 'LION', nama: 'Singa' },
    { gambar: 'images/animals/tiger.jpg', jawaban: 'TIGER', nama: 'Harimau' },
    { gambar: 'images/animals/chicken.jpg', jawaban: 'CHICKEN', nama: 'Ayam' },
    { gambar: 'images/animals/duck.jpg', jawaban: 'DUCK', nama: 'Bebek' },
    { gambar: 'images/animals/elephant.jpg', jawaban: 'ELEPHANT', nama: 'Gajah' },
    { gambar: 'images/animals/rabbit.jpg', jawaban: 'RABBIT', nama: 'Kelinci' }
  ],
  vegetables: [
    { gambar: 'images/vegetables/carrot.jpg', jawaban: 'CARROT', nama: 'Wortel' },
    { gambar: 'images/vegetables/corn.jpg', jawaban: 'CORN', nama: 'Jagung' },
    { gambar: 'images/vegetables/cabbage.jpg', jawaban: 'CABBAGE', nama: 'Kubis' },
    { gambar: 'images/vegetables/onion.jpg', jawaban: 'ONION', nama: 'Bawang' },
    { gambar: 'images/vegetables/tomato.jpg', jawaban: 'TOMATO', nama: 'Tomat' },
    { gambar: 'images/vegetables/broccoli.jpg', jawaban: 'BROCCOLI', nama: 'Brokoli' },
    { gambar: 'images/vegetables/potato.jpg', jawaban: 'POTATO', nama: 'Kentang' },
    { gambar: 'images/vegetables/cucumber.jpg', jawaban: 'CUCUMBER', nama: 'Timun' },
    { gambar: 'images/vegetables/mushroom.jpg', jawaban: 'MUSHROOM', nama: 'Jamur' },
    { gambar: 'images/vegetables/spinach.jpg', jawaban: 'SPINACH', nama: 'Bayam' }
  ],
  greetings: [
    { gambar: 'images/greetings/good_morning.png', jawaban: 'GOOD MORNING', nama: 'Selamat pagi' },
    { gambar: 'images/greetings/good_afternoon.png', jawaban: 'GOOD AFTERNOON', nama: 'Selamat siang' },
    { gambar: 'images/greetings/good_evening.png', jawaban: 'GOOD EVENING', nama: 'Selamat sore' },
    { gambar: 'images/greetings/hello.png', jawaban: 'HELLO', nama: 'Halo' },
    { gambar: 'images/greetings/how_are_you.png', jawaban: 'HOW ARE YOU', nama: 'Apa kabar' }
  ],
  days: [
    { gambar: 'images/days/monday.jpg', jawaban: 'MONDAY', nama: 'Senin' },
    { gambar: 'images/days/tuesday.jpg', jawaban: 'TUESDAY', nama: 'Selasa' },
    { gambar: 'images/days/wednesday.jpg', jawaban: 'WEDNESDAY', nama: 'Rabu' },
    { gambar: 'images/days/thursday.jpg', jawaban: 'THURSDAY', nama: 'Kamis' },
    { gambar: 'images/days/friday.jpg', jawaban: 'FRIDAY', nama: 'Jumat' },
    { gambar: 'images/days/saturday.jpg', jawaban: 'SATURDAY', nama: 'Sabtu' },
    { gambar: 'images/days/sunday.jpg', jawaban: 'SUNDAY', nama: 'Minggu' }
  ]
};

// --- SFX SETUP dengan Error Handling ---
let sfxClick, sfxUndo, sfxNext, sfxCorrect, sfxWrong, sfxStart, sfxBack, sfxRestart;

function initializeSFX() {
  try {
    sfxClick = new Audio('sounds/sfx/click.wav');
    sfxUndo = new Audio('sounds/sfx/undo.wav');
    sfxNext = new Audio('sounds/sfx/next.wav');
    sfxCorrect = new Audio('sounds/sfx/correct_answer.wav');
    sfxWrong = new Audio('sounds/sfx/wrong_answer.wav');
    sfxStart = new Audio('sounds/sfx/start.wav');
    sfxBack = new Audio('sounds/sfx/back.wav');
    sfxRestart = new Audio('sounds/sfx/restart.wav');
    sfxScore = new Audio('sounds/sfx/score.wav');

    const audioFiles = [sfxClick, sfxUndo, sfxNext, sfxCorrect, sfxWrong, sfxStart, sfxBack, sfxRestart, sfxScore];
    audioFiles.forEach(audio => {
      if (audio) {
        audio.volume = 0.7;
        audio.preload = 'auto';
        audio.addEventListener('error', e => console.warn('Audio tidak dimuat:', e.target.src));
      }
    });
  } catch (e) {
    console.warn('Error audio init:', e);
  }
}

function playSfx(audio) {
  if (!audio) return;
  try {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) playPromise.catch(err => console.warn('Audio error:', err));
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

function getGameTypeFromTitle() {
  const urlParams = new URLSearchParams(window.location.search);
  const kategori = urlParams.get('kategori') || sessionStorage.getItem('kategori') || 'fruits';
  sessionStorage.setItem('kategori', kategori);
  return kategori;
}

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function initGame() {
  questions = shuffleArray(soalKategori[getGameTypeFromTitle()] || []);
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-container').innerHTML = `<img src="${q.gambar}" alt="${q.nama}" /><p><strong>${q.nama}</strong></p>`;

  selectedLetters = new Array(q.jawaban.replace(/ /g, '').length).fill('');
  createAnswerSlots(q.jawaban);
  createLetterButtons(q.jawaban);

  document.getElementById('result').innerText = '';
  document.getElementById('save-btn').style.display = 'inline';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('score-btn').style.display = 'none';
  document.getElementById('answer-status').style.display = 'none';
}

function createAnswerSlots(answer) {
  const container = document.getElementById('answer-box');
  container.innerHTML = '';
  letterSlots = [];
  for (let i = 0; i < answer.length; i++) {
    const slot = document.createElement('div');
    slot.className = 'letter-box';
    if (answer[i] === ' ') slot.classList.add('space');
    else {
      slot.dataset.index = letterSlots.length;
      slot.addEventListener('click', () => {
        const idx = Number(slot.dataset.index);
        if (slot.textContent) {
          playSfx(sfxUndo);
          const btn = document.createElement('button');
          btn.className = 'letter-btn';
          btn.textContent = slot.textContent;
          btn.onclick = () => {
            const emptyIndex = selectedLetters.findIndex(l => l === '');
            if (emptyIndex === -1) return;
            selectedLetters[emptyIndex] = btn.textContent;
            letterSlots[emptyIndex].textContent = btn.textContent;
            playSfx(sfxClick);
            btn.remove();
          };
          document.getElementById('letter-buttons').appendChild(btn);
          selectedLetters[idx] = '';
          slot.textContent = '';
        }
      });
      letterSlots.push(slot);
    }
    container.appendChild(slot);
  }
}

function createLetterButtons(answer) {
  const shuffled = shuffleArray(answer.replace(/ /g, '').split(''));
  const container = document.getElementById('letter-buttons');
  container.innerHTML = '';
  shuffled.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.textContent = letter;
    btn.onclick = () => {
      const emptyIndex = selectedLetters.findIndex(l => l === '');
      if (emptyIndex === -1) return;
      selectedLetters[emptyIndex] = letter;
      letterSlots[emptyIndex].textContent = letter;
      playSfx(sfxClick);
      btn.remove();
    };
    container.appendChild(btn);
  });
}

function saveAnswer() {
  const userAnswer = selectedLetters.join('');
  const correctAnswer = questions[currentQuestion].jawaban.replace(/ /g, '');
  const result = document.getElementById('result');

  if (userAnswer === correctAnswer) {
    score++;
    result.innerText = '✅ Jawaban Benar: ' + questions[currentQuestion].jawaban;
    result.style.color = 'green';
    playSfx(sfxCorrect);
  } else {
    result.innerText = `❌ Salah! Jawaban: ${questions[currentQuestion].jawaban}`;
    result.style.color = 'red';
    playSfx(sfxWrong);
  }

  document.getElementById('save-btn').style.display = 'none';
  document.getElementById('answer-status').style.display = 'block';
  if (currentQuestion < questions.length - 1)
    document.getElementById('next-btn').style.display = 'inline';
  else
    document.getElementById('score-btn').style.display = 'inline';
}

function nextQuestion() {
  currentQuestion++;
  selectedLetters = [];
  letterSlots = [];
  playSfx(sfxNext);
  loadQuestion();
}

function showScore() {
  playSfx(sfxScore);
  sessionStorage.setItem('score', score);
  sessionStorage.setItem('totalQuestions', questions.length);
  setTimeout(() => {
    window.location.href = 'score.html';
  }, 150);
}


function attachEventListeners() {
  document.querySelectorAll('.start-btn, .button-container button').forEach(btn => {
    btn.addEventListener('click', e => playSfx(sfxStart));
  });

  document.querySelectorAll('.back-link').forEach(link => {
    link.addEventListener('click', e => {
      playSfx(sfxBack);
      setTimeout(() => (window.location.href = link.href), 100);
      e.preventDefault();
    });
  });

  ['save-btn', 'next-btn', 'score-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => playSfx(sfxClick));
  });
}

window.onload = () => {
  initializeSFX();
  setTimeout(() => attachEventListeners(), 200);
  if (document.getElementById('score-display')) {
    const score = Number(sessionStorage.getItem('score')) || 0;
    const total = Number(sessionStorage.getItem('totalQuestions')) || 0;
    const display = document.getElementById('score-display');
    const message = document.getElementById('score-message');
    const scoreFill = document.querySelector('.score-fill');
    const percent = ((score / total) * 100).toFixed(1);
    scoreFill.style.width = `${percent}%`;
    let current = 0;
    const interval = setInterval(() => {
      if (current < score) {
        current++;
        display.textContent = `Skor Anda: ${current} dari ${total} (${((current / total) * 100).toFixed(1)}%)`;
      } else {
        clearInterval(interval);
        display.textContent = `Skor Anda: ${score} dari ${total} (${percent}%)`;
      }
    }, 40);
    if (percent >= 80) message.textContent = '🎉 Hebat! Kamu sangat pintar!';
    else if (percent >= 50) message.textContent = '👍 Bagus! Terus belajar!';
    else message.textContent = '😊 Jangan menyerah, coba lagi!';
  } else initGame();
};
