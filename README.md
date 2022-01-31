# state-country

Get a list of all countries, states, or states within a country.

Fast, simple, and light-weight.

**Installation**

     npm i state-country
     or
     yarn add state-country

**Usage**

     import stateCountry from 'state-country';
     or
     const stateCountry = require('state-country');

### Functions

**Get all countries in the world**

     const countriesList = stateCountry.getAllCountries();

**Get all states in the world**

     const statesList = stateCountry.getAllStates();

**Get all states in a given country**

     const statesInCountryList = stateCountry.getAllStatesInCountry('jaPaN');

**Search countries**

     const searchCountriesList = stateCountry.searchCountries('jap');

**Search states**

     const searchStatesList = stateCountry.searchStates('North');

**Search states in a given country**

     const searchStatesInCountryList = stateCountry.searchStatesInCountry('noRTH', 'united states');

### Data Source

Country and state data from: https://github.com/dr5hn/countries-states-cities-database. A `refresh.js` script is included to easily update the countries and states json files with the latest data from countries-states-cities-database.
