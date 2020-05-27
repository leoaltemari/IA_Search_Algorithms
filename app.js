/* 
Nome: Leonardo Altemari Nogueira - 10284883
*/

// Configuring the server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
 

 // Routes
     // Default GET
app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('./public/index.html');
});


var mapClass = require('./public/map');
var map = new mapClass.Map();

try {
    map.fullMap = fs.readFileSync('map.txt', 'utf8');
    console.log(map.fullMap);    
} catch(e) {
    console.log('Error:', e.stack);
}






// Run the server
app.listen(8080, () => {
    console.log("Servidor rodando, acesse http://localhost:8080/");
})