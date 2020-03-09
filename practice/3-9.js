// 3/9/20 Monday 

const superagent = require('superagent');

function fetchPeopleWithPromises () {
  superagent.get('https://swapi.co/api/people/')
  .then(res => {
    return res.body.results.map(person => {
      return superagent.get(person.url);
    });
  })
  .then(personData => Promise.all(personData))
  .then(result => {
    let names = result.map(person => {
      return person.body.name;
    })
    console.log(names);
  });
}

async function fetchPeopleWithAsync () {
  const response = await superagent.get('https://swapi.co/api/people/');
  const dataFromURL = response.body.results.map(person => {
    return superagent.get(person.url);
  })
  const peopleData = await Promise.all(dataFromURL);
  const names = peopleData.map(person => {
    return person.body.name;
  })
  console.log(names);
}
fetchPeopleWithAsync();