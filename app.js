// Configuring the server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Interface
app.use(express.static('./public/interface'));
app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('./public/interface/index.html');
});

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
// armazena suas dimensoes e localizações de origem e destino   
const mapClass = require('./public/maps/map');
var map;
var file;
app.get('/openMap/:mapName', (req, res) => {
    let mapName = req.params.mapName;
    mapName = mapName+".txt";

    file = openFile(mapName);
    map = new mapClass.Map(file);   // Objeto que contem o mapa e seus metodos
    res.send(JSON.stringify(map));
});

var searchObject = {
    path: [],
    timeExpended: ""
}

// Algoritmos:
// --------------->> DFS <<---------------
// Importa a classe DFS do arquivo ./public/scripts/DFS/dfs
const dfs = require('./public/scripts/DFS/dfs');    
app.get('/dfs', (req, res) => {
    if(map != null) {
        // Cria objeto (mapa e origem como parametros do construtor)
        const buscaDfs = new dfs.DFS(map, map.sourcePos);   
        buscaDfs.find();
        searchObject.path = buscaDfs.getPath();
        searchObject.timeExpended = buscaDfs.getPerformance();
        res.send(JSON.stringify(searchObject));
        return;
    }
    res.send(JSON.stringify({}));
});

// --------------->> BFS <<---------------
app.get('/bfs', (req, res) => {
    // Importa a classe bfs do arquivo ./public/scripts/BFS/bfs
    const bfs = require('./public/scripts/BFS/bfs');    

    if(map != null) {
        // Cria objeto (mapa e origem como parametros do construtor)
        const buscaBfs = new bfs.BFS(map, map.sourcePos);  
        buscaBfs.find();
        searchObject.path = buscaBfs.getPath();
        searchObject.timeExpended = buscaBfs.getPerformance();
        res.send(JSON.stringify(searchObject));
        return;
    }
    res.send(JSON.stringify({}));
});

// --------------->> Best-First Search <<---------------
 // Importa a classe bfs do arquivo ./public/scripts/BestFS/bestfs
const bestFS = require('./public/scripts/BestFS/bestfs');  
app.get('/bestFirst', (req, res) => {
    if(map != null) {
        // Cria objeto (mapa, origem e destino como parametros do construtor)
        const buscaBestFS = new bestFS.BestFS(map, map.sourcePos, map.destPos); 
        buscaBestFS.find();
        searchObject.path = buscaBestFS.getPath();
        searchObject.timeExpended = buscaBestFS.getPerformance();
        res.send(JSON.stringify(searchObject));
        return;
    }
    res.send(JSON.stringify({}));
});

// --------------->> A* <<---------------
// Importa a classe bfs do arquivo ./public/scripts/Astar/astar
const aStar = require('./public/scripts/Astar/astar');  
app.get('/aStar', (req, res) => {
    if(map != null) {
        // Cria objeto (mapa, origem e destino como parametros do construtor)
        const buscaAStar = new aStar.AStar(map, map.sourcePos, map.destPos);    
        buscaAStar.find();
        searchObject.path = buscaAStar.getPath();
        searchObject.timeExpended = buscaAStar.getPerformance();
        res.send(JSON.stringify(searchObject));
        return;
    }
    res.send(JSON.stringify({}));
});


// --------------->> Hill Climb <<---------------
// Importa a classe bfs do arquivo ./public/scripts/HillClimb/hillclimb
const HillClimb = require('./public/scripts/HillClimb/hillclimb');  
app.get('/hillClimbing', (req, res) => {
    if(map != null) {
        // Cria objeto (mapa, origem e destino como parametros do construtor)
        const buscaHillClimb = new HillClimb.HillClimb(map, 
                                    map.sourcePos, map.destPos);    
        buscaHillClimb.find();
        searchObject.path = buscaHillClimb.getPath();
        searchObject.timeExpended = buscaHillClimb.getPerformance();
        res.send(JSON.stringify(searchObject));
        return;
    }
    res.send(JSON.stringify({}));
});


// Run the server
app.listen(8080, () => {
    console.log("Servidor rodando, acesse http://localhost:8080/");
})