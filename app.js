/* 
Nome:   Leonardo Altemari Nogueira - 10284883
        Tiago Pomepeu
        Carlos Martins
*/

// Configuring the server - nao mexer nisso
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
 

// Funcao para abrir o arquivo do mapa, retorna uma string com o mapa e suas dimensoes
function openFile() {
    try {
        var m = fs.readFileSync('./public/map.txt', 'utf8');   
    } catch(e) {
        console.log('Error oppening the file:', e.stack);
    }
    return m;
}

// Classes
var mapClass = require('./public/map');

var file = openFile();
const map = new mapClass.Map(file);   // Objeto que contem o mapa e seus metodos

/* 
    Para acessar posições do mapa use map.fullMap[linha][coluna]
    Para acessar as dimensoes do mapa use map.getDimension()
        Linha
        map.getDimension().lin;
        Coluna
        map.getDimension().col;

    Para acessar a posicao da origem use:
        Linha
        map.getSourcePos().lin;
        Coluna
        map.getSourcePos().col;

    Para acessar a posicao de destino eh a mesma coisa so que com map.getDestPos()
*/
  
/// CODIFIQUE DAQUI PRA BAIXO

// --------------->> DFS <<---------------
const dfs = require('./public/scripts/DFS/dfs');    // Importa a classe DFS do arquivo ./public/scripts/DFS/dfs
const buscaDfs = new dfs.DFS(map, map.sourcePos);   // Cria objeto (mapa e origem como parametros do construtor)
buscaDfs.find();   // Aplica a busca em profundidade
// Pega o caminho gerado pela DFS
// console.log("DFS = ", buscaDfs.getPath());

// --------------->> BFS <<---------------
const bfs = require('./public/scripts/BFS/bfs');    // Importa a classe bfs do arquivo ./public/scripts/BFS/bfs
const buscaBfs = new bfs.BFS(map, map.sourcePos);  // Cria objeto (mapa e origem como parametros do construtor)
buscaBfs.find();
// Pega o caminho gerado pela bfs
// console.log("BFS = ", buscaBfs.getPath());

// --------------->> Best-First Search <<---------------
const bestFS = require('./public/scripts/BestFS/bestfs');   // Importa a classe bfs do arquivo ./public/scripts/BestFS/bestfs
const buscaBestFS = new bestFS.BestFS(map, map.sourcePos, map.destPos); // Cria objeto (mapa, origem e destino como parametros do construtor)
buscaBestFS.find();
// Pega o caminho gerado pela Best-First Search
// console.log("Best-First Search = ", buscaBestFS.getPath());

// --------------->> A* <<---------------
const aStar = require('./public/scripts/Astar/astar');  // Importa a classe bfs do arquivo ./public/scripts/Astar/astar
const buscaAStar = new aStar.AStar(map, map.sourcePos, map.destPos);    // Cria objeto (mapa, origem e destino como parametros do construtor)
buscaAStar.find();
// Pega o caminho gerado pelo A*
// console.log("A* = ", buscaAStar.getPath());

// --------------->> Hill Climb <<---------------
const HillClimb = require('./public/scripts/HillClimb/hillclimb');  // Importa a classe bfs do arquivo ./public/scripts/HillClimb/hillclimb
const buscaHillClimb = new HillClimb.HillClimb(map, map.sourcePos, map.destPos);    // Cria objeto (mapa, origem e destino como parametros do construtor)
buscaHillClimb.find();
// Pega o caminho gerado pelo HillClimb
// console.log(buscaHillClimb.getPath());


// Run the server - nao mexer nisso //
app.listen(8080, () => {
    console.log("Servidor rodando, acesse http://localhost:8080/");
})