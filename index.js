import { trainNLPModel } from "./src/intentManager";
import * as APICall from './src/call';

function main(){
  trainNLPModel()
  await APICall.callIntent("templateIntent");
  await APICall.callIntent("getTime"); 
}