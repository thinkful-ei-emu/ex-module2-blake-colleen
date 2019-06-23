import $ from 'jquery';
import Renderer from './lib/Renderer';

class QuizDisplay extends Renderer {

  /**
  * This function must return an HTML string
  */

  template() {
    // if quiz is inactive and no questions are asked yet, then
    // we're at the intro state of app

    const currentQ = this.model.getCurrentQuestion();
  
    if (!this.model.active && this.model.asked.length === 0) {
      return  `
      <div>
        <h1>Welcome to our trivia quiz</h1>

        <h3>Test your smarts and see how high you can score!</h3>

        <button type= "submit" class="start">Start your game </button>
      </div> `;
    }
    if (this.model.active  && currentQ && currentQ.getAnswerStatus() === -1){
      let html = '';
      let options = '';
      let header = `<h1 class="question"> ${currentQ.text} </h1>
    <form><fieldset>`;
      for (let i = 0; i < currentQ.answers.length; i++) {
        options = options.concat(` <input type="radio" id="Choice${i}" name="choice" value="${currentQ.answers[i]}">
        <label for="Choice${i}">${currentQ.answers[i]}</label>`);
      }
      let block = `<div class="answers">${options}</div></fieldset><div><button type="submit" class="answerIt">Submit</button></div></form>`;
      html = header.concat(block);
      return html;
       
    }
    
    if (this.model.active && currentQ && currentQ.userAnswer) {
      if (currentQ.getAnswerStatus() === 1){
        return `<h1> ${currentQ.text} </h1>
        <h3>You got it! </br> The correct answer was: </br>${currentQ.correctAnswer}</h3>
        <button class="continue">Continue</button>`;
      } if (currentQ.getAnswerStatus() === 0){
        return `<h1> ${currentQ.text} </h1>
        <h3>Sorry, that's incorrect. You answered: </br> ${currentQ.userAnswer}
        </br>The correct answer was: </br>${currentQ.correctAnswer}</h3>
        <button class="continue">Continue</button>`;
      }
    }

    if(!this.model.active && this.model.unasked.length === 0) {
      if (this.model.getHighScore()) {
        return `<h3>Good Job! </br> Your final score was ${this.model.score} out of ${this.model.getTotalQuestions()}</br>
        That's a new high score!</h3>
        <button class="play-again">Play Again</button>`;
      }else {return `<h3>Good Job! </br> Your final score was ${this.model.score} out of ${this.model.getTotalQuestions()}</h3>
      <button class="play-again">Play Again</button>`;}
    }

  }

  /**
  * This function must return an object
  */
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .answerIt': 'handleSubmitAnswer',
      'click .continue': 'handleNextQuestion',
      'click .play-again': 'handleReplay',
      
    };
  }

  handleStart() {
    event.preventDefault();
    this.model.startGame();
  }

  handleNextQuestion() {
    event.preventDefault();
    const currentQuiz = this.model;
    currentQuiz.nextQuestion();
  }

  handleSubmitAnswer(){
    event.preventDefault();
    let userA = $('input[name=\'choice\']:checked').val();
    this.model.answerCurrentQuestion(userA);
  }

  handleReplay(){
    event.preventDefault();
    this.model.startGame();
  }

  
}
export default QuizDisplay;