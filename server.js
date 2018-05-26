let express = require('express');
let Map = require('./lib/Map');
let Maps = require('./lib/Maps');
let app = express();

let maps = new Maps();
maps.setFakeData();

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
app.get('/', function (req, res) {
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
app.get('/maps', function (req, res) {
    try {
        maps.getMaps(function(mapsJson) {
            res.send(JSON.stringify(mapsJson));
        });
    }
    catch(e) {
        console.log(e);
    }
});

app.get('/maps/map/:mapName', function(req, res) {
    try {
        maps.getMapByName(req.params.mapName, function(map) {
            if(map) {
                res.send(JSON.stringify(map));
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
app.get('/maps/map/:mapId/scores', function(req, res) {
    try {

    }
    catch(e) {
        console.log(e);
    }
});

app.listen(80, function () {
    console.log('started app!');
});