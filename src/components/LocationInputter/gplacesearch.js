// Your personal API key.
// Get it here: https://console.cloud.google.com/google/maps-apis
const API_KEY = 'AIzaSyCa3ft5Sa0g0eiurY5-ELmOnGYPr4c1NRE';
const QUERY = 'Northeastern+Boston';
const PLACES_API = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${QUERY}&key=${API_KEY}`;

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'application/json'
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    // body: '', // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
try {
  const results = postData(PLACES_API, { });
  console.log(JSON.stringify(results)); // JSON-string from `response.json()` call
} catch (error) {
  console.error(error);
}

// export default {
//   results,
// };
