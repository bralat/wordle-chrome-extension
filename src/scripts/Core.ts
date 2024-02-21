import Predictor from "./predictor/Predictor";
import App from "./elements/App";

export default class Core {
  public static init() {
    Core.getDictionary()
    Core.ready().then(Core.setup)
  }

  static setup() {
    const appElement = new App();
    document.body.appendChild(appElement)

    // create global css
    const styleElem = document.createElement('style')
    styleElem.innerHTML = `
      wordle-predictor {
        transition: all 0.3s ease-in-out;
      }
    `
    document.head.appendChild(styleElem);

    window.addEventListener("resize", appElement.attachToEmptyRow.bind(appElement));
  }

  static ready(): Promise<{}> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.isLoaded && Predictor.ready) {
          clearInterval(interval)
          setTimeout(() => {
            resolve(true);
          }, 2000)
        }
      }, 300);
    })
  }

  static get isLoaded() {
    return document.querySelectorAll('div.Tile-module_tile__UWEHN').length > 0;
  }

  static async getDictionary() {
    // check local storage
    const words = localStorage.getItem('words')
    if (!words) {
      const response = await fetch(chrome.runtime.getURL('assets/words.json'));
      const json = await response.json();
      localStorage.setItem('words', JSON.stringify(json))
    }
  }
}