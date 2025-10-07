import readline from 'readline';
import { processInput, trainIntents } from './src/intentManager.js';
import { getConfig, setDynamicConfig } from './src/config.js';
import startServer from './src/server.js';

setDynamicConfig('debugMode', true);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

trainIntents();

rl.on('line', async (line) => {
  try {
    const result = await processInput(line);
  } catch (err) {
    console.error('❌ Unexpected error while processing intent:', err);
  }
});

startServer();