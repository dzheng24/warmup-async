// 4/8/20 Wednesday 

const superagent = require('superagent');

function fetchPeopleWithPromises() {
  superagent.get('https://swapi.co/api/people/')
  .then(initialResult => initialResult.body.results.map(x => superagent.get(x.url)))
  .then(arrayData => Promise.all(arrayData))
  .then(dataFromArray => {
    let names = dataFromArray.map(x => x.body.name);
    console.log(names);
  });
}

// fetchPeopleWithPromises();

async function fetchPeoplWithAsync() {
  const initialData = await superagent.get('https://swapi.co/api/people/');
  const url = initialData.body.results.map(x => {
    return superagent.get(x.url);
  });
  const dataFromUrl = await Promise.all(url);
  const names = dataFromUrl.map(x => x.body.name);
  console.log(names);
}

// fetchPeoplWithAsync();