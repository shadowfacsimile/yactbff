'use strict';

const _ = require('lodash');
const { deaths } = require('../../util/readfiles');

let deathsGrowths = new Array();

let keys = Object.keys(deaths[0]);
let tempCountry = '';

for (let item in deaths) {
    let country = deaths[item]['Country/Region'];
    let countryjson;
    let growths = new Array();

    if (country !== tempCountry) {
        countryjson = {
            "country": deaths[item]['Country/Region']
        }

        let json;

        for (let i = 5; i < keys.length; i++) {
            json = {
                "date": keys[i].toString(),
                "growth": 0,
                "delta": 0
            }

            growths.push(json);
        }

        countryjson.deathsGrowths = growths;
        deathsGrowths.push(countryjson);
    }

    tempCountry = country;
}

for (let item in deaths) {
    let keys = Object.keys(deaths[item]);

    for (let i = 5; i < keys.length; i++) {
        _.forEach(deathsGrowths, (el) => {
            if (el.country === deaths[item]['Country/Region'])
                _.forEach(el.deathsGrowths, (e) => {
                    if (e.date === keys[i]) {
                        e.growth += parseInt(deaths[item][keys[i]]);
                        e.delta += parseInt(deaths[item][keys[i]]) - parseInt(deaths[item][keys[i - 1]]);
                    }
                });
        });
    }
}

exports.growths = JSON.stringify(deathsGrowths);
