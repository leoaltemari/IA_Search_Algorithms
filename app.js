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
function openFile(_filename) {
    try {
        var m = fs.readFileSync('./public/maps/' + _filename, 'utf8');   
    } catch(e) {
        console.log('Error oppening the file:', e.stack);
    }
    return m;
}

// Importa a classe que faz a leitura do mapa como uma matriz, e
// armazena suas dimensoes e localizações
const mapClass = require('./public/maps/map');
var map;
var file;
app.get('/openMap/:mapName', (req, res) => {
    // res.setHeader('Content-type', 'text/plain');
    let mapName = req.params.mapName;
    mapName = mapName+".txt";

    file = openFile(mapName);
    map = new mapClass.Map(file);   // Objeto que contem o mapa e seus metodos
    res.send(JSON.stringify(map));
});


// --------------->> DFS <<---------------
app.get('/dfs', (req, res) => {
    const dfs = require('./public/scripts/DFS/dfs');    // Importa a classe DFS do arquivo ./public/scripts/DFS/dfs
    const buscaDfs = new dfs.DFS(map, map.sourcePos);   // Cria objeto (mapa e origem como parametros do construtor)
});

// --------------->> BFS <<---------------
app.get('/bfs', (req, res) => {
    const bfs = require('./public/scripts/BFS/bfs');    // Importa a classe bfs do arquivo ./public/scripts/BFS/bfs
    const buscaBfs = new bfs.BFS(map, map.sourcePos);  // Cria objeto (mapa e origem como parametros do construtor)
});

// --------------->> Best-First Search <<---------------
app.get('/bestFirst', (req, res) => {
    const bestFS = require('./public/scripts/BestFS/bestfs');   // Importa a classe bfs do arquivo ./public/scripts/BestFS/bestfs
    const buscaBestFS = new bestFS.BestFS(map, map.sourcePos, map.destPos); // Cria objeto (mapa, origem e destino como parametros do construtor)
});

// --------------->> A* <<---------------
app.get('aStar', (req, res) => {
    const aStar = require('./public/scripts/Astar/astar');  // Importa a classe bfs do arquivo ./public/scripts/Astar/astar
    const buscaAStar = new aStar.AStar(map, map.sourcePos, map.destPos);    // Cria objeto (mapa, origem e destino como parametros do construtor)
});


// --------------->> Hill Climb <<---------------
app.get('hillClimbing', (req, res) => {
    const HillClimb = require('./public/scripts/HillClimb/hillclimb');  // Importa a classe bfs do arquivo ./public/scripts/HillClimb/hillclimb
    const buscaHillClimb = new HillClimb.HillClimb(map, map.sourcePos, map.destPos);    // Cria objeto (mapa, origem e destino como parametros do construtor)
});


// Run the server - nao mexer nisso //
app.listen(8080, () => {
    console.log("Servidor rodando, acesse http://localhost:8080/");
})