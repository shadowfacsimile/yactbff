'use strict';

const _ = require('lodash');
delete require.cache[require.resolve('../../util/readfiles')];
const { deaths } = require('../../util/readfiles');

let growths = new Array();

let json;
let keys = Object.keys(deaths[0]);

for (let i = 5; i < keys.length; i++) {
    json = {
        "date": keys[i].toString(),
        "growth": 0,
        "delta": 0
    }

    growths.push(json);
}

for (let item in deaths) {
    let keys = Object.keys(deaths[item]);

    for (let i = 5; i < keys.length; i++) {
        _.forEach(growths, (el) => {
            if (el['date'] === keys[i]) {
                el.growth += parseInt(deaths[item][keys[i]]);
                el.delta += parseInt(deaths[item][keys[i]]) - parseInt(deaths[item][keys[i - 1]]);
            }
        });
    }
}

module.exports.growths = JSON.stringify(growths);
