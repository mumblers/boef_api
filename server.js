let express = require('express');
let Map = require('./lib/Map');
let Maps = require('./lib/Maps');
let app = express();

let maps = new Maps();
maps.loadMaps();

app.use(express.static('public/'));

let logger = function (req, res, next) {
    try {
        console.log('Request for ' + req._parsedOriginalUrl.path + ' from ' + req.headers.host + '.');

        next();
    }
    catch(e) {
        console.log(e);
    }
};

app.use(logger);

/*
 * Root page
 */
app.get('/api/', function (req, res) {
    try {
        res.send('Welcome to the #boef API!');
    }
    catch(e) {
        console.log(e);
    }
});

/*
 * Everything maps
 */
app.get('/api/maps', function (req, res) {
    try {
        maps.getMapsAsJson(function(mapsJson) {
            res.send(JSON.stringify(mapsJson));
        });
    }
    catch(e) {
        console.log(e);
    }
});

app.get('/api/maps/:mapName', function(req, res) {
    try {
        maps.getMapByName(req.params.mapName, function(map) {
            if(map) {
                res.send(JSON.stringify(map.getMap()));
            }
            else {
                res.send('Map not found');
            }
        });
    }
    catch(e) {
        console.log(e);
    }
});

/*
 * Everything scores
 */
app.get('/api/maps/:mapName/scores', function(req, res) {
    try {
        maps.getMapByName(req.params.mapName, function(map) {
            if(map) {
                res.send(JSON.stringify(map.getScores()));
            }
            else {
                res.send('Map not found');
            }
        });
    }
    catch(e) {
        console.log(e);
    }
});

app.post('/api/maps/:mapName/scores', function(req, res) {
    try {
        let username = 'anonymous';
        if(req.body.username)
            username = req.body.username;

        let score = 0;
        if(req.body.score)
            score = parseInt(req.body.score);

        maps.getMapByName(req.params.mapName, function(map) {
            map.saveScore({
                username: username,
                score: score,
            });
        });
    }
    catch(e) {
        console.log(e);
    }

    res.send('');
});

app.listen(8080, function () {
    console.log('started app!');
});