'use strict';

const _ = require('lodash');
const { confirmed } = require('./readfiles');

let growths = new Array();

let json;
let keys = Object.keys(confirmed[0]);

for (let i = 5; i < keys.length; i++) {
    json = {
        "date": keys[i].toString(),
        "growth": 0,
        "delta": 0
    }

    growths.push(json);
}

for (let item in confirmed) {
    let keys = Object.keys(confirmed[item]);

    for (let i = 5; i < keys.length; i++) {
        _.forEach(growths, (el) => {
            if (el.date === keys[i]) {
                el.growth += parseInt(confirmed[item][keys[i]]);
                el.delta += parseInt(confirmed[item][keys[i]]) - parseInt(confirmed[item][keys[i - 1]]);
            }
        });
    }
}

exports.growths = JSON.stringify(growths);
