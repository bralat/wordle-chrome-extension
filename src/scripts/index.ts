import AppElement from "./elements/AppElement";
import StartButtonElement from "./elements/StartButtonElement";
import WordSelectorElement from "./elements/WordSelectorElement";
import Core from "./Core";

// register custom elements
customElements.define('start-button', StartButtonElement);
customElements.define('word-selector', WordSelectorElement);
customElements.define('wordle-predictor', AppElement) 

// initialise app
Core.init();