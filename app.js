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
        console.log('Error:', e.stack);
    }
    return m;
}

// Classes
var mapClass = require('./public/map');

var file = openFile();
var map = new mapClass.Map(file);   // Objeto que contem o mapa e seus metodos

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
// Printa objeto do mapa (somente para visualização)
console.log(map);

// Run the server - nao mexer nisso //
app.listen(8080, () => {
    console.log("Servidor rodando, acesse http://localhost:8080/");
})