let fs = require('fs');
let path = require('path');

class Map {
    constructor() {
        this.directory = '';

        this.name = '';
        this.width = 0;
        this.height = 0;
        this.scale = 0;
        this.startX = 0;
        this.startY = 0;
        this.tileset = [];
        this.objects = [];
        this.scores = [];
    }

    load(directory, callback) {
        try {
            this.directory = directory;

            let mapFile = path.join(directory, 'map.json');
            let objectsFile = path.join(directory, 'objects.json');
            let scoresFile = path.join(directory, 'scores.json');
            let tilesetFile = path.join(directory, 'tileset.json');

            if(!fs.existsSync(mapFile))
                throw 'No map file.';

            let mapData = this.readJSONFile(mapFile);
            this.name = mapData.name;
            this.width = mapData.width;
            this.height = mapData.height;
            this.scale = mapData.scale;
            this.startX = mapData.startX;
            this.startY = mapData.startY;

            if(!fs.existsSync(objectsFile))
                throw 'No objects file.';

            this.objects = this.readJSONFile(objectsFile);

            if(!fs.existsSync(tilesetFile))
                throw 'No tileset file.';

            this.tileset = this.readJSONFile(tilesetFile);

            if(fs.existsSync(scoresFile))
                this.scores = this.readJSONFile(scoresFile);

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
            width: this.width,
            height: this.height,
            scale: this.scale,
            startX: this.startX,
            startY: this.startY,
            tileset: this.tileset,
            objects: this.objects,
        }
    }

    getScores() {
        return {
            scores: this.scores,
        }
    }

    saveScore(score) {
        score.datetime = new Date().toISOString();

        this.scores.push(score);
        fs.writeFileSync(path.join(this.directory, 'scores.json'), JSON.stringify(this.scores));
    }
}

module.exports = Map;