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

    const country = countries.find(country => cleanInput(country.name) === cleanCountry);
    if (!country) {
      return [];
    }

    return states.filter(state => state.country_id === country.id);
  },

  searchStates: function (searchTextState) {
    const cleanState = cleanInput(searchTextState);
    if (!cleanState) {
      return [];
    }

    const filteredStates = states.filter(state => state.name.toLowerCase().includes(cleanState));
    return filteredStates.map(state => {
      const country = countries.find(country => country.id === state.country_id);
      return { ...state, countryName: country ? country.name : '' };
    });
  },

  searchCountries: function (searchTextCountry) {
    const cleanCountry = cleanInput(searchTextCountry);
    if (!cleanCountry) {
      return [];
    }

    return countries.filter(country => country.name.toLowerCase().startsWith(cleanCountry));
  },

  searchStatesInCountry: function (searchTextState, countryName) {
    const countryStates = this.getAllStatesInCountry(cleanInput(countryName));
    if (countryStates.length === 0) {
      return [];
    }

    const cleanState = cleanInput(searchTextState);
    if (!cleanState) {
      return [];
    }

    const filteredStates = countryStates.filter(state => state.name.toLowerCase().includes(cleanState));
    return filteredStates.map(state => {
      const country = countries.find(country => country.id === state.country_id);
      return { ...state, countryName: country ? country.name : '' };
    });
  },
};

function cleanInput(value) {
  if (!value) return value;

  return value.trim().toLowerCase().replace(/  +/g, ' ');
}
