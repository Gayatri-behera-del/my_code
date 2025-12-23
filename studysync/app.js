const readings = [
score = 0;
quizzes.forEach((q, idx) => {
const div = document.createElement('div');
div.className = "quiz-question";
div.innerHTML = `<p>${idx+1}. ${q.question}</p>`;
q.options.forEach((opt, i) => {
const btn = document.createElement('button');
btn.textContent = opt;
btn.addEventListener('click', () => {
if(i === q.answer) score++;
document.getElementById('score-display').textContent = `Score: ${score} / ${quizzes.length}`;
});
div.appendChild(btn);
});
quizArea.appendChild(div);
});

];


// Progress Chart
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
type: 'bar',
data: {
labels: readings.map(r => r.title),
datasets: [{ label: 'Completion', data: readings.map(r => r.completed ? 100 : 0), backgroundColor: '#4a90e2' }]
},
options: { scales: { y: { beginAtZero: true, max: 100 } }, responsive: true, plugins: { legend: { display: true, position: 'bottom' } } }
});


// Vocabulary Flashcards
const vocabulary = [
{ word: "Obscure", meaning: "Not clear or hard to understand" },
{ word: "Meticulous", meaning: "Showing great attention to detail" }
];
const flashcardsDiv = document.getElementById('flashcards');
vocabulary.forEach(v => {
const card = document.createElement('div');
card.className = "flashcard";
card.innerHTML = `<p><strong>${v.word}</strong></p><p class="meaning">${v.meaning}</p>`;
card.addEventListener('click', () => card.classList.toggle('show'));
flashcardsDiv.appendChild(card);
});


// Recommendations
const recommendations = ["Pride and Prejudice - Chapter 1", "Hamlet - Act 1 Scene 1"];
const recList = document.getElementById('rec-list');
recommendations.forEach(rec => {
const li = document.createElement('li');
li.textContent = rec;
recList.appendChild(li);
});