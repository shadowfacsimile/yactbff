'use strict';

const _ = require('lodash');
const { confirmed } = require('../../util/readfiles');

let casesGrowths = new Array();

let keys = Object.keys(confirmed[0]);
let tempCountry;

for (let item in confirmed) {
    let country = confirmed[item]['Country/Region'];
    let countryjson;
    let growths = new Array();

    if (country !== tempCountry) {
        countryjson = {
            "country": confirmed[item]['Country/Region']
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

        countryjson.casesGrowths = growths;
        casesGrowths.push(countryjson);
    }

    tempCountry = country;
}

for (let item in confirmed) {
    let keys = Object.keys(confirmed[item]);

    for (let i = 5; i < keys.length; i++) {
        _.forEach(casesGrowths, (el) => {
            if (el.country === confirmed[item]['Country/Region'])
                _.forEach(el.casesGrowths, (e) => {
                    if (e.date === keys[i]) {
                        e.growth += parseInt(confirmed[item][keys[i]]);
                        e.delta += parseInt(confirmed[item][keys[i]]) - parseInt(confirmed[item][keys[i - 1]]);
                    }
                });
        });
    }
}

module.exports.growths = JSON.stringify(casesGrowths);
