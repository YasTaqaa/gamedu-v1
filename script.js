let currentQuestion = 0;
let score = 0;
let questions = [];
let selectedLetters = [];
let letterSlots = [];

const soalKategori = {
  fruits: [
    { gambar: 'apple.jpg', jawaban: 'APPLE', nama: 'Apel' },
    { gambar: 'banana.jpg', jawaban: 'BANANA', nama: 'Pisang' },
    { gambar: 'grape.jpg', jawaban: 'GRAPE', nama: 'Anggur' },
    { gambar: 'melon.jpg', jawaban: 'MELON', nama: 'Melon' },
    { gambar: 'orange.jpg', jawaban: 'ORANGE', nama: 'Jeruk' }
  ],
  animals: [
    { gambar: 'cat.jpg', jawaban: 'CAT', nama: 'Kucing' },
    { gambar: 'dog.jpg', jawaban: 'DOG', nama: 'Anjing' },
    { gambar: 'fish.jpg', jawaban: 'FISH', nama: 'Ikan' },
    { gambar: 'bird.jpg', jawaban: 'BIRD', nama: 'Burung' },
    { gambar: 'lion.jpg', jawaban: 'LION', nama: 'Singa' }
  ],
  vegetables: [
    { gambar: 'carrot.jpg', jawaban: 'CARROT', nama: 'Wortel' },
    { gambar: 'corn.jpg', jawaban: 'CORN', nama: 'Jagung' },
    { gambar: 'cabbage.jpg', jawaban: 'CABBAGE', nama: 'Kubis' },
    { gambar: 'onion.jpg', jawaban: 'ONION', nama: 'Bawang' },
    { gambar: 'tomato.jpg', jawaban: 'TOMATO', nama: 'Tomat' }
  ],
  greetings: [
    { gambar: 'good_morning.png', jawaban: 'GOOD MORNING', nama: 'Selamat pagi' },
    { gambar: 'hello.png', jawaban: 'HELLO', nama: 'Halo' },
    { gambar: 'goodbye.png', jawaban: 'GOODBYE', nama: 'Selamat tinggal' },
    { gambar: 'thank_you.png', jawaban: 'THANK YOU', nama: 'Terima kasih' },
    { gambar: 'how_are_you.png', jawaban: 'HOW ARE YOU', nama: 'Apa kabar' }
  ],
  days: [
    { gambar: 'monday.jpg', jawaban: 'MONDAY', nama: 'Senin' },
    { gambar: 'tuesday.jpg', jawaban: 'TUESDAY', nama: 'Selasa' },
    { gambar: 'wednesday.jpg', jawaban: 'WEDNESDAY', nama: 'Rabu' },
    { gambar: 'thursday.jpg', jawaban: 'THURSDAY', nama: 'Kamis' },
    { gambar: 'friday.jpg', jawaban: 'FRIDAY', nama: 'Jumat' },
    { gambar: 'saturday.jpg', jawaban: 'SATURDAY', nama: 'Sabtu' },
    { gambar: 'sunday.jpg', jawaban: 'SUNDAY', nama: 'Minggu' },
  ]
};

function getGameTypeFromTitle() {
  const kat = sessionStorage.getItem('kategori');
  return kat || 'fruits';
}

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function initGame() {
  const gameType = getGameTypeFromTitle();
  questions = shuffleArray(soalKategori[gameType] || []);
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-container').innerHTML = `
    <img src="images/${q.gambar}" alt="${q.nama}" />
    <p><strong>${q.nama}</strong></p>
  `;

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
    if (answer[i] === ' ') {
      slot.classList.add('space');
    } else {
      slot.dataset.index = letterSlots.length;
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
    btn.addEventListener('click', function () {
      const emptyIndex = selectedLetters.findIndex(l => l === '');
      if (emptyIndex === -1) return;
      selectedLetters[emptyIndex] = letter;
      letterSlots[emptyIndex].textContent = letter;
      btn.remove(); // huruf dan kotaknya menghilang
    });
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
  } else {
    result.innerText = `❌ Salah! Jawaban: ${questions[currentQuestion].jawaban}`;
    result.style.color = 'red';
  }

  document.getElementById('save-btn').style.display = 'none';
  document.getElementById('answer-status').style.display = 'block';

  if (currentQuestion < questions.length - 1) {
    document.getElementById('next-btn').style.display = 'inline';
  } else {
    document.getElementById('score-btn').style.display = 'inline';
  }
}

function nextQuestion() {
  currentQuestion++;
  selectedLetters = [];
  letterSlots = [];
  loadQuestion();
}

function showScore() {
  sessionStorage.setItem('score', score);
  sessionStorage.setItem('totalQuestions', questions.length);
  window.location.href = 'score.html';
}

window.onload = initGame;
