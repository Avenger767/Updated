
document.addEventListener('DOMContentLoaded', function () {
  const motionForm = document.getElementById('motion-quiz');
  const mpicForm = document.getElementById('mpic-quiz');

  if (motionForm) {
    motionForm.addEventListener('submit', function (e) {
      e.preventDefault();
      exportResults('Motion Quiz', motionForm);
    });
  }

  if (mpicForm) {
    mpicForm.addEventListener('submit', function (e) {
      e.preventDefault();
      exportResults('MPIC Quiz', mpicForm);
    });
  }

  function exportResults(quizTitle, form) {
    const username = localStorage.getItem('quizUser') || 'Anonymous';
    let csvContent = `Quiz Title,${quizTitle}\nUser,${username}\n\n`;
    const formData = new FormData(form);
    const questions = new Set();

    for (const [name, value] of formData.entries()) {
      if (!questions.has(name)) {
        questions.add(name);
        csvContent += `${name},${value}\n`;
      }
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `${quizTitle.replace(/\s+/g, '_')}_results.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Your answers have been downloaded.');
  }
});

function finishQuiz() {
  exportResults("Motion Quiz", document.getElementById("motion-quiz"));
  setTimeout(() => {
    window.location.href = 'thankyou.html';
  }, 1000);
}

function calculateScore(form) {
  const correctAnswers = {
    'm1': 'c', 'm2': 'c', 'm4': 'true', 'm5': 'c', 'm6': 'b',
    'm7': 'b', 'm8': 'true', 'm9': 'b', 'm10': 'c', 'm11': 'b',
    'm12': 'b', 'm13': 'true', 'm14': 'b', 'm15': 'b', 'm16': 'b'
  };
  let score = 0;
  let total = 0;
  const formData = new FormData(form);
  for (const [name, value] of formData.entries()) {
    if (name in correctAnswers) {
      total++;
      if (value === correctAnswers[name]) {
        score++;
      }
    }
  }
  return { score, total };
}

function finishQuiz() {
  const form = document.getElementById("motion-quiz");
  const result = calculateScore(form);
  alert(`You scored ${result.score} out of ${result.total}`);
  exportResults("Motion Quiz", form);
  setTimeout(() => {
    window.location.href = 'thankyou.html';
  }, 1500);
}

function finishQuiz() {
  const form = document.getElementById("motion-quiz");
  const correctAnswers = {
    'm1': 'c', 'm2': 'c', 'm4': 'true', 'm5': 'c', 'm6': 'b',
    'm7': 'b', 'm8': 'true', 'm9': 'b', 'm10': 'c', 'm11': 'b',
    'm12': 'b', 'm13': 'true', 'm14': 'b', 'm15': 'b', 'm16': 'b'
  };
  const result = calculateScore(form);
  localStorage.setItem('lastScore', result.score);
  localStorage.setItem('lastTotal', result.total);
  showFeedback(form, correctAnswers);
  exportResults("Motion Quiz", form);
  setTimeout(() => {
    window.location.href = 'results.html';
  }, 3000);
}
