import Renderer from './lib/Renderer';
import Question from './Question';

class QuizDisplay extends Renderer {

  /**
  * This function must return an HTML string
  */

  template() {
    // if quiz is inactive and no questions are asked yet, then
    // we're at the intro state of app
  
    if (this.model.asked.length === 0) {
      console.log(this.model.active);
      return  `
      <div>
        <h1>Welcome to our trivia quiz</h1>

        <h3>Test your smarts and see how high you can score!</h3>

        <button type= "submit" class="start">Start your game </button>
      </div> `;
    }
    if (this.model.active  && ( this.model.getCurrentQuestion() && this.model.getCurrentQuestion().getAnswerStatus())){
      return `
        <h1> ${this.model.getCurrentQuestion().text} </h1>
        <form>
        <div>
          <input type="radio" id="Choice1" name="choice" value="${Question.answers[0]}">
          <label for="Choice1">${this.model.getCurrentQuestion().answers[0]}</label>

          <input type="radio" id="Choice2" name="choice" value="${this.model.getCurrentQuestion().answers[1]}">
          <label for="Choice2">${this.model.getCurrentQuestion().answers[1]}</label>

          <input type="radio" id="Choice3" name="choice" value="${this.model.getCurrentQuestion().answers[2]}">
          <label for="Choice3">${this.model.getCurrentQuestion().answers[2]}</label>

          <input type="radio" id="Choice4" name="choice" value="${this.model.getCurrentQuestion().answers[3]}">
          <label for="Choice4">${this.model.getCurrentQuestion().answers[3]}</label>

        </div>
        <div>
          <button type="submit" class="answerIt">Submit</button>
        </div>
        </form>
      
      ` ;
    }
    if (this.model.active && this.model.getCurrentQuestion().userAnswer) {
      if (this.model.getAnswerStatus() === 1){
        return `<h1> ${this.model.getCurrentQuestion().text} </h1>
        <h3>You got it! </br> The correct answer was: </br>${this.model.correctAnswer}</h3>
        <button class="continue">Continue</button>`;
      } if (this.model.getAnswerStatus() === 0){
        return `<h1> ${this.model.getCurrentQuestion().text} </h1>
        <h3>Sorry, that's incorrect. You answered: </br> ${this.model.userAnswer}
        </br>The correct answer was: </br>${this.model.correctAnswer}</h3>
        <button class="continue">Continue</button>`;
      }
    }

    if(!this.model.active && this.model.unasked.length === 0) {
      if (this.model.score > this.model.getHighScore()) {
        return `<h3>Good Job! </br> Your final score was ${this.model.score} out of ${this.model.asked.length}</br>
        That's a new high score!</h3>
        <button id="play-again">Play Again</button>`;
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
      'click .play-again': 'handleReplay'
    };
  }

  /**
  * All event handler functions should call model methods
  */
  handleStart() {
    this.model.startGame();
  }

  handleNextQuestion() {
    event.preventDefault();
    this.model.nextQuestion();
  }

  handleSubmitAnswer(){
    event.preventDefault();
    this.model.answerCurrentQuestion();
  }

  handleReplay(){
    event.preventDefault();
    this.model.scoreHistory.push(this.model.score);
    this.model.startGame();
  }
}
export default QuizDisplay;