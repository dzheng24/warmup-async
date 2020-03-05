// 3/5/20 Thursday 

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
    let names = people.map(individual => {
      return individual.body.name;
    })
    console.log(names);
  });
}
// fetchPeopleWithPromises();

async function fetchPeopleWithAsync() {
  let result = await superagent.get('https://swapi.co/api/people/');
  let url = result.body.results.map(person => {
    return superagent.get(person.url);
  });
  let peopleData = await Promise.all(url);
  let names = peopleData.map(person => {
    return person.body.name;
  });
  console.log(names);
}

// fetchPeopleWithAsync();