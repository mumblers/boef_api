class Map {
    constructor() {
        this.name = '';
        this.tileset = [];
        this.objects = {
            cameras: [],
            microphones: [],
            motionDetectors: [],
        };
        this.scores = [];
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