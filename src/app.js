'use strict';

const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();
let appRouter = express.Router();

app.use(compression());
app.use(cors());

appRouter.get('/api', (req, res) => res.send('YACT API!'));

appRouter.get('/api/stats/summary', (req, res) => { 
    const { summary } = require('./stats/summary');
    delete require.cache[require.resolve('./stats/summary')];     
    res.setHeader('Content-Type', 'application/json');
    res.end(summary);
});

appRouter.get('/api/stats/countries', (req, res) => {
    const { countries } = require('./stats/countrywise');
    delete require.cache[require.resolve('./stats/countrywise')]; 
    res.setHeader('Content-Type', 'application/json');
    res.end(countries);
});

appRouter.get('/api/stats/states', (req, res) => {
    const { states } = require('./stats/countrywise');
    delete require.cache[require.resolve('./stats/countrywise')]; 
    res.setHeader('Content-Type', 'application/json');
    res.end(states);
});

appRouter.get('/api/stats/indiastats', (req, res) => {
    const { indiaStats } = require('./util/readfiles');
    delete require.cache[require.resolve('./util/readfiles')]; 
    res.send(indiaStats)
});

appRouter.get('/api/growth/cases', (req, res) => {
    const casesgrowth = require('./growth/cases/casesgrowth');
    delete require.cache[require.resolve('./growth/cases/casesgrowth')];
    res.setHeader('Content-Type', 'application/json');
    res.end(casesgrowth.growths);
});

appRouter.get('/api/growth/deaths', (req, res) => {    
    const deathsgrowth = require('./growth/deaths/deathsgrowth');
    delete require.cache[require.resolve('./growth/cases/deathsgrowth')];
    res.setHeader('Content-Type', 'application/json');
    res.end(deathsgrowth.growths);
});

appRouter.get('/api/growth/cases/countries', (req, res) => {
    const countriescasesgrowth = require('./growth/cases/countriescasesgrowth');
    delete require.cache[require.resolve('./growth/cases/countriescasesgrowth')];
    res.setHeader('Content-Type', 'application/json');
    res.end(countriescasesgrowth.growths);
});

appRouter.get('/api/growth/deaths/countries', (req, res) => {
    const countriesdeathsgrowth = require('./growth/deaths/countriesdeathsgrowth');
    delete require.cache[require.resolve('./growth/cases/countriesdeathsgrowth')];
    res.setHeader('Content-Type', 'application/json');
    res.end(countriesdeathsgrowth.growths);
});

app.use('/', appRouter);

const PORT = process.env.PORT || 49162;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));