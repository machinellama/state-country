# state-country

Get a list of all countries, states, or states within a country.
Note: only returns names for countries and states, which makes this a simple and minimal package.

Other popular libraries include city data and extended country/state data (e.g. phone or currency info), which inflates package size by quite a lot. But if you don't need city data and you only need country/state names, this package is a fast, simple, and light-weight alternative.

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
