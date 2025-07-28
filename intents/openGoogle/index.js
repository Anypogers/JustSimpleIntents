import { exec } from 'child_process';

export default function main( input ) {
  let search = input.split(" ").slice(1).join(' ')
  const url = `https://www.google.com/search?q=${encodeURIComponent(search)}`;

  exec(`start ${url}`, (error) => {
    if (error) {
      console.error(`Error opening browser: ${error.message}`);
    }
  });
}