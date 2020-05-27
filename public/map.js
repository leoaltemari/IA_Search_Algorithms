'uses strict'
class Position {
    lin;
    col;
}
class Map {
    // Attributes
    fullMap;
    sourcePos = new Position();
    destPos = new Position();
    dimension = new Position();

    constructor (_map) {
        let lin, col;
        lin = parseInt(_map.slice(0, 2));
        col = parseInt(_map.slice(3, 5));

        this.dimension.lin = lin;
        this.dimension.col = col;

        let str;
        let fullMapAux = [];
        let beg = 7, end = 7+col;
        for(let i  = 0; i < lin; i++) {
            str = _map.slice(beg, end);
            fullMapAux.push(str);
            beg = beg + col+2;
            end = end + col+2;
        }
        this.fullMap = fullMapAux;

        for(let i = 0; i < fullMapAux.length; i++) {
            let srcCol = fullMapAux[i].indexOf("#");
            if(srcCol != -1) {
                this.sourcePos.lin = i;
                this.sourcePos.col = srcCol;
            }
            let destCol = fullMapAux[i].indexOf("$");
            if(destCol != -1) {
                this.destPos.lin = i;
                this.destPos.col = destCol;
            }
        }
    }

    // Methods
        // Getters
    getFullMap() {
        return this.fullMap;
    }
    getSourcePos() {
        return this.sourcePos;
    }

    getDestPos() {
        return this.destPos;
    }
    
};

module.exports.Map = Map;