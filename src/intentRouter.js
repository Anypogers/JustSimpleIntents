// This file is responsible for routing intents to the appropriate handlers
// It also handles the loading of the intents and their associated data

// For processing the intents, see 'intentManager.js'.
// For general configuration, see 'config.js'.

import fs from 'fs';
import path from 'path';
import { getConfig } from './config.js';

const threshold = getConfig('threshold');
const languages = getConfig ('languages');
const forceNER = getConfig('forceNER');
const intentsPath = getConfig('intentsPath');
const defaultIntent = getConfig('defaultIntent');

// Get all the valid intent folders in the intentsPath.
// (where all the intents are stored)
// What is a valid folder?
//
// Required Files inside the folder:
// - index.js (the main file for the intent)
// - data.json (the training data for the intent)
//
// Optional Files inside the folder:
// - config.json (the configuration for the intent - this is NOT used for the NLP model, but for the intent itself, hence why it's optional)
// - runtime.js (file that will constantly run. This is used for intents that need to run in the background.)
//   * NOTE: This can be very resource intensive, so it's recommended to have it not do complex tasks, and only run from time to time, not every possible second.
//   * This file is completely unrelated to 'index.js'. (However, they can interact with each other if you set it up that way, but they can run independently)
// 
// 
export function getValidIntents() {
  const validIntents = [];

  // Get all entries in the folder
  const entries = fs.readdirSync(intentsPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue; // Skip files that are not directories
    }
    
    const folderPath = path.join(intentsPath, entry.name);
    const files = fs.readdirSync(folderPath);

    const hasIndex = files.includes('index.js');
    const hasData = files.includes('data.json');
    
    if (!hasIndex || !hasData) {
      continue; // Skip folders that don't have the required files
    }

    validIntents.push({
      name : entry.name,
      path : folderPath,
      hasRuntime : files.includes('runtime.js'),
    });
  }
}

// Get the intent data for a specific intent
// This is the data that is used to train the NLP model
// It is stored in the data.json file inside the intent folder
// The data is in the following format:
//  {
//    "intentName": 'INTENT_NAME',
//    LANGUAGE_CODE: [
//      TRAINING_DATA,
//    ]
//  }
export function getIntentData(intentName) {
  const intentPath = path.join(intentsPath, intentName, 'data.json');
  const intentData = fs.readFileSync(intentPath, 'utf-8');
  return JSON.parse(intentData);
}