import { exec } from 'child_process';

const playlists = [
  "https://www.youtube.com/watch?v=XEdoMoV4D6k&list=PLwjEXrvFo-2B7iCX61eOThc_oGihi84l9",
  "https://www.youtube.com/watch?v=Ctuo3ws3EKs&list=PLe1jcCJWvkWiWLp9h3ge0e5v7n6kxEfOG",
  "https://www.youtube.com/watch?v=917xijnpJVw&list=PL_7N2OGhRlMf2Hi3eDKvJlW9IUV366oT3",
];

export default async function main() {
  
  const chosenPlaylist = playlists[Math.floor(Math.random() * playlists.length)].replaceAll("&", "^&")
  
  console.log("Chosen Playlist: ", chosenPlaylist)

  exec(`start ${chosenPlaylist}`, (err) => {
    if (err) {
      console.error(`error opening playlist: ${err.message}`)
    }
  });
}
