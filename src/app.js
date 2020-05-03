'use strict';

const express = require('express');
const app = express();
let appRouter = express.Router();

const { india } = require('./readfiles');
const summary = require('./summary');
const { countries, states } = require('./countrywise');
const casesgrowth = require('./casesgrowth');
const deathsgrowth = require('./deathsgrowth');
const countriescasesgrowth = require('./countriescasesgrowth');
const countriesdeathsgrowth = require('./countriesdeathsgrowth');

appRouter.get('/api', (req, res) => res.send('YACT API!'));

appRouter.get('/api/stats/summary', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(summary.json);
});

appRouter.get('/api/stats/countries', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(countries);
});

appRouter.get('/api/stats/states', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(states);
});

appRouter.get('/api/stats/indiastats', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(india);
});

appRouter.get('/api/growth/cases', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(casesgrowth.growths);
});

appRouter.get('/api/growth/deaths', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(deathsgrowth.growths);
});

appRouter.get('/api/growth/cases/countries', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(countriescasesgrowth.growths);
});

appRouter.get('/api/growth/deaths/countries', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(countriesdeathsgrowth.growths);
});

app.use('/', appRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening to ${PORT}`));