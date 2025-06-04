// This file is the manager for the NLP for the intents
// It will load the intents from their respective folders, and train the model with their associated data

// For routing the intents, and fetching them and their data, see 'intentRouter.js'.
// For general configuration, see 'config.js'.

import { NlpManager } from 'node-nlp';
import * as intentRouter from './intentRouter.js';
import * as config from './config.js';

// The NLP manager it self
const manager = new NlpManager({
  languages: config.getStaticConfig('languages'),
  forceNER: config.getStaticConfig('forceNER')
});

export function trainNLPModel() {
  
}

await manager.train();
manager.save();