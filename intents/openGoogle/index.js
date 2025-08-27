import { exec } from 'child_process';

export default async function main({ args }) {
  const search = args?.query || 'google'; // fallback if somehow missing
  const url = `https://www.google.com/search?q=${encodeURIComponent(search)}`;

  exec(`start ${url}`, (error) => {
    if (error) {
      console.error(`Error opening browser: ${error.message}`);
    }
  });
}
