import Board from "./game/Board";
import App from "./elements/App";
import Keyboard from "./game/Keyboard";
import StartButtonElement from "./elements/StartButtonElement";
import WordSelectorElement from "./elements/WordSelectorElement";

// register custom elements
customElements.define('start-button', StartButtonElement);
customElements.define('word-selector', WordSelectorElement);
customElements.define('wordle-predictor', App) 

App.getDictionary()
App.ready().then(() => {
  document.body.appendChild(new App())

  // create global css
  const styleElem = document.createElement('style')
  styleElem.innerHTML = `
    wordle-predictor {
      transition: all 0.3s ease-in-out;
    }
  `
  document.head.appendChild(styleElem)
})