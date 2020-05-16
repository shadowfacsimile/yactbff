'use strict';

delete require.cache[require.resolve('./readfiles')];
const { confirmed } = require('./readfiles');

let keys = Object.keys(confirmed[0]);
let len = keys.length;
let today = keys[len - 1];
let yesterday = keys[len - 2];

exports.today = today;
exports.yesterday = yesterday;