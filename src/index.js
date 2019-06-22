import $ from 'jquery';
import Quiz from './Quiz';
import QuizDisplay from './QuizDisplay.js';
import QuizStatus from './QuizStatus.js';
import './index.css';

function main() {
  const q = new Quiz();
  const quizDisplay = new QuizDisplay(q, '.display');
  const quizStatus = new QuizStatus(q, '.status');
  window.q = q;  // adding `q` to `window`, so you can examine it in console
}

$(main);

