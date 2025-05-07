// This file is responsible for storing the general configuration for the NLP manager

// For routing the intents, and fetching them and their data, see 'intentRouter.js'.
// For processing the intents, see 'intentManager.js'.

//=======================/
// STATIC CONFIGURATION /
//=======================/

// Configurations that are static and cannot be changed at runtime,
// but can be changed before startup

const staticConfig = {
  // Minimum confidence threshold for intent recognition
  // default = 0.90
  threshold: 0.90,

  // The languages to be used for the NLP manager
  // default = ['en']
  languages: ['en'],

  // Force NER (Named Entity Recognition) to be used even if there are no entities in the input
  // default = true
  forceNER: true,

  // The path to the intents folder
  // default = './intents/'
  intentsPath: './intents/',

  // Default intent if no other intent is recognized
  // (make it null to do nothing if no intent is recognized)
  // default = null
  defaultIntent: null,
}

// Setters (Static Config)

export function setStaticConfig(configName, configValue) {
  // Check if the config name is valid
  if (!staticConfig.hasOwnProperty(configName)) {
    throw new Error(`Invalid config name: ${configName}`);
  }

  // Check if the config value is valid
  if ((typeof configValue) !== (typeof staticConfig[configName]) && configValue !== null) {
    throw new Error(`Invalid config value: ${configValue} for config name: ${configName}`);
  }
  
  staticConfig[configName] = configValue;
}

//=======================/
// DYNAMIC CONFIGURATION /
//=======================/

// Configurations that can be changed at runtime

const dynamicConfig = {
  // Logs important information to the console
  // (such as accuracy, the intent recognized, etc.)
  // (useful for debugging and testing)
  // default = false
  debugMode: false,

  // The keyWord to be used for the wake word detection
  // (if the wake word detection is enabled)
  // (make it null to disable the wake word detection, and only activate when called via code)
  // default = null
  keyWord: null,
}

// Setters (Dynamic Config)

export function setDynamicConfig(configName, configValue) {
  // Check if the config name is valid
  if (!dynamicConfig.hasOwnProperty(configName)) {
    throw new Error(`Invalid config name: ${configName}`);
  }

  // Check if the config value is valid
  if ((typeof configValue) !== (typeof dynamicConfig[configName]) && configValue !== null) {
    throw new Error(`Invalid config value: ${configValue} for config name: ${configName}`);
  }

  dynamicConfig[configName] = configValue;
}

//================/
// CONFIGS GETTER /
//================/

// Getter for all the configs, both static and dynamic  

export function getConfig(configName, type = 'static') {
  // Check if the config type is valid
  if (type !== 'static' && type !== 'dynamic') {
    throw new Error(`Invalid config type: ${type}`);
  }

  const configSet = type === 'static' ? staticConfig : dynamicConfig;
  
  // Check if the config name is valid
  if (!configSet.hasOwnProperty(configName)) {
    throw new Error(`Invalid config name: ${configName} (Not found in ${type} config)`);
  }

  let value = configSet[configName];

  // Automatically resolve intentsPath to absolute when requested
  if (type === 'static' && configName === 'intentsPath') {
    value = path.isAbsolute(value)
      ? value
      : path.resolve(process.cwd(), value); // resolves relative to where the program is run
  }

  return value;
}