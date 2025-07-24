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
  <img src="${q.gambar}" alt="${q.nama}" />
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
