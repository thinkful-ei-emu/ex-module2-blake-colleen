import Renderer from './lib/Renderer';
import Question from './Question';

class QuizDisplay extends Renderer {

  /**
  * This function must return an HTML string
  */
  template() {
    // if quiz is inactive and no questions are asked yet, then
    // we're at the intro state of app\
  
  //   const answerHTMLgenerator = (answer => answerHTMLString.concat(`
  //   <form>
  //   <p>Please select your preferred contact method:</p>
  //   <div>
  //     <input type="radio" id="contactChoice1"
  //      name="contact" value="email">
  //     <label for="contactChoice1">Email</label>
  
  //     <input type="radio" id="contactChoice2"
  //      name="contact" value="phone">
  //     <label for="contactChoice2">Phone</label>
  
  //     <input type="radio" id="contactChoice3"
  //      name="contact" value="mail">
  //     <label for="contactChoice3">Mail</label>
  //   </div>
  //   <div>
  //     <button type="submit">Submit</button>
  //   </div>
  // </form>
  
  // `) );

    if (!this.model.active && this.model.askedQuestions.length === 0) {
      return  `
      <div>
        <h1>Welcome to our trivia quiz</h1>

        <h3>test your smarts and see how high you can score!</h3>

        <button> start your game </button>
      </div> `;
    }
    if (this.model.active &&  !this.model.getCurrentQuestion.userAnswer){
      return `
        <h1> ${this.model.getCurrentQuestion.text} </h1>
        <form>
        <div>
          <input type="radio" id="Choice1" name="choice" value="${Question.answers[0]}">
          <label for="Choice1">${this.model.getCurrentQuestion.answers[0]}</label>

          <input type="radio" id="Choice2" name="choice" value="${this.model.getCurrentQuestion.answers[1]}">
          <label for="Choice2">${this.model.getCurrentQuestion.answers[1]}</label>

          <input type="radio" id="Choice3" name="choice" value="${this.model.getCurrentQuestion.answers[2]}">
          <label for="Choice3">${this.model.getCurrentQuestion.answers[2]}</label>

          <input type="radio" id="Choice4" name="choice" value="${this.model.getCurrentQuestion.answers[3]}">
          <label for="Choice4">${this.model.getCurrentQuestion.answers[3]}</label>

        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        </form>
      
      ` ;
    }
  }

  /**
  * This function must return an object
  */
  getEvents() {
    return {
      'click .start': 'handleStart'
    };
  }

  /**
  * All event handler functions should call model methods
  */ 
  handleStart() {
    this.model.startQuiz();
  }
}
export default QuizDisplay;