import pkg from 'node-nlp';
const { NlpManager } = pkg;

const manager = new NlpManager({ languages: ['en'], forceNER: true });

// --- Define intents and example phrases
manager.addDocument('en', 'what time is it', 'getTime');
manager.addDocument('en', 'tell me the time', 'getTime');
manager.addDocument('en', 'current time', 'getTime');

manager.addDocument('en', 'what is the weather', 'getWeather');
manager.addDocument('en', 'is it raining', 'getWeather');
manager.addDocument('en', 'weather update', 'getWeather');

// --- Define responses (optional)
manager.addAnswer('en', 'getTime', 'The current time is: [TIME]');
manager.addAnswer('en', 'getWeather', 'The weather is probably nice. I hope.');

// --- Train the model and test input
const threshold = 0.90;

async function run(input) {
  console.log('Training...');
  await manager.train();
  manager.save();

  const result = await manager.process('en', input);

  console.log(`Intent: ${result.intent}`);
  console.log(`Score: ${result.score}`);

  if (result.score >= threshold && result.intent !== 'None') {
    switch (result.intent) {
      case 'getTime': {
        const now = new Date().toLocaleTimeString();
        console.log(`The current time is: ${now}`);
        break;
      }
      case 'getWeather': {
        console.log('The weather is probably nice. I hope.');
        break;
      }
    }
  } else {
    console.log("Sorry, I didn't understand that.");
  }
};

let input = "Time now?"
run(input);
