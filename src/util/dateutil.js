'use strict';

const { confirmed } = require('./readfiles');

let toDateString = (date) => {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().substring(2, 4);
};

let date = new Date();
let today = toDateString(date);
date.setDate(date.getDate() - 1);
let yesterday = toDateString(date);

if (!confirmed[0][today]) {
    today = toDateString(date);
    date.setDate(date.getDate() - 1);
    yesterday = toDateString(date);
}

exports.today = today;
exports.yesterday = yesterday;