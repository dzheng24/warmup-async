// 3/30/20 Monday 

const superagent = require('superagent');


function fetchPeopleWithPromises() {
  superagent.get('https://swapi.co/api/people/')
  .then(results => results.body.results.map(person => superagent.get(person.url)))
  .then(dataFromUrl => Promise.all(dataFromUrl))
  .then(response => {
    let names = response.map(individual => individual.body.name)
    console.log(names);
  })
}

// fetchPeopleWithPromises();

async function fetchPeopleWithAsync() {
  const initialData = await superagent.get('https://swapi.co/api/people/');
  const urlData = initialData.body.results.map(person => superagent.get(person.url));
  const returnedData = await Promise.all(urlData);
  const names = returnedData.map(person => person.body.name);
  console.log(names);
}

fetchPeopleWithAsync();