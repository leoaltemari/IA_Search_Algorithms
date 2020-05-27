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

 // Routes
     // Default GET
app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('./public/index.html');
});

function openFile(mapa) {
    try {
        var m = fs.readFileSync('./public/map.txt', 'utf8');
        // console.log(a);    
    } catch(e) {
        console.log('Error:', e.stack);
    }
    return m;
}

var map = new mapClass.Map("");

map.setFullMap(openFile(map));
console.log(map.toString());


// Run the server
app.listen(8080, () => {
    console.log("Servidor rodando, acesse http://localhost:8080/");
})