'use strict';

const { confirmed } = require('./readfiles');

let date = new Date();
let today = date.getDay() - 1 + '/' + date.getDate() + '/' + date.getFullYear().toString().substring(2, 4);
date.setDate(date.getDate() - 1);
let yesterday = date.getDay() + '/' + date.getDate() + '/' + date.getFullYear().toString().substring(2, 4);

if (!confirmed[0][today]) {
    today = date.getDay() + '/' + date.getDate() + '/' + date.getFullYear().toString().substring(2, 4);
    date.setDate(date.getDate() - 1);
    yesterday = date.getDay() + '/' + date.getDate() + '/' + date.getFullYear().toString().substring(2, 4);
}

exports.today = today;
exports.yesterday = yesterday;