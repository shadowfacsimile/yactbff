'use script'

const cron = require('node-cron');
const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');
const csv = require("csvtojson");

let casesUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
let deathsUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
let recoveriesUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";
let indiaStatsUrl = "https://api.covid19india.org/states_daily.json";

let tempCasesFile = "/home/facsimile/yactbff/files/temp_time_series_covid19_confirmed_global.json";
let tempDeathsFile = "/home/facsimile/yactbff/files/temp_time_series_covid19_deaths_global.json";
let tempRecoveriesFile = "/home/facsimile/yactbff/files/temp_time_series_covid19_recovered_global.json";
let tempIndiaStatsFile = "/home/facsimile/yactbff/files/temp_states_daily.json";

let casesFile = "/home/facsimile/yactbff/files/time_series_covid19_confirmed_global.json";
let deathsFile = "/home/facsimile/yactbff/files/time_series_covid19_deaths_global.json";
let recoveriesFile = "/home/facsimile/yactbff/files/time_series_covid19_recovered_global.json";
let indiaStatsFile = "/home/facsimile/yactbff/files/states_daily.json";

cron.schedule('*/1 * * * *', () => {
    let jsondata = '';

    csv()
        .fromStream(request.get(casesUrl))
        .subscribe((json) => {
            jsondata += JSON.stringify(json);
        }, error => console.log(error), () => {
            fs.writeFileSync(tempCasesFile, jsondata);
            console.log('Done writing cases');
        });
});

cron.schedule('*/1 * * * *', () => {
    let jsondata = '';

    csv()
        .fromStream(request.get(deathsUrl))
        .subscribe((json) => {
            jsondata += JSON.stringify(json);
        }, error => console.log(error), () => {
            fs.writeFileSync(tempDeathsFile, jsondata);
            console.log('Done writing deaths');
        });
});

cron.schedule('*/1 * * * *', () => {
    let jsondata = '';

    csv()
        .fromStream(request.get(recoveriesUrl))
        .subscribe((json) => {
            jsondata += JSON.stringify(json);
        }, error => console.log(error), () => {
            fs.writeFileSync(tempRecoveriesFile, jsondata);
            console.log('Done writing recoveries');
        });
});

cron.schedule('*/1 * * * *', () => {
    request(indiaStatsUrl, (error, response, body) => {
        fs.writeFileSync(tempIndiaStatsFile, body);
        console.log('Done writing India Stats');
    });
});

cron.schedule('*/33 * * * *', () => {
    fs.copyFile(tempCasesFile, casesFile, (err) => {
        if (err) throw err;
        console.log(tempCasesFile + ' was copied to ' + casesFile);
    });
    fs.copyFile(tempDeathsFile, deathsFile, (err) => {
        if (err) throw err;
        console.log(tempDeathsFile + ' was copied to ' + deathsFile);
    });
    fs.copyFile(tempRecoveriesFile, recoveriesFile, (err) => {
        if (err) throw err;
        console.log(tempRecoveriesFile + ' was copied to ' + recoveriesFile);
    });
    fs.copyFile(tempIndiaStatsFile, indiaStatsFile, (err) => {
        if (err) throw err;
        console.log(tempIndiaStatsFile + ' was copied to ' + indiaStatsFile);
    });
});