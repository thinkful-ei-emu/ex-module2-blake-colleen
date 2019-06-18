import Renderer from './lib/Renderer';


class QuizStatus extends Renderer {
  template() {
    let html =
    `<div class="score"><h2>${this.model.score}</h2></div><div class="high-score><h2>${this.model.getHighScore()}</h2>
    <div class="question-count">${this.model.asked.length} out of ${this.model.getTotalQuestions()}</div>`;
    return html;
  }

}

export default QuizStatus;