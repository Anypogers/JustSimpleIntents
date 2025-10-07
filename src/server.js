import express from "express";
import { processInput } from "./intentManager.js";


const app = express();
const port = 3000; // Choose an available port

// Create an API endpoint to access the function
app.post('/process/:input', (req, res) => {
  const input = req.params.input;
  const result = processInput(input);
  res.send(result);
});

export default function startServer() {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}
