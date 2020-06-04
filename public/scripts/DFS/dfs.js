'uses strict'

class DFS {
    // Vetor que armazena pares ({ linha, coluna }) de vertices ja vizitados
    visited = [];

    // Lista que armazena os nos na ordem que serao visitados pelo DFS
    dfsList = [];

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

    /* 
        O metodo alreadyVisited() checa se o no passado por parametro atraves das 
        cordenadas ja foi vizitado. 
        Retorna true se ele ja foi visitado, caso contratio retorna false
    */
    alreadyVisited(lin, col) {
        for(let i = 0; i < this.visited.length; i++) {
            if(this.visited[i].lin == lin && this.visited[i].col == col)
                return true;
        }
        return false;
    }

    /*
        O metodo calcBestWay() eh responsavel por expandir todos os vertices daquele que eh passado
        por parametro atraves de suas coordenadas, seguindo a ordem de prioridade de direcao como:
            CIMA, ESQUERDA, BAIXO, DIREITA
    */
    calcBestWay(_lin, _col){
        if( (_lin-1 >= 0 && _lin-1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin-1][_col] != "-") && !this.alreadyVisited(_lin-1, _col)) {   
                this.dfsList.splice(0 , 0, { lin: _lin-1 , col: _col });
        }
        if( (_col-1 >= 0 && _col-1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col-1] != "-") && !this.alreadyVisited(_lin, _col-1)) {   
                this.dfsList.splice(0 , 0, { lin: _lin , col: _col-1 });
        }
        if( (_lin+1 >= 0 && _lin+1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin+1][_col] != "-") && !this.alreadyVisited(_lin+1, _col)) {   
                this.dfsList.splice(0 , 0, { lin: _lin+1 , col: _col });
        }
        if( (_col+1 >= 0 && _col+1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col+1] != "-") && !this.alreadyVisited(_lin, _col+1)) {   
                this.dfsList.splice(0 , 0, { lin: _lin , col: _col+1 });
        }
        
        
        return;
    }
    // O metodo recursiveFind() eh a subrotina do metodo find() de forma recursiva
    // Percorre os vertices em uma 4-vizinhanca do grafo na ordem DIREITA, BAIXO, ESQUERTA, CIMA
    recursiveFind(_map, lin, col) {
        /// Casos bases da recursao ///

        let map = _map.fullMap;
        // Checa se encontrou o destino
        if(map[lin][col] == "$") {
            this.visited.push({lin, col});
            this.flag  = 1;
            return;
        }

        // Se n atingir os casos bases guarda o vertice atual
        this.visited.push({lin:lin, col:col});

        // Expande todos os vertices filhos do vertice atual
        this.calcBestWay(lin, col);

        /// Recursoes, so sera feita se o destino nao for encontrado(flag != 1)
        if(this.flag != 1) {
            const newLin = this.dfsList[0].lin;
            const newCol = this.dfsList[0].col;
            
            this.dfsList.splice(0, 1);
            this.recursiveFind(_map, newLin, newCol);
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