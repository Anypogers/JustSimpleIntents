// This file is responsible for managing the input and triggering the correct intent handler

import { NlpManager } from 'node-nlp';
import { loadAllIntents } from './intentRouter.js';
import { getConfig } from './config.js';

const manager = new NlpManager({ languages: getConfig('languages') });

let loadedIntents = [];

export async function trainIntents() {
  loadedIntents = loadAllIntents();

  for (const intent of loadedIntents) {
    manager.addDocument(intent.language, intent.utterance, intent.intent);
  }

  await manager.train();

  if (getConfig('debugMode', 'dynamic')) {
    console.log('Intents trained successfully');
  }
}

export async function processInput(input) {
  const response = await manager.process(getConfig('languages')[0], input);

  if (getConfig('debugMode', 'dynamic')) {
    console.log('NLP Result:', response);
  }

  const intentName = response.intent;
  const score = response.score;
  const threshold = getConfig('threshold');

  if (score < threshold) {
    if (getConfig('debugMode', 'dynamic')) {
      console.log("No intent matched with sufficient confidence.");
    }
    return { success: false, message: "No matching intent found." };
  }

  const matched = loadedIntents.find(i => i.intent === intentName);
  if (!matched) {
    return { success: false, message: `Intent '${intentName}' not found.` };
  }

  const handlerFn = await matched.handler();

  // === ARGUMENT EXTRACTION ===
  const args = {};

  const training = matched.utterance;
  const inputWords = input.trim().split(/\s+/);
  const trainingWords = training.trim().split(/\s+/);

  for (let i = 0; i < trainingWords.length; i++) {
    const word = trainingWords[i];
    if (word.startsWith('%') && word.endsWith('%')) {
      const argName = word.slice(1, -1);
      args[argName] = inputWords.slice(i).join(' ');
      break; // Assume one arg at end for now
    }
  }

  // === CHECK REQUIRED ARGS ===
  if (matched.requiresArgs && Object.values(args).every(val => !val)) {
    return { success: false, message: matched.noArgsMessage };
  }

  try {
    await handlerFn({ args });
    return { success: true };
  } catch (err) {
    console.error(`Error running intent '${intentName}':`, err);
    return { success: false, message: `Error running intent '${intentName}'` };
  }
}
function loadTrainingData(intentName) {
  const intentFolder = getConfig('intentsPath') + '/' + intentName;
  const trainingPath = intentFolder + '/training.json';
  console.log(trainingPath)

  try {
    return JSON.parse(fs.readFileSync(trainingPath, 'utf-8'));
  } catch (e) {
    console.error(`Failed to load training data for intent '${intentName}'`);
    return {};
  }
}