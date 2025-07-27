import { exec } from 'child_process';

export default function main({ args }) {
  const query = args?.query || 'google';
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  exec(`start ${url}`, (error) => {
    if (error) {
      console.error(`Error opening browser: ${error.message}`);
    }
  });
}