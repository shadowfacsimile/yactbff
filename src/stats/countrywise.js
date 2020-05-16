'use strict';

const _ = require('lodash');
delete require.cache[require.resolve('../util/readfiles')];
const { confirmed, deaths, recovered } = require('../util/readfiles');
const { today, yesterday } = require('../util/dateutil');

let countries = new Array();
let states = new Array();

let tempCountry;

for (let item in confirmed) {
    let country = confirmed[item]['Country/Region'];
    let state = confirmed[item]['Province/State'];
    let totalCases = parseInt(confirmed[item][today]);
    let totalNewCases = totalCases - parseInt(confirmed[item][yesterday]);

    let countryJson;
    let stateJson;

    if (country === tempCountry) {
        countryJson = countries.pop();
        countryJson.totalCases += totalCases;
        countryJson.totalNewCases += totalNewCases;
        countryJson.totalDeaths = 0;
        countryJson.totalNewDeaths = 0;
        countryJson.totalRecoveries = 0;
        countryJson.totalNewRecoveries = 0;
        countryJson.statewiseDataExists = true;
    } else {
        countryJson = {
            "country": country,
            "totalCases": totalCases,
            "totalNewCases": totalNewCases,
            "totalDeaths": 0,
            "totalNewDeaths": 0,
            "totalRecoveries": 0,
            "totalNewRecoveries": 0,
            "statewiseDataExists": false
        }
    }

    stateJson = {
        "country": country,
        "state": state,
        "totalCases": totalCases,
        "totalNewCases": totalNewCases,
        "totalDeaths": 0,
        "totalNewDeaths": 0,
        "totalRecoveries": 0,
        "totalNewRecoveries": 0
    }

    countries.push(countryJson);
    states.push(stateJson);
    tempCountry = country;
}

for (let item in deaths) {
    let country = deaths[item]['Country/Region'];
    let state = confirmed[item]['Province/State'];
    let totalDeaths = parseInt(deaths[item][today]);
    let totalNewDeaths = totalDeaths - parseInt(deaths[item][yesterday]);

    _.forEach(countries, (ctry) => {
        if (country === ctry.country) {
            ctry.totalDeaths += totalDeaths;
            ctry.totalNewDeaths += totalNewDeaths;            
            ctry.mortalityRate = ctry.totalDeaths / ctry.totalCases;
        }
    });

    _.forEach(states, (st) => {
        if (country === st.country && state === st.state) {
            st.totalDeaths = totalDeaths;
            st.totalNewDeaths = totalNewDeaths;            
            st.mortalityRate = st.totalDeaths / st.totalCases;
        }
    });
}

for (let item in recovered) {
    let country = recovered[item]['Country/Region'];
    let state = confirmed[item]['Province/State'];
    let totalRecoveries = parseInt(recovered[item][today]);
    let totalNewRecoveries = totalRecoveries - parseInt(recovered[item][yesterday]);

    _.forEach(countries, (ctry) => {
        if (country === ctry.country) {
            ctry.totalRecoveries += totalRecoveries;
            ctry.totalNewRecoveries += totalNewRecoveries;
            ctry.recoveryRate = ctry.totalRecoveries / ctry.totalCases;
        }
    });    

    _.forEach(states, (st) => {
        if (country === st.country && state === st.state) {
            st.totalRecoveries = totalRecoveries;
            st.totalNewRecoveries = totalNewRecoveries;            
            st.recoveryRate = st.totalRecoveries / st.totalCases;
        }
    });
}

countries = _.orderBy(countries, ['totalCases'], ['desc']);
states = _.orderBy(states, ['country', 'totalCases'], ['asc', 'desc']);

module.exports.countries = JSON.stringify(countries);
module.exports.states = JSON.stringify(states);
