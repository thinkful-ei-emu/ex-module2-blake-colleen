import Renderer from './lib/Renderer';


class QuizStatus extends Renderer {
  template() {
    let html = `<div class="score"><h2>Score: 
    ${this.model.score}</h2><h2>High Score: ${this.model.highScore}</h2>`;
    
    if (this.model.active){
      html += `<div class="question-count">Progress: ${this.model.asked.length} 
      out of ${this.model.getTotalQuestions()}</div>`;}
    else {
      html += '<div class="question-count">Progress: Inactive </div>';
    }
    return html;
  }

}

export default QuizStatus;