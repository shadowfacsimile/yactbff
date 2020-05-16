'use strict';

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const app = express();
let appRouter = express.Router();

delete require.cache[require.resolve('./util/readfiles')];
const { indiaStats } = require('./util/readfiles');
const summary = require('./stats/summary');
const { countries, states } = require('./stats/countrywise');
const casesgrowth = require('./growth/cases/casesgrowth');
const countriescasesgrowth = require('./growth/cases/countriescasesgrowth');
const deathsgrowth = require('./growth/deaths/deathsgrowth');
const countriesdeathsgrowth = require('./growth/deaths/countriesdeathsgrowth');

app.use(compression());
app.use(cors());

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

appRouter.get('/api/stats/indiastats', (req, res) => res.send(indiaStats));

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

const PORT = process.env.PORT || 49161;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));