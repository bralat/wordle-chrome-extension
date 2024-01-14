import { defineConfig } from "cypress";
const path = require('path');

export default defineConfig({
  projectRoot: __dirname,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        // supply the absolute path to an unpacked extension's folder
        // NOTE: extensions cannot be loaded in headless Chrome
        const extensionPath = path.join(config.projectRoot, 'dev');
        launchOptions.extensions.push(extensionPath);

        return launchOptions
      });
    },
  },
});
