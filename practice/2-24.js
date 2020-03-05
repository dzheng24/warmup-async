// practice on 2/24/20

const superagent = require('superagent');

function fetchPeopleWithPromises() {
  superagent.get('https://swapi.co/api/people/')
  .then(res => {
    return res.body.results.map(person => {
      return superagent.get(person.url);
    })
  })
  .then(personData => Promise.all(personData))
  .then(people => {
    let names = people.map(person => (person.body.name));
    console.log(names);
  })
}

async function fetchPeopleWithAsync () {
  let res = await superagent.get('https://swapi.co/api/people/')
  let url = res.body.results.map(person => {
     return superagent.get(person.url);
  })
  let peopleData = await Promise.all(url);
  let names = peopleData.map(person => person.body.name)
  console.log(names);
}

fetchPeopleWithAsync();