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
    return;
  }

  if (getConfig('debugMode', 'dynamic')) {
    console.log(`Matched intent: ${intentName} (score: ${score})`);
  }

  const matched = loadedIntents.find(i => i.intent === intentName);
  if (!matched) {
    if (getConfig('debugMode', 'dynamic')) {
      console.error(`Intent handler for '${intentName}' not found.`);
    }
    return;
  }
  
  const handlerFn = await matched.handler();
  
  try {
    await handlerFn( input );
  } catch (err) {
    console.error(`Error running intent '${intentName}':`, err);
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