let Map = require('./Map');
let async = require('async');
let fs = require('fs');
let path = require('path');

class Maps {
    constructor() {
        this.maps = [];
    }

    loadMaps(methodCallback) {
        const isDirectory = source => fs.lstatSync(source).isDirectory();

        let dir = 'game/maps/';
        let mapDirectories = fs.readdirSync(dir).map(name => path.join(dir, name)).filter(isDirectory);

        async.each(mapDirectories, function(mapDirectory, asyncCallback) {
            let map = new Map();

            map.load(mapDirectory, function(success) {
                if(success) {
                    this.maps.push(map);
                }

                asyncCallback();
            }.bind(this));
        }.bind(this), function(err) {
            if(err) {
                console.log(err);
            }

            if(methodCallback)
                methodCallback();
        }.bind(this));
    }

    getMapsAsJson(callback) {
        let maps = [];

        async.each(this.maps, function(map, callback) {
            maps.push(map.getMap());

            callback();
        }, function(err) {
            if(err) {
                console.log(err);
                callback(false);
            }
            else if(maps !== null) {
                callback(maps);
            }
            else {
                callback(false);
            }
        });
    }

    getMapByName(mapName, callback) {
        let map = null;

        async.each(this.maps, function(mapIterate, callback) {
            if(mapIterate.name === mapName)
                map = mapIterate;

            callback();
        }, function(err) {
            if(err) {
                console.log(err);
                callback(false);
            }
            else if(map !== null) {
                callback(map);
            }
            else {
                callback(false);
            }
        });
    }
}

module.exports = Maps;