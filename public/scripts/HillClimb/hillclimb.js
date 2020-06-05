'uses strict'

class HillClimb {
    // Attributes
    visited = [];   // Lista que armazena aqueles vertices ja visitados, para quando
                    // for escolher um vizinho, nao escolha um vertice pai.
    
    path = [];      // Lista que armazena o caminho percorrido pelo algoritmo

    performance = 0;

     /// Construtor ///
     constructor(_map, _source, _dest) {
        this.map = _map;    
        this.sourcePos = _source;
        this.destPos = _dest;
        this.flag = 0;
    } 

    /// Methods ///
    // O metodo getPath() retorna o caminho gerado pelo algoritmo HillClimb
    getPath() {
        return this.path;
    }

    getPerformance () {
        return this.performance;
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

        let distance = Math.sqrt(dif1 + dif2);
        return distance;
    }

    /* 
        O metodo alreadyVisited() checa se o vertice passado por parametro atraves das 
        cordenadas ja foi vizitado. 
        Retorna true se ele ja foi visitado, caso contratio retorna false
        Esse metodo eh utilizado para nao cair em recursao infinita, no caso,
        nao retornar para um vertice PAI estando e um vertice FILHO
    */
    alreadyVisited(lin, col) {
        for(let i = 0; i < this.visited.length; i++) {
            if(this.visited[i].lin == lin && this.visited[i].col == col)
                return true;
        }
        return false;
    }

    /*
        O metodo calcBestWay() checa todos os vizinhos do vertice passado por parametro
        atraves das coordenadas, retornando aquele que possui um valor heuristico menor que
        os demais vizinhos. Ele tambem checa se esse valor heuristico eh menor que o valor heuristico
        do vertice atual. Se nao for, retorna as coordenadas como -1 (lin: -1, col: -1).
    */
    calcBestWay(_lin, _col) {
        // Variaveis de controle
        let menorValHeuristico = 0; // Armazena o menor valor heuristico entre os vizinhos
        let menorLin = -1, menorCol = -1; // Armazenam as cordenadas do filho com menor valor heuristico

        let valorHeuristico; // Armazena a distancia do vertice filho para o destino

        // Valor heuristico do vertice atual(aquele que eh passado por parametro)
        let valorHeuristicoAtual = this.calcDestDistance(_lin, _col);

        // Os if's a seguir sempre checam se o existe um filho na direcao desejada(DIREITA, BAIXO, ESQUERDA, CIMA)
        // e tambem se esse filho nao eh um obstaculo

        // Filho da DIREITA
        if( (_col+1 >= 0 && _col+1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col+1] != "-") && !this.alreadyVisited(_lin, _col+1)) {
                // Calcula o valor heuristico do vertice filho
                valorHeuristico = this.calcDestDistance(_lin, _col+1);

                // Checa se o valor do filho eh menor que o valor do vertice atual
                if(valorHeuristico < valorHeuristicoAtual) {
                    // Checa se eh o menor valor dentre os demais filhos
                    if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                        menorValHeuristico = valorHeuristico;
                        menorLin = _lin;
                        menorCol = _col+1;
                    } 
                }
        }
        // Filho de BAIXO
        if( (_lin+1 >= 0 && _lin+1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin+1][_col] != "-") && !this.alreadyVisited(_lin+1, _col)) {
                // Calcula o valor heuristico do vertice filho
                valorHeuristico = this.calcDestDistance(_lin+1, _col);

                // Checa se o valor do filho eh menor que o valor do vertice atual
                if(valorHeuristico < valorHeuristicoAtual) {
                    // Checa se eh o menor valor dentre os demais filhos
                    if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                        menorValHeuristico = valorHeuristico;
                        menorLin = _lin+1;
                        menorCol = _col;
                    } 
                }
        }
        // Filho da ESQUERDA
        if( (_col-1 >= 0 && _col-1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col-1] != "-") && !this.alreadyVisited(_lin, _col-1)) {
                // Calcula o valor heuristico do vertice filho
                valorHeuristico = this.calcDestDistance(_lin, _col-1);

                // Checa se o valor do filho eh menor que o valor do vertice atual
                if(valorHeuristico < valorHeuristicoAtual) {
                    // Checa se eh o menor valor dentre os demais filhos
                    if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                        menorValHeuristico = valorHeuristico;
                        menorLin = _lin;
                        menorCol = _col-1;
                    }
                }
        }
        // Filho de CIMA
        if( (_lin-1 >= 0 && _lin-1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin-1][_col] != "-") && !this.alreadyVisited(_lin-1, _col)) {
                // Calcula o valor heuristico do vertice filho
                valorHeuristico = this.calcDestDistance(_lin-1, _col);

                // Checa se o valor do filho eh menor que o valor do vertice atual
                if(valorHeuristico < valorHeuristicoAtual) {
                    // Checa se eh o menor valor dentre os demais filhos
                    if(menorValHeuristico == 0 || valorHeuristico < menorValHeuristico) {
                        menorValHeuristico = valorHeuristico;
                        menorLin = _lin-1;
                        menorCol = _col;
                    } 
                }
        }

        // Retorna as coordenadas do vizinho com menor valor heuristico em relacao ao vertice atual
        // Se n encontrar um com valor menor que o atual retorna (lim: -1, col: -1).
        return {
            lin: menorLin,
            col: menorCol,
        }
    }

    recursiveFind(_map, lin, col) {
        // Checa se o vertice atual eh o DESTINO
        let map  = this.map.fullMap;
        if(map[lin][col] == "$"){
            this.flag = 1;
        }

        // Adiciona o vertice atual na lista de vertices ja visitados
        this.visited.push({lin: lin, col: col});
       
        // Recursao - vai ocorrer somente se o destino ainda nao foi encontrado(flag != 1)
        if(this.flag != 1) {
            // Busca pelo primeiro vertice filho com menor valor heuristico que o valor heuristico do
            // vertice atual
            let obj = this.calcBestWay(lin, col);

            // Pega as novas coordenadas.
            let newLin = obj.lin;
            let newCol = obj.col;
            
            // Se for um vertice valido, continua a recursao, senao finaliza a busca
            if(newLin != -1 && newCol != -1) {
                this.recursiveFind(_map, newLin, newCol);
            }
            // Objetivo nao encontrado(encontrou um Maximo LOCAL) 
            else {
                this.visited.push({lin: -1, col: -1});
            }
        }
    }

    /*
        O metodo find() eh responsavel por chamar a recursao passando como parametro
        o vertice que deve ser iniciado a busca(surceLin, sourceCol). 
        O Caminho gerado eh armazenado em path[]. Caso o ultimo vertice de path
        possui as coordenadas igual a -1 (lin: -1, col: -1) significa que nao foi
        encontrado um caminho, pois um maximo LOCAL existe entre a origem e o destino. 
        As coordenadas do vertice de maximo local ficam armazenadas na penultima
        posicao de path[]. 
    */ 
    find() {    
        let inicio = new Date().getMilliseconds();
        // Faz um get nas informacoes que ele precisa
        let map = this.map;
        let sourceLin = this.sourcePos.lin;
        let sourceCol = this.sourcePos.col;

        // Monta a lista de vertices visitados pelo Hillclimb
        this.recursiveFind(map, sourceLin, sourceCol);
        // Cria o path
        this.path = this.visited;

        let fim = new Date().getMilliseconds();
        this.performance = fim - inicio;
    }
}

module.exports.HillClimb = HillClimb;