import $ from 'jquery';
import Renderer from './lib/Renderer';
import Question from './Question';

class QuizDisplay extends Renderer {

  /**
  * This function must return an HTML string
  */

  template() {
    // if quiz is inactive and no questions are asked yet, then
    // we're at the intro state of app

    const currentQ = this.model.getCurrentQuestion();
  
    if (this.model.asked.length === 0) {
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
      let header = `<h1> ${currentQ.text} </h1>`;
       for (let i = 0; i < currentQ.answers.length; i++) {
       options = options.concat(` <input type="radio" id="Choice${i}" name="choice" value="${currentQ.answers[i]}">
        <label for="Choice${i}">${currentQ.answers[i]}</label>`);
       }
       let block = `<form><div>${options}</div><div><button type="submit" class="answerIt">Submit</button></div></form>`;
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

   /*  if(this.model.active && this.model.unasked.length === 1) {
      if (currentQ.getAnswerStatus() === 1){
        return `<h1> ${currentQ.text} </h1>
        <h3>You got it! </br> The correct answer was: </br>${currentQ.correctAnswer}</h3>
        <button class="final">Continue</button>`;
      } if (currentQ.getAnswerStatus() === 0){
        return `<h1> ${currentQ.text} </h1>
        <h3>Sorry, that's incorrect. You answered: </br> ${currentQ.userAnswer}
        </br>The correct answer was: </br>${currentQ.correctAnswer}</h3>
        <button class="final">Continue</button>`;
      } 
    } */

    if( this.model.unasked.length === 0) {
      if (this.model.score > this.model.getHighScore()) {
        return `<h3>Good Job! </br> Your final score was ${this.model.score} out of ${this.model.asked.length}</br>
        That's a new high score!</h3>
        <button class="play-again">Play Again</button>`;
      } return `<h3>Good Job! </br> Your final score was ${this.model.score} out of ${this.model.asked.length}</h3>
      <button class="play-again">Play Again</button>`;
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
     // 'click .final': 'renderFinalScreen'
    };
  }

  /**
  * All event handler functions should call model methods
  */
  handleStart() {
    event.preventDefault();
    this.model.startGame();
  }

  handleNextQuestion() {
    const currentQuiz = this.model;
    console.log(`length unasked ${currentQuiz.unasked.length}`)
    event.preventDefault();
    currentQuiz.nextQuestion();
    console.log('yo');
  }

  handleSubmitAnswer(){
    event.preventDefault();
    // eslint-disable-next-line quotes
    let userA = $("input[name='choice']:checked").val();
    this.model.answerCurrentQuestion(userA);
  }

  handleReplay(){
    event.preventDefault();
    this.model.scoreHistory.push(this.model.score);
    this.model.asked.length = 0;
    this.model.startGame();
  }


  /* renderFinalScreen(){
    if (this.model.score > this.model.getHighScore()) {
      return `<h3>Good Job! </br> Your final score was ${this.model.score} out of ${this.model.asked.length}</br>
      That's a new high score!</h3>
      <button id="play-again">Play Again</button>`;
    } return `<h3>Good Job! </br> Your final score was ${this.model.score} out of ${this.model.asked.length}</h3>
    <button class="play-again">Play Again</button>`;
  } */
  
}
export default QuizDisplay;