let Map = require('./Map');
let async = require('async');

class Maps {
    constructor() {
        this.maps = [];
    }

    setFakeData() {
        let map = new Map();
        map.setFakeData();
        this.maps.push(map);
    }

    getMaps(callback) {
        callback(this.maps);
    }

    getMapByName(mapName, callback) {
        let map = null;

        async.each(this.maps, function(mapIterate, callback) {
            if(mapIterate.name === mapName)
                map = mapIterate;
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
        })
    }
}

module.exports = Maps;