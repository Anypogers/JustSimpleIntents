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

const permanentStaticConfig = Object.keys(staticConfig);

// Getter (Dynamic Config)

export function getStaticConfig(configName) {
  if (!staticConfig.hasOwnProperty(configName)) {
    throw new Error(`Config exist. ${configName}`);
  }

  value = staticConfig[configName];

  // Automatically resolve intentsPath to absolute when requested
  if (configName === 'intentsPath') {
    value = path.isAbsolute(value)
      ? value
      : path.resolve(process.cwd(), value); // resolves relative to where the program is run
  }

  return value;
}

// Setter (Static Config)

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

// Adder (Static Config)

export function addStaticConfig(configName, configValue, overwrite = false) {
  if (configName in permanentStaticConfig) {
    throw new Error(`Can't force change value of necessary configs. ${configName}`)
  }
  if (staticConfig.hasOwnProperty(configName) && !overwrite) {
    throw new Error(`Config already exists. ${configName}`)
  }

  staticConfig[configName] = configValue;
}

// Remover (Static Config)

export function remStaticConfig(configName) {
  if (configName in permanentStaticConfig) {
    throw new Error(`Cannot delete necessary configs. ${configName}`)
  }
  if (!staticConfig.hasOwnProperty(configName)) {
    throw new Error(`Config doesn't exist: ${configName}`)
  }
  delete staticConfig[configName]
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

const permanentDynamicConfigs = Object.keys(dynamicConfig);

// Getter (Dynamic Config)

export function getDynamicConfig(configName) {
  if (!dynamicConfig.hasOwnProperty(configName)) {
    throw new Error(`Invalid config name: ${configName}`)
  }
  return dynamicConfig[configName];
}

// Setter (Dynamic Config)

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

// Adder (Dynamic Config)

export function addDynamicConfig(configName, configValue, overwrite = false) {
  if (configName in permanentDynamicConfigs) {
    throw new Error(`Can't force change value of necessary configs. ${configName}`);
  }
  if (dynamicConfig.hasOwnProperty(configName)) {
    if (!overwrite) {
      throw new Error(`Config already exists. ${configName}`);
    }
    setDynamicConfig(configName, configValue);
  }
  dynamicConfig[configName] = configValue;
}

// Remover (Dynamic Config)

export function remDynamicConfig(configName) {
  if (configName in permanentDynamicConfigs) {
    throw new Error(`Cannot delete necessary configs. ${configName}`)
  }
  if (!dynamicConfig.hasOwnProperty(configName)) {
    throw new Error(`Config doesn't exist: ${configName}`)
  }
  delete dynamicConfig[configName]
}