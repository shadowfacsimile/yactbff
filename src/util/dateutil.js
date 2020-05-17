'use strict';

const { confirmed } = require('./readfiles');
delete require.cache[require.resolve('./readfiles')];

let keys = Object.keys(confirmed[0]);
let len = keys.length;
let today = keys[len - 1];
let yesterday = keys[len - 2];

module.exports.today = today;
module.exports.yesterday = yesterday;