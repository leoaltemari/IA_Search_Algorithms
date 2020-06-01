'uses strict'

class AStar {
    /// Attributes ////
    aStarList = [];     // Lista que armazena todos os vertices nao visitados na arvore
    path = [];          // Lista do caminho encontrado pela A*
    visited = [];       // Lista que armazena vertices ja visitados para nao cair em recursao infinita

    /// Construtor ///
    constructor(_map, _source, _dest) {
        this.map = _map;    
        this.sourcePos = _source;
        this.destPos = _dest;
        this.flag = 0;
    }

    /// Methods ///
    // O metodo getPath() retorna o caminho gerado pelo algoritmo A*
    getPath() {
        return this.path;
    }

    // O metodo reverseVector eh responsavel por inverter a ordem de um vetor
    // Ex.: dato um vetor {3, 5 , 1} o metodo transforma ele em um vetor {1, 5, 3}
    // Ele eh utilizado pois o path gerado pelo algoritmo eh armazenado de tras para frente:
    // Do destino(quando encontrado) para origem.
    reverseVector() {
        let auxVector = [];
        let vector = this.path;
        for(let i = vector.length-1; i >= 0; i--) {
            auxVector.push({lin: vector[i].lin, col: vector[i].col});
        }
        this.path = auxVector;
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
        O metodo alreadyVisited() checa se o no passado por parametro atraves das 
        cordenadas ja foi vizitado. 
        Retorna true se ele ja foi visitado, caso contratio retorna false
    */
    alreadyVisited(lin, col) {
        for(let i = 0; i < this.visited.length; i++) {
            if(this.visited[i].info.lin == lin && this.visited[i].info.col == col)
                return true;
        }
        return false;
    }

    /*
        O metodo makePath() eh responsavel por pegar o vetor visited[] e montar o path.
        A ultima posicao do vetor contem o destino encontrado, com isso eh percorrido o vetor
        de tras para frente buscando esse pai nos filhos dos demais vertices, quando ele eh encontrado
        o pai passa a ser o pai do vertice encontrado, e continua percorrendo de tras pra fente buscando. 
    */
   makePath() {
    const vector = this.visited;
    let end = vector.length-1;
    let parent = vector[end].pai;
    
    // Ultima posicao de vector eh o destino entao ele ja entra no path
    this.path.push(vector[end].info);
    
    // O for a seguir percore o vetor de tras pra frente, basicamente ele percorre 
    // todos os vertices 'pais' que foram visitados pelo algoritmo do A*, quando 
    // encontra o filho, o pai deste filho vira o 'parent' e continua buscando por parent.
    // Resumidamente ele realiza o backtracking do destino para origem, passando sempre no
    // vertice pai daquele que esta sendo buscado
    for(let i = end; i >= 0; i--) {
        if(vector[i].info.lin == parent.lin &&
            vector[i].info.col == parent.col) {
            this.path.push(vector[i].info);
            parent = vector[i].pai;
        }
    }

    // Insere a origem no path, já que ela eh nenhum vertice possui ela como filho
    this.path.push(vector[0].pai);

    // Inverte o vetor pois ele foi gerado do destino para a origem e nao da origem para o destino
    this.reverseVector();
}

    /*
        O metodo calcBestWay() eh responsavel por checar a funcao de avaliacao de todos os no's filhos
        daquele no' que eh passado por parametro atraves de suas cordenadas. A funcao
        de avaliacao e' calculado atraves da formula f(n) = g(n) + h(n) onde g(n) eh a distancia
        percorrida ate entao no vertice e h(n) eh a distancia euclidiana do no filho ate o 
        destino da busca. Pois entao armazena em aStarList[] tanto o vertice pai quanto seus filhos
        e a funcao de avaliacao para cada um dos filhos no  formato:
        {
         filho: {linha, coluna}, --> vertice filho
         pai: {linha, coluna},  --> pai do vertice filho
         fn: fn, --> funcao de avaliacao f(n) = g(n) + h(n)
         walked: walked --> distancia percorrida ate agr(g(n))
        }
    */
    calcBestWay(_lin, _col, _walked) {
        // Variaveis de controle
        let fn; // funcao de avaliacao f(n)
        let valorHeuristico; // h(n) : Armazena a distancia do vertice filho para o destino

        _walked += 1;
        // Os if's a seguir sempre checam se o existe um filho na direcao desejada(DIREITA, BAIXO, ESQUERDA, CIMA)
        // e tambem se esse filho nao eh um obstaculo
        // Filho da DIREITA
        if( (_col+1 >= 0 && _col+1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col+1] != "-") && !this.alreadyVisited(_lin, _col+1)) {
                // Calcula o valor heuristico do no' filho
                valorHeuristico = this.calcDestDistance(_lin, _col+1);
                
                // f(n) = g(n) + h(n)
                fn = _walked + valorHeuristico;

                this.aStarList.push({info: {lin:_lin, col:_col+1}, pai: {lin:_lin, col:_col}, fn: fn, walked: _walked}); 
        }
        // Filho de BAIXO
        if( (_lin+1 >= 0 && _lin+1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin+1][_col] != "-") && !this.alreadyVisited(_lin+1, _col)) {
               // Calcula o valor heuristico do no' filho
               valorHeuristico = this.calcDestDistance(_lin+1, _col);
                
               // f(n) = g(n) + h(n)
               fn = _walked + valorHeuristico;

               this.aStarList.push({info: {lin:_lin+1, col:_col}, pai: {lin:_lin, col:_col}, fn: fn, walked: _walked}); 
        }
        // Filho da ESQUERDA
        if( (_col-1 >= 0 && _col-1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col-1] != "-") && !this.alreadyVisited(_lin, _col-1)) {
                // Calcula o valor heuristico do no' filho
                valorHeuristico = this.calcDestDistance(_lin, _col-1);
                
                // f(n) = g(n) + h(n)
                fn = _walked + valorHeuristico;

                this.aStarList.push({info: {lin:_lin, col:_col-1}, pai: {lin:_lin, col:_col}, fn: fn, walked: _walked}); 
        }
        // Filho de CIMA
        if( (_lin-1 >= 0 && _lin-1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin-1][_col] != "-") && !this.alreadyVisited(_lin-1, _col)) {
                // Calcula o valor heuristico do no' filho
                valorHeuristico = this.calcDestDistance(_lin-1, _col);
                
                // f(n) = g(n) + h(n)
                fn = _walked + valorHeuristico;

                this.aStarList.push({info: {lin:_lin-1, col:_col}, pai: {lin:_lin, col:_col}, fn: fn, walked: _walked}); 
        }
        
        return;
    }

    /*
        O metodo menorFn() percorre o vetor aStarLint[], que eh aquele que armazena os vertices ainda
        nao visitados pelo algoritmo A*, buscando pelo vertice com menor f(n), aquele que tiver menor
        f(n) eh retornado e removido da lista aStarList[] ja que ele nao pode ser considerado nas proximas
        vezes que este metodo for chamado. 
    */
    menorFn() {
        // Lista de vertices ainda nao visitados
        let aStar = this.aStarList;
        // Objeto para ser retornado
        let obj;

        let removePos;  // Variavel para saber que vertice remover da lista aStarList[]

        for(let i = 0; i < this.aStarList.length; i++) {
            // Compara o f(n) do vertice em i com o vertice que ja possui o menor f(n)
            if(!obj || aStar[i].fn < obj.fn) {
                // Se for um f(n) menor realiza a troca de valores
                obj = aStar[i];
                
                // Armazena a posicao desse vertice que sera removido da lista
                removePos = i;
            }
        }
        
        // Remove o vertice da lista 
        this.aStarList.splice(removePos, 1);

        // Retorna o vertice na forma de objeto {pai: {}, filho: {}, fn, walked } 
        return obj;
    }

    /*
        O metodo recursiveFind() eh a subrotina do metodo find() de forma recursiva, ele
        eh responsavel por checar se o vertice atual que ele se encontra nao eh um obstaculo
        e tambem se nao eh o destino, se for o destino ele finaliza a recursao, caso contrario 
        ele continua sempre armazenando em aStarList[] os vertices ainda nao visitados da arvore
    */
    recursiveFind(_map, lin, col, walked) {
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

        // Checa se o vertice atual eh o DESTINO
        if(map[lin][col] == "$"){
            this.flag = 1;
            return;
        }

        /// Se nao retornar em nenhum caso base da recursao: 
        // Busca pelo vertice filho com menor valor heuristico
        this.calcBestWay(lin, col, walked);
       
        // Recursao - vai ocorrer somente se o destino ainda nao foi encontrado(flag != 1)
        if(this.flag != 1) {
            // Busca pelo menor f(n) dos vertices ainda nao visitados da arvore
            let menorFn = this.menorFn();

            // Armazena as coordenadas do vertice que possui menor f(n)
            let newLin = menorFn.info.lin;
            let newCol = menorFn.info.col;
            let walked = menorFn.walked;

            // Adiciona o vertice com menor f(n) a lista de vertices ja visitados
            this.visited.push(menorFn);

            // Vai para o vertice com menor f(n)
            this.recursiveFind(_map, newLin, newCol, walked);
        }
    }

    /*
        O metodo find() eh responsavel por chamar a recursao passando como parametro
        o vertice que deve ser iniciado a busca(surceLin, sourceCol) e a distancia que
        ira' comecar a percorrer(nosso g(n)), no caso, como estamos no inicio, ela eh zero
    */ 
    find() {
        // Faz um get nas informacoes que ele precisa
        let map = this.map;
        let sourceLin = this.sourcePos.lin;
        let sourceCol = this.sourcePos.col;

        // Monta a lista de vertices visitados pelo A*
        this.recursiveFind(map, sourceLin, sourceCol, 0);
        // Monta o caminho da origem ate o destino
        this.makePath();
    }
}

module.exports.AStar = AStar;