// 4/19/20 Sunday 

// Starwars API is down; I added the catch block to report the error. 

const superagent = require('superagent');

function fetchPeopleWithPromise() {
  superagent.get('https://swapi.co/api/people/')
  .then(initialResult => console.log(initialResult))
  .catch((error) => console.log(error))
}

fetchPeopleWithPromise();