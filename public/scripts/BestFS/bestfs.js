'uses strict'

class BestFS {
    /// Attributes ////
    bestFSList = [];    // Lista que armazena o proximo no a ser percorrido pela Best-First Search
    path = [];          // Lista do caminho encontrado pela Best-First Search(se o ultimo valor de path for
                        // lin = -1 e col = -1 significa que ele encontrou um caminho infinoto e nao ira sair dele)
    visited = [];       // Lista que armazena no's ja visitados para nao cair em recursao infinita

    /// Construtor ///
    constructor(_map, _source, _dest) {
        this.map = _map;    
        this.sourcePos = _source;
        this.destPos = _dest;
        this.flag = 0;
    }

    /// Methods ///
    getPath() {
        return this.path;
    }

    // O metodo calcDestDistance() calcula a distancia euclidiana entre 
    // dois pontos(p1 e p1), sendo p1 = (_lin, _col) e p2 = (dest.lin, dest.col)
    // Dist = sqrt((x2-x1)² + (y2-y1)²)
    calcDestDistance(_lin, _col) {
        let destLin = this.destPos.lin;
        let destCol = this.destPos.col;

        let dif1 = destLin - _lin;
        let dif2 = destCol - _col;

        dif1 = Math.pow(dif1, 2);
        dif2 = Math.pow(dif2, 2);

        let result = Math.sqrt(dif1 + dif2);
        return result;
    }
    
    /* 
        O metodo alreadyVisited() checa se o no passdo por parametro atraves das 
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
        O metodo calcBestWay() eh responsavel por checar o valor heuristico de todos os no's filhos
        do no' passado por parametro atraves de suas cordenadas. O valor euristico h(n) e' calculado
        a partir da distancia euclidiana entre esse no filho e o objetivo(destino). Aquele que possuir
        menor valor heuristico sera adiconado a lista bestFSList[] e o pai sera removido dessa lista. 
    */
    calcBestWay(_lin, _col) {
        // Variaveis de controle
        let menorValHeuristico = 0;
        let menorLin = -1, menorCol = -1; // Armazenam as cordenadas do filho com menor valor heuristico

        let valorHeuristico; // Armazena a distancia do no filho para o destino

        // Os if's a seguir sempre checam se o existe um filho na direcao desejada(DIREITA, BAIXO, ESQUERDA, CIMA)
        // e tambem se esse filho nao eh um obstaculo
        // Filho da DIREITA
        if( (_col+1 >= 0 && _col+1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col+1] != "-") && !this.alreadyVisited(_lin, _col+1)) {
                // Calcula o valor heuristico do no' filho
                valorHeuristico = this.calcDestDistance(_lin, _col+1);

                // Checa se eh o menor valor dentre os demais filhos
                if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                    menorValHeuristico = valorHeuristico;
                    menorLin = _lin;
                    menorCol = _col+1;
                } 
        }
        // Filho de BAIXO
        if( (_lin+1 >= 0 && _lin+1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin+1][_col] != "-") && !this.alreadyVisited(_lin+1, _col)) {
                // Calcula o valor heuristico do no' filho
                valorHeuristico = this.calcDestDistance(_lin+1, _col);

                // Checa se eh o menor valor dentre os demais filhos
                if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                    menorValHeuristico = valorHeuristico;
                    menorLin = _lin+1;
                    menorCol = _col;
                } 
        }
        // Filho da ESQUERDA
        if( (_col-1 >= 0 && _col-1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col-1] != "-") && !this.alreadyVisited(_lin, _col-1)) {
                // Calcula o valor heuristico do no' filho
                valorHeuristico = this.calcDestDistance(_lin, _col-1);

                // Checa se eh o menor valor dentre os demais filhos
                if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                    menorValHeuristico = valorHeuristico;
                    menorLin = _lin;
                    menorCol = _col-1;
                } 
        }
        // Filho de CIMA
        if( (_lin-1 >= 0 && _lin-1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin-1][_col] != "-") && !this.alreadyVisited(_lin-1, _col)) {
                // Calcula o valor heuristico do no' filho
                valorHeuristico = this.calcDestDistance(_lin-1, _col);

                // Checa se eh o menor valor dentre os demais filhos
                if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                    menorValHeuristico = valorHeuristico;
                    menorLin = _lin-1;
                    menorCol = _col;
                } 
        }
        
        // Remove o pai da lista
        if(this.bestFSList.length > 0) {
            this.bestFSList.splice(0, 1);
        }

        // Adiciona o filho com menor valor heuristico
        this.bestFSList.push({menorLin, menorCol});

        // Adiciona o no filho no caminho gerado
        this.path.push({lin: menorLin, col: menorCol});
        return;
    }

    recursiveFind(_map, lin, col) {
        /// Casos bases da recursao ///
        // Se ele receber linha e coluna como -1 significa que ele ira entrar em loop
        // em um determinado caminho, por isso ele interrompe a trejetoria
        if(lin == -1 && col == -1) {
            return;
        }
    
        // checa se o vertice atual eh o DESTINO
        let map = this.map.fullMap;
        if(map[lin][col] == "$"){
            this.flag = 1;
            return;
        }

        /// Se nao retornar em nenhum caso base da recursao: 
        // Adiciona o vertice atual como vertice ja visitado
        this.visited.push({lin, col});

        // Busca pelo vertice filho com menor valor heuristico
        this.calcBestWay(lin, col);
       
        // Recursao - vai ocorrer somente se o destino ainda nao foi encontrado(flag != 1)
        if(this.flag != 1) {
            // Continua a recursao no no filho que possui a menor h(n)
            const newLin = this.bestFSList[0].menorLin; // Linha do filho com menor h(n)
            const newCol = this.bestFSList[0].menorCol; // Coluna do filho com menor h(n)

            // Vai para o vertice com menor h(n)
            this.recursiveFind(_map, newLin, newCol);
        }
    }

    /*
        O metodo find() eh responsavel por chamar a recursao passando como parametro
        o vertice que deve ser iniciado a busca(surceLin, sourceCol)
    */ 
    find() {
        let map = this.map;
        let sourceLin = this.sourcePos.lin;
        let sourceCol = this.sourcePos.col;

        this.path.push({lin: sourceLin, col: sourceCol});
        this.recursiveFind(map, sourceLin, sourceCol);
    }
}

module.exports.BestFS = BestFS;