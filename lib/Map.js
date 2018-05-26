let fs = require('fs');
let path = require('path');

class Map {
    constructor() {
        this.name = '';
        this.tileset = [];
        this.objects = [];
        this.scores = [];
    }

    load(directory, callback) {
        try {
            let mapFile = path.join(directory, 'map.json');
            let objectsFile = path.join(directory, 'objects.json');
            let scoresFile = path.join(directory, 'scores.json');
            let tilesetFile = path.join(directory, 'tileset.json');

            if(!fs.existsSync(mapFile))
                throw 'No map file.';

            let mapData = this.readJSONFile(mapFile);
            this.name = mapData.name;

            if(!fs.existsSync(objectsFile))
                throw 'No objects file.';

            this.objects = this.readJSONFile(objectsFile);

            if(!fs.existsSync(scoresFile))
                throw 'No scores file.';

            this.scores = this.readJSONFile(scoresFile);

            if(!fs.existsSync(tilesetFile))
                throw 'No tileset file.';

            this.tileset = this.readJSONFile(tilesetFile);

            callback(true);
        }
        catch(e) {
            console.log(e);
            callback(false);
        }
    }

    readJSONFile(filename) {
        let JSONString = fs.readFileSync(filename);

        return JSON.parse(JSONString);
    }

    setFakeData() {
        this.name = 'test';
    }

    getMap() {
        return {
            name: this.name,
            tileset: this.tileset,
            objects: this.objects,
        }
    }

    getScores() {
        return {
            scores: this.scores,
        }
    }
}

module.exports = Map;