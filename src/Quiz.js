import Question from './Question';
import TriviaApi from './TriviaApi';
import Model from './lib/Model';

class Quiz extends Model{

  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();
    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;

    // TASK: Add more props here per the exercise
    this.score = 0;
    this.scoreHistory = [];

  }

  // Example method:
  startGame() {
    this.unasked = [];
    this.asked = [];
    this.active = false;
    this.score = 0;
    const triviaApi = new TriviaApi();
    triviaApi.fetchQuestions(Quiz.DEFAULT_QUIZ_LENGTH)
      .then(data => {
        data.results.forEach(questionData => {
          console.log(questionData);
          this.unasked.push(new Question(questionData));
          this.nextQuestion();
          this.active = true;
          this.update();
          console.log(this.active);
        });
      })
      .catch(err => console.log(err.message));
  }

  getTotalQuestions() {
    let total = this.unasked.length + this.asked.length;
    return total;
  }

  getCurrentQuestion() {
    return this.asked[0];
  }

  nextQuestion() {
    const currentQ = this.getCurrentQuestion();
    if (currentQ && currentQ.getAnswerStatus() === -1) {
      this.update();
      return false;
    }

    this.asked.unshift(this.unasked.pop());
    this.update();
    return true;
  }

  increaseScore() {
    this.score++;
    this.update();    
  }

  getHighScore(){
    let highScore = 0;
    for (let i=0; i < this.scoreHistory.length; i++){
      if (this.score > this.scoreHistory[i]){
        highScore = score;
      } 
    }
    return highScore;
  }

  answerCurrentQuestion(answerText) {
    const currentQ = this.getCurrentQuestion();
    // Cannot find current question, so fail to answer
    if (!currentQ) return false;
    // Current question has already been answered, so refuse to submit new answer    
    if (currentQ.getAnswerStatus() !== -1) return false;

    // Otherwise, submit the answer
    currentQ.submitAnswer(answerText);
    this.update();

    // If correct, increase score
    if (currentQ.getAnswerStatus() === 1) {
      this.increaseScore();
      this.update();
    }

    return true;
  }
}

export default Quiz;
