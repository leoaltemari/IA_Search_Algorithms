/* 
Nome: Leonardo Altemari Nogueira - 10284883
*/

// Configuring the server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
 
// Classes
var mapClass = require('./public/map');

 // Routes (igonora isso)

function openFile() {
    try {
        var m = fs.readFileSync('./public/map.txt', 'utf8');   
    } catch(e) {
        console.log('Error:', e.stack);
    }
    return m;
}

var file = openFile();
var map = new mapClass.Map(file);   // Objeto que contem o mapa e seus metodos
  

/// CODIFIQUE DAQUI PRA BAIXO


// Run the server - nao mexer
app.listen(8080, () => {
    console.log("Servidor rodando, acesse http://localhost:8080/");
})