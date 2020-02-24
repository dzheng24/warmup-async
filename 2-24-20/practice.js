const superagent = require('superagent');

function fetchPeopleWithPromises() {
  return superagent.get('https://swapi.co/api/people/')
  .then(res => {
    return res.body.results.map(person => {
      return superagent.get(person.url);
    })
  })
  .then(personData => Promise.all(personData))
  .then(people => {
    let result = people.map(person => (person.body.name));
    console.log(result);
  })
}

fetchPeopleWithPromises();

