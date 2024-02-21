import App from "./elements/AppElement";
import StartButtonElement from "./elements/StartButtonElement";
import WordSelectorElement from "./elements/WordSelectorElement";
import Core from "./Core";

// register custom elements
customElements.define('start-button', StartButtonElement);
customElements.define('word-selector', WordSelectorElement);
customElements.define('wordle-predictor', App) 

// initialise app
Core.init();