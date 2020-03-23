// 3/23/20 Monday 

const superagent = require('superagent');

function fetchPeopleWithPromise() {
  superagent.get('https://swapi.co/api/people/')
  .then(res => res.body.results.map(x => {
    return superagent.get(x.url);
  }))
  .then(mappedData => Promise.all(mappedData))
  .then(urlData => {
    let names = urlData.map(x => x.body.name);
    return names;
  })
}

async function fetchPeopleWithAsync() {
  const initial = await superagent.get('https://swapi.co/api/people/');
  const urlList = initial.body.results.map(x => superagent.get(x.url));
  const arrayData = await Promise.all(urlList);
  const names = arrayData.map(x => x.body.name);
  console.log(names);
}

fetchPeopleWithAsync();