export default async function main({ args }) {
  const search = args?.query || 'google'; // fallback if somehow missing
  console.log(`Searching on both computers for ${search}`)

  fetch('http://10.68.20.115:4000/search', {
    method: 'POST', // Specify the HTTP method as POST
    headers: {
      'Content-Type': 'application/json' // Indicate that the body is JSON
    },
    body: JSON.stringify({message: search}) // Convert the JavaScript object to a JSON string
  })

  fetch('http://10.68.20.119:4000/search', {
    method: 'POST', // Specify the HTTP method as POST
    headers: {
      'Content-Type': 'application/json' // Indicate that the body is JSON
    },
    body: JSON.stringify({message: search}) // Convert the JavaScript object to a JSON string
  })
}
