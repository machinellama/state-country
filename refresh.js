const superagent = require('superagent');
const csv = require('csvtojson');
const fs = require('fs');

/**
 * Script to get latest country and state lists from github
 * Source: https://github.com/dr5hn/countries-states-cities-database
 */
async function run() {
  // Get newest countries list from github and overwrite countries.json
  const countriesURL =
    'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/csv/countries.csv';
  const countriesPath = './countries.json';

  const countriesResponse = await superagent.get(countriesURL);
  const countryCSVString = countriesResponse.text;

  if (countryCSVString) {
    const newCountries = await csv({
      includeColumns: /(^id$|^name$)/
    }).fromString(countryCSVString);

    if (newCountries) {
      fs.writeFileSync(countriesPath, JSON.stringify({ countries: newCountries }, null, 2), {
        encoding: 'utf8',
        flag: 'w'
      });
    }
  }

  // Get newest states list from github and overwrite states.json
  const statesURL =
    'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/csv/states.csv';
  const statesPath = './states.json';

  const statesResponse = await superagent.get(statesURL);
  const statesCSVString = statesResponse.text;

  if (statesCSVString) {
    const newState = await csv({
      includeColumns: /(^id$|^name$|^country_id$)/
    }).fromString(statesCSVString);

    if (newState) {
      fs.writeFileSync(statesPath, JSON.stringify({ states: newState }, null, 2), {
        encoding: 'utf8',
        flag: 'w'
      });
    }
  }
}

run();
