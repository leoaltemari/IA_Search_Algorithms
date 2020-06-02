'uses strict'

class DFS {
    // Vetor que armazena pares ({linha, coluna}) de vertices ja vizitados
    visited = [];

    // Vetor que armazena o caminho gerado pelo algoritmo DFS
    path = [];

    /// Constructor ///
    constructor(_map, _source) {
        this.map = _map;
        this.source = _source;
        this.flag = 0;
    }

    /// Methods
    // Retorna o caminho gerado pela busca
    getPath() {
        return this.path;
    }

    // O metodo recursiveFind() eh a subrotina do metodo find() de forma recursiva
    // Percorre os vertices em uma 4-vizinhanca do grafo na ordem DIREITA, BAIXO, ESQUERTA, CIMA
    recursiveFind(_map, lin, col) {
        /// Casos bases da recursao ///
        // Checa vizinhos inexistentes
        if(lin < 0 || lin >= _map.dimension.lin) 
            return;
        if(col < 0 || col >= _map.dimension.col) 
            return;

        // Checa se o vertice atual nao eh um obstaculo
        let map = _map.fullMap;
        if(map[lin][col] == "-") 
            return;

        // Checa se encontrou o destino
        if(map[lin][col] == "$") {
            this.visited.push({lin, col});
            this.flag  = 1;
            return;
        }

        // Checa se a o vertice atual ja foi visitado
        for(let i = 0; i < this.visited.length; i++) {
            if(this.visited[i].lin == lin && this.visited[i].col == col)
                return;
        }

        // Se n atingir os casos bases guarda o vertice atual
        this.visited.push({lin, col}); 

        /// Recursoes, so sera feita se o destino nao for encontrado(flag != 1)
        if(this.flag != 1) {
            this.recursiveFind(_map, lin, col+1);    // Vizinho da DIREITA
        }
        if(this.flag  != 1) {
            this.recursiveFind(_map, lin+1, col);    // Vizinho de BAIXO
        }
        if(this.flag  != 1) {
            this.recursiveFind(_map, lin, col-1);    // Vizinho da ESQUERDA
        }
        if(this.flag  != 1) { 
            this.recursiveFind(_map, lin-1, col);    // Vizinho de CIMA
        }
    }

    // O metodo find() eh responsavel por percorrer os vertices do mapa em proufundidade
    find() {
        let map = this.map;
        let source = this.source;
        this.recursiveFind(map, source.lin, source.col);
        this.path = this.visited;
        return;
    }
}

module.exports.DFS = DFS;