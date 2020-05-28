'uses strict'

class DFS {
    visited = [];

    /// Constructor
    constructor(_map, _source, _dest) {
        this.map = _map;
        this.source = _source;
        this.dest = _dest;
        this.list = [];
        this.flag = 0;
    }

    /// Methods
    // Retorna o caminho gerado pela busca
    getPath() {
        return this.visited;
    }

    // O metodo recursiveFind() eh a subrotina do metodo find() de forma recursiva
    // Percorre os vertices em uma 4-vizinhanca do grafo na ordem DIREITA, BAIXO, ESQUERTA, CIMA
    recursiveFind(_map, lin, col, _dest) {
        /// Casos bases da recursao ///
        // Checa vizinhos inexistentes
        if(lin < 0 || lin >= _map.dimension.lin) 
            return;
        if(col < 0 || col >= _map.dimension.col) 
            return;

        // Checa se encontrou o destino
        if(lin == _dest.lin && col == _dest.col) {
            this.visited.push({lin, col});
            this.flag  = 1;
            return;
        }

        // Checa se o vertice atual nao eh um obstaculo
        let map = _map.fullMap;
        if(map[lin][col] == "-") 
            return;

        // Checa se a o vertice atual ja foi visitado
        for(let i = 0; i < this.visited.length; i++) {
            if(this.visited[i].lin == lin && this.visited[i].col == col)
                return;
        }

        this.visited.push({lin, col}); // Se n atingir os casos bases guarda o vertice atual

        /// Recursoes, so sera feita se o destino nao for encontrado(flag != 1)
        if(this.flag != 1) {
            this.recursiveFind(_map, lin, col+1, _dest);    // Vizinho da DIREITA
        }
        if(this.flag  != 1) {
            this.recursiveFind(_map, lin+1, col, _dest);    // Vizinho de BAIXO
        }
        if(this.flag  != 1) {
            this.recursiveFind(_map, lin, col-1, _dest);    // Vizinho da ESQUERDA
        }
        if(this.flag  != 1) { 
            this.recursiveFind(_map, lin-1, col, _dest);    // Vizinho de CIMA
        }
    }

    // O metodo find() eh responsavel por percorrer os vercices do mapa em proufundidade
    find() {
        let map = this.map;
        let source = this.source;
        let dest = this.dest;
        this.recursiveFind(map, source.lin, source.col, dest, this.flag);
        return;
    }
}

module.exports.DFS = DFS;