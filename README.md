# WORDLE PREDICTOR
This is a [chrome extension](https://chromewebstore.google.com/detail/wordle-guesser/jahpgdmllipfgfpgjjejmhjioeofebbe) for the popular [wordle](https://www.nytimes.com/games/wordle/index.html) game that predicts the most likely word for the next empty row.

## Description
This is a fun little project that I created out of frustration in moments when I just needed a little hint to continue, or for moments when I just gave up and wanted to know the answer.

It's designed to simply display a light bulb beside the next empty row until you're ready to click for some assistance, then it displays the top 5 predictions based on your previous answers and the popularity of each matching word found in a dictionary of 5-letter words. This dictionary is extracted from [this dataset](https://www.kaggle.com/datasets/rtatman/english-word-frequency).

## Installation
### Published Build
1. Visit the [chrome webstore link](https://chromewebstore.google.com/detail/wordle-guesser/jahpgdmllipfgfpgjjejmhjioeofebbe)
2. Click `Get` and allow installation
3. Visit the [wordle](https://www.nytimes.com/games/wordle/index.html) site and you should see the light bulb next to the first empty row shortly.

### Local Build
To run locally, navigate to the root of the project and:
1. Install packages
`npm install` or `yarn install`
2. In some cases, you may need to install gulp globally for it to work
`npm install -g gulp`
3. Open task runner and watch files for changes
`gulp`
4. Open Google Chrome, visit this url `chrome://extensions/` and enable developer mode
5. Click `Load unpacked` and navigate to `<project root>/dev`
