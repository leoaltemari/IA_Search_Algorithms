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

    // Constructor - se quiser podem ignorar isso, n precisa entender
    constructor (_map) {
        let lin, col;
        lin = parseInt(_map.slice(0, 2));
        col = parseInt(_map.slice(3, 5));

        this.dimension.lin = lin;
        this.dimension.col = col;

        let str;
        let fullMapAux = [];
        let beg, end;
        if(lin == 29) {
            beg = 7;
            end = 7+col
        } else {
            beg = 7;
            end = 5+col
        }

        // Transforma o mapa em uma matriz
        for(let i  = 0; i < lin; i++) {
            str = _map.slice(beg, end);
            fullMapAux.push(str);
            if(lin == 29) {
                beg = beg + col+2;
                end = end + col+2;
            } else {
                beg = beg + col;
                end = end + col;
            }
        }
        this.fullMap = fullMapAux;

        // Pega as posicoes de origem e do destino
        for(let i = 0; i < fullMapAux.length; i++) {
            // Origem
            let srcCol = fullMapAux[i].indexOf("#");
            if(srcCol != -1) {
                this.sourcePos.lin = i;
                this.sourcePos.col = srcCol;
            }

            // Destino
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
    getDimension() {
        return this.dimension;
    }

    // Intern Methods
    
};

module.exports.Map = Map;