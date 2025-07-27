// intentRouter.js
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { getConfig } from './config.js';

const intentsPath = getConfig('intentsPath');

export function loadAllIntents() {
  const folders = fs.readdirSync(intentsPath).filter(folder => {
    const fullPath = path.join(intentsPath, folder);
    return fs.statSync(fullPath).isDirectory() &&
           fs.existsSync(path.join(fullPath, 'index.js')) &&
           fs.existsSync(path.join(fullPath, 'training.json'));
  });

  const intents = [];

  for (const folder of folders) {
    const folderPath = path.join(intentsPath, folder);
    const training = JSON.parse(fs.readFileSync(path.join(folderPath, 'training.json'), 'utf-8'));
    const handlerPath = path.join(folderPath, 'index.js');
    const handlerUrl = pathToFileURL(handlerPath);

    const handler = async () => (await import(handlerUrl.href)).default;
    const intentName = training.intentName;

    // Pull optional metadata
    const requiresArgs = training.requiresArgs || false;
    const noArgsMessage = training.noArgsMessage || "This intent requires additional input.";
    const argsSchema = training.args || {};

    for (const lang in training) {
      if (["intentName", "requiresArgs", "noArgsMessage", "args"].includes(lang)) continue;

      for (const utterance of training[lang]) {
        intents.push({
          intent: intentName,
          utterance,
          language: lang,
          handler,
          requiresArgs,
          noArgsMessage,
          args: argsSchema
        });
      }
    }
  }

  return intents;
}
