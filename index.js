import readline from 'readline';
import { processInput, trainIntents } from './src/intentManager.js';
import { getConfig, setDynamicConfig } from './src/config.js';

setDynamicConfig('debugMode', true);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

trainIntents();

rl.on('line', async (line) => {
  // Simulate input with optional args
  const split = line.trim().split(' ');
  const input = split[0];
  const args = split.slice(1);

  try {
    const result = await processInput(line, args);
    if (!result.success) {
      console.log(`${result.message}`);
    }
  } catch (err) {
    console.error('❌ Unexpected error while processing intent:', err);
  }
});
