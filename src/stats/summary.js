'use strict';

const _ = require('lodash');
const { confirmed, deaths, recovered } = require('../util/readfiles');
const { today, yesterday } = require('../util/dateutil');

let totalCases = 0;
let totalNewCases = 0;
let totalDeaths = 0;
let totalNewDeaths = 0;
let totalRecoveries = 0;
let totalNewRecoveries = 0;
let countriesWithFirstCase = [];
let countriesWithFirstDeath = [];
let tempCountry;

_.forEach(confirmed, (item) => {
    totalCases += parseInt(item[today]);
    totalNewCases += parseInt(item[yesterday]);

    if (item[yesterday] === '0' && item[today] !== '0' && item['Country/Region'] !== tempCountry)
        countriesWithFirstCase.push(item['Country/Region']);

    tempCountry = item['Country/Region'];
});

_.forEach(deaths, (item) => {
    totalDeaths += parseInt(item[today]);
    totalNewDeaths += parseInt(item[yesterday]);

    if (item[yesterday] === '0' && item[today] !== '0' && item['Country/Region'] !== tempCountry)
        countriesWithFirstDeath.push(item['Country/Region']);

    tempCountry = item['Country/Region'];
});

_.forEach(recovered, (item) => {
    totalRecoveries += parseInt(item[today]);
    totalNewRecoveries += parseInt(item[yesterday]);
});

totalNewCases = totalCases - totalNewCases;
totalNewDeaths = totalDeaths - totalNewDeaths;
totalNewRecoveries = totalRecoveries - totalNewRecoveries;

let json = JSON.stringify({
    "totalCases": totalCases,
    "totalNewCases": totalNewCases,
    "totalDeaths": totalDeaths,
    "totalNewDeaths": totalNewDeaths,
    "totalRecoveries": totalRecoveries,
    "totalNewRecoveries": totalNewRecoveries,
    "mortalityRate": totalDeaths / totalCases,
    "recoveryRate": totalRecoveries / totalCases,
    "countriesWithFirstCase": countriesWithFirstCase,
    "countriesWithFirstDeath": countriesWithFirstDeath
})

module.exports.json = json;