// This file is responsible for storing the general configuration for the NLP manager

import path from 'path';

//=======================/
// STATIC CONFIGURATION /
//=======================/

const staticConfig = {
  threshold: 0.90,
  languages: ['en'],
  forceNER: true,
  intentsPath: './intents/',
  defaultIntent: null,
};

export function setStaticConfig(configName, configValue) {
  if (!staticConfig.hasOwnProperty(configName)) {
    throw new Error(`Invalid config name: ${configName}`);
  }
  if ((typeof configValue) !== (typeof staticConfig[configName]) && configValue !== null) {
    throw new Error(`Invalid config value: ${configValue} for config name: ${configName}`);
  }
  staticConfig[configName] = configValue;
}

//=======================/
// DYNAMIC CONFIGURATION /
//=======================/

const dynamicConfig = {
  debugMode: false,
  keyWord: null,
};

export function setDynamicConfig(configName, configValue) {
  if (!dynamicConfig.hasOwnProperty(configName)) {
    throw new Error(`Invalid config name: ${configName}`);
  }
  if ((typeof configValue) !== (typeof dynamicConfig[configName]) && configValue !== null) {
    throw new Error(`Invalid config value: ${configValue} for config name: ${configName}`);
  }
  dynamicConfig[configName] = configValue;
}

//================/
// CONFIGS GETTER /
//================/

export function getConfig(configName, type = 'static') {
  const configSet = type === 'static' ? staticConfig : dynamicConfig;
  if (!configSet.hasOwnProperty(configName)) {
    throw new Error(`Invalid config name: ${configName} (Not found in ${type} config)`);
  }

  let value = configSet[configName];

  if (type === 'static' && configName === 'intentsPath') {
    value = path.isAbsolute(value)
      ? value
      : path.resolve(process.cwd(), value);
  }

  return value;
}