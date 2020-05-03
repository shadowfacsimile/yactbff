'use strict';

const fs = require('fs');
const _ = require('lodash');

let confirmedRawdata = fs.readFileSync('time_series_covid19_confirmed_global.json');
let confirmed = JSON.parse(confirmedRawdata);
let deathsRawdata = fs.readFileSync('time_series_covid19_deaths_global.json');
let deaths = JSON.parse(deathsRawdata);
let recoveredRawdata = fs.readFileSync('time_series_covid19_recovered_global.json');
let recovered = JSON.parse(recoveredRawdata);
let indiaRawdata = fs.readFileSync('states_daily.json');
let india = JSON.parse(indiaRawdata);

confirmed = _.orderBy(confirmed, ['Country/Region'], ['asc']);
deaths = _.orderBy(deaths, ['Country/Region'], ['asc']);
recovered = _.orderBy(recovered, ['Country/Region'], ['asc']);

exports.confirmed = confirmed;
exports.deaths = deaths;
exports.recovered = recovered;
exports.india = india;
