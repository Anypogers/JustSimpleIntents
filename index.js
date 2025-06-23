import * as intentManager from './src/intentManager.js';

function main(){
  intentManager.trainNLPModel();

  console.log(intentManager.call("test"));
}

main()