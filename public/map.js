'uses strict'
class Map {
    fullMap;
    sourcePos;
    destPos;

    getSourcePos() {
        return this.sourcePosPos;
    }
    getDestPos() {
        return this.destPos;
    }
    setSourcePos(_srcPos) {
        this.sourcePos = _srcPos;
    }
    setDestPos(_destPos) {
       this.destPos = _destPos;
    }
};

module.exports.Map = Map;