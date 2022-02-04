const alasql = require('alasql/dist/alasql.min.js');
const countries = require('./countries.json').countries;
const states = require('./states.json').states;

module.exports = {
  getAllCountries: function () {
    return countries;
  },

  getAllStates: function () {
    return states;
  },

  getAllStatesInCountry: function (countryName) {
    const cleanCountry = cleanInput(countryName);
    if (!cleanCountry) {
      return [];
    }

    const countryIdQuery = "VALUE OF SELECT * FROM ? AS country WHERE LOWER(country.name) = '" + cleanCountry + "'";
    const countryId = alasql(countryIdQuery, [countries]);

    const stateCountryJoinQuery = 'SELECT state.* FROM ? as state WHERE state.country_id="' + countryId + '"';
    const stateCountryJoinList = alasql(stateCountryJoinQuery, [states]);

    return stateCountryJoinList;
  },

  searchStates: function (searchTextState) {
    const cleanState = cleanInput(searchTextState);
    if (!cleanState) {
      return [];
    }

    const searchStateQuery = 'SELECT * FROM ? as state WHERE name iLIKE "%' + cleanState + '%"';
    const statesList = alasql(searchStateQuery, [states]);

    const stateCountryJoinQuery = 'SELECT state.*, country.name as countryName FROM ? as state JOIN ? as country ON state.country_id = country.id';
    const stateCountryList = alasql(stateCountryJoinQuery, [statesList, countries]);

    return stateCountryList;
  },

  searchCountries: function (searchTextCountry) {
    const cleanCountry = cleanInput(searchTextCountry);
    if (!cleanCountry) {
      return [];
    }

    const searchCountryQuery = 'SELECT * FROM ? as country WHERE name iLIKE "' + cleanCountry + '%"';
    const countryList = alasql(searchCountryQuery, [countries]);

    return countryList;
  },

  searchStatesInCountry: function (searchTextState, countryName) {
    const countryStates = this.getAllStatesInCountry(countryName);
    if (countryStates.length === 0) {
      return [];
    }

    const cleanState = cleanInput(searchTextState);
    if (!cleanState) {
      return [];
    }

    const searchStateQuery = 'SELECT * FROM ? as state WHERE name iLIKE "%' + cleanState + '%"';
    const statesList = alasql(searchStateQuery, [countryStates]);

    const stateCountryJoinQuery = 'SELECT state.*, country.name as countryName FROM ? as state JOIN ? as country ON state.country_id = country.id';
    const stateCountryList = alasql(stateCountryJoinQuery, [statesList, countries]);

    return stateCountryList;
  },
};

function cleanInput(value) {
  if (!value) return value;

  return value.trim().toLowerCase().replace(/  +/g, ' ');
}