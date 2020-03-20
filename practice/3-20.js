// 3/20/20 Friday 

const superagent = require('superagent');

function fetchPeopleWithPromises () {
  superagent.get('https://swapi.co/api/people/')
  .then(res => {
    return res.body.results.map(person => {
      return superagent.get(person.url);
    })
  })
  .then(mess => Promise.all(mess))
  .then(personData => {
    let names = personData.map(individual => {
      return individual.body.name;
    })
    console.log(names);
  })
}

async function fetchPeopleWithAsync() {
  const bodyData = await superagent.get('https://swapi.co/api/people/');
  const urlData = bodyData.body.results.map(person => superagent.get(person.url));
  const personData = await Promise.all(urlData);
  const names = personData.map(individual => individual.body.name);
  console.log(names);
}

fetchPeopleWithAsync();