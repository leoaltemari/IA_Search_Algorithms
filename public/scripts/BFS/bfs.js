'uses strict'

class BFS {
    /// Attributes ///
    // Vetor para guardar vertices ja visitados
    visited = [];

    // Vetor para guardar objetos { pai, filhos[] } de vertices ja visitados
    parentChildList = [];

    // Vetor que guarda pares { linha, coluna } do caminho gerado pela BFS
    path = [];

    // Lista da bfs guarda os vertices que serao visitados na ordem, ate encontrar o destino
    bfsList = [];

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

    // Metodo que checa se um vertice ja esta contido na lista da BFS, para nao repetir
    // vertices e ficar em uma recursao infinita
    alreadyVisitedBfsList(_lin, _col) {
        for(let i = 0; i < this.bfsList.length; i++) {
            if(this.bfsList[i].lin == _lin && this.bfsList[i].col == _col)
                return true;
        }
        return false;
    }

    // Metodo para checar se o vertice passado por parametro(lin, col) ja nao foi visitado antes
    // Para tambem nao gerar recursao infinita
    alreadyVisited(_lin, _col) {
        for(let i = 0; i < this.visited.length; i++) {
            if(this.visited[i].lin == _lin && this.visited[i].col == _col)
                return true;
        }
        return false;
    }

    // O metodo storeChildren() eh responsavel por armazenar no vetor parentChildList[]
    // o pai, que eh passado por parametro, e todos os seus filhos(somente aqueles que nao sejam obstaculos).
    // Fica guardado no vetor na forma de objeto { pai, childrens[] }
    storeChildren(_lin, _col) {
        let obj = {
            pai: [],
            childrens: [],
        };
        // Guarda o pai
        obj.pai.lin = _lin;
        obj.pai.col = _col;

        // Checa se o pai ainda nao esta na lista do BFS(lista vazia)
        if(!this.bfsList) {
            this.bfsList.push({_lin, _col});
        }

        // Armazena filho da DIREITA se ele for um vertice que nao seja um obstaculo
        if((_col+1 >= 0 && _col+1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col+1] != "-") && (!this.alreadyVisited(_lin, _col+1))) {
                let lin = _lin, col = _col+1;
                obj.childrens.push({lin, col});
                // Se esse filho ainda nao foi armazenado na lista de BFS ele eh adicionado
                if(!this.alreadyVisitedBfsList(lin, col)) {
                    this.bfsList.push({lin, col});
                }
        }
        // Armazena filho de BAIXO se ele for um vertice que nao seja um obstaculo
        if((_lin+1 >= 0 && _lin+1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin+1][_col] != "-") && (!this.alreadyVisited(_lin+1, _col))) {
                let lin = _lin+1, col = _col;
                obj.childrens.push({lin, col});
                
                // Se esse filho ainda nao foi armazenado na lista de BFS ele eh adicionado
                if(!this.alreadyVisitedBfsList(lin, col)) {
                    this.bfsList.push({lin, col});
                }
        }
        // Armazena filho da ESQUERDA se ele for um vertice que nao seja um obstaculo
        if((_col-1 >= 0 && _col-1 < this.map.dimension.col) && 
            (this.map.fullMap[_lin][_col-1] != "-") && (!this.alreadyVisited(_lin, _col-1))) {
                let lin = _lin, col = _col-1;
                obj.childrens.push({lin, col});

                // Se esse filho ainda nao foi armazenado na lista de BFS ele eh adicionado
                if(!this.alreadyVisitedBfsList(lin, col)) {
                    this.bfsList.push({lin, col});
                }
        }
        // Armazena filho de CIMA se ele for um vertice que nao seja um obstaculo
        if((_lin-1 >= 0 && _lin-1 < this.map.dimension.lin) && 
            (this.map.fullMap[_lin-1][_col] != "-" && !this.alreadyVisited(_lin-1, _col))) {
                let lin = _lin-1, col = _col;
                obj.childrens.push({lin, col});

                // Se esse filho ainda nao foi armazenado na lista de BFS ele eh adicionado
                if(!this.alreadyVisitedBfsList(lin, col)) {
                    this.bfsList.push({lin, col});
                }
        }

        // Guardada o objeto { pai, childrens[] } na lista
        this.parentChildList.push(obj);    
    }

    // O metodo recursiveFind() eh a subrotina do metodo find() de forma recursiva
    // Percorre os vertices em uma 4-vizinhanca do grafo na ordem DIREITA, BAIXO, ESQUERTA, CIMA
    recursiveFind(_map, lin, col) {
        /// Casos bases da recursao ///
        // Encontrou o DESTINO
        let map = this.map.fullMap;
        if(map[lin][col] == "$"){
            this.flag = 1;
            // Adiciona o destino na lista
            let obj = {
                pai: {lin: lin, col: col},
            };
            this.parentChildList.push(obj)
            return;
        }
        
        // Só ira para o proximo item da lista do BFS se ainda nao tiver encontrado o destino
        if(this.flag != 1) {
            // Guarda o vertice atual e seus filhos
            this.storeChildren(lin, col);

            // Guarda o vertice atual na list de vertices ja visitados para ele nao ser visitado novamente
            this.visited.push({lin, col});

            /// Recursoes, ira' para o proximo vertice da bfsList[]
            // Remove o no Pai da lista
            this.bfsList.splice(0, 1);

            // Vai para o proximo da lista
            let newLin = this.bfsList[0].lin;
            let newCol = this.bfsList[0].col;

            this.recursiveFind(_map, newLin, newCol); 
        }
    }

    // O metodo reverseVector eh responsavel por inverter a ordem de um vetor
    // Ex.: dato um vetor {3, 5 , 1} o metodo transforma ele em um vetor {1, 5, 3}
    // Ele eh utilizado pois o path gerado pelo algoritmo eh armazenado de tras para frente
    // Do destino(quando encontrado) para origem
    reverseVector() {
        let auxVector = [];
        let vector = this.path;
        for(let i = vector.length-1; i >= 0; i--) {
            auxVector.push({lin: vector[i].lin, col: vector[i].col});
        }
        this.path = auxVector;
    }

    /*
        O metodo makePath() eh responsavel por pegar o vetor parentChild[] e montar o path.
        A ultima posicao do vetor contem o destino encontrado, com isso eh percorrido o vetor
        de tras para frente buscando esse pai nos filhos dos demais vertices, quando ele eh encontrado
        o pai passa a ser o pai do vertice encontrado, e continua percorrendo de tras pra fente buscando. 
    */
    makePath() {
        // console.log(this.visited.length);
        // vector = vetor parentChild
        const vector = this.parentChildList;
        let end = vector.length-1;
        let parent = vector[end].pai;
        
        // Ultima posicao de vector eh o destino entao ele ja entra no path
        this.path.push(parent);
        
        // O for externo percore o vetor de tras pra frente, basicamente ele percorre todos os vertices 'pais'
        // que foram visitados pelo algoritmo do BFS. O for interno percorre os filhos de cada pai, buscando pelo
        // Vertice armazenado em 'parent'. Quando eh achado o parent vira o pai de onde foi encontrado
        for(let i = end-1; i >= 0; i--) {
            for(let j = 0; j < vector[i].childrens.length; j++) {   
                if(vector[i].childrens[j].lin == parent.lin &&
                    vector[i].childrens[j].col == parent.col) {
                    this.path.push(vector[i].pai);
                    parent = vector[i].pai;
                }
            }
        }

        // Inverte o vetor pois ele foi gerado do destino para a origem e nao da origem para o destino
        this.reverseVector();
    }

    // O metodo find() eh responsavel por percorrer os vercices do mapa em largura
    find() {
        let map = this.map;
        let source = this.source;

        // Busca em largura
        this.recursiveFind(map, source.lin, source.col);

        // Montagem do caminho a partir da busca
        this.makePath();
        return;
    }
}

module.exports.BFS = BFS;