/// BUTTONS
// Mapas
const map11Btn = document.querySelector('#map-oneone');
const map12Btn = document.querySelector('#map-onetwo');
const map13Btn = document.querySelector('#map-onethree');
const map21Btn = document.querySelector('#map-twoone');
const map22Btn = document.querySelector('#map-twotwo');
const map23Btn = document.querySelector('#map-twothree');

// Algoritmos
const dfsBtn = document.querySelector('#dfs-alg');
const bfsBtn = document.querySelector('#bfs-alg');
const bestFirstBtn = document.querySelector('#bestfirst-alg');
const aStarBtn = document.querySelector('#astar-alg');
const hillClimbBtn = document.querySelector('#hillclimb-alg');

/// TEXTS
// Selected
const selectedMap = document.querySelector('#selected-map');
const selectedAlg = document.querySelector('#selected-alg');

// Results data



// MAPS
map11Btn.addEventListener('click', async () => {
    selectedMap.innerHTML = "Mapa: MAPA 1.1";

    // Request to the server
    const res = await fetch(`http://localhost:8080/openMap/map1.1`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
});

map12Btn.addEventListener('click', async () => {
    selectedMap.innerHTML = "Mapa: MAPA 1.2";

    // Request to the server
    const res = await fetch(`http://localhost:8080/openMap/map1.2`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
});

map13Btn.addEventListener('click', async () => {
    selectedMap.innerHTML = "Mapa: MAPA 1.3";

    // Request to the server
    const res = await fetch(`http://localhost:8080/openMap/map1.3`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
});

map21Btn.addEventListener('click', async () => {
    selectedMap.innerHTML = "Mapa: MAPA 2.1";

    // Request to the server
    const res = await fetch(`http://localhost:8080/openMap/map2.1`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
});

map22Btn.addEventListener('click', async () => {
    selectedMap.innerHTML = "Mapa: MAPA 2.2";

    // Request to the server
    const res = await fetch(`http://localhost:8080/openMap/map2.2`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
});

map23Btn.addEventListener('click', async () => {
    selectedMap.innerHTML = "Mapa: MAPA 2.3";

    // Request to the server
    const res = await fetch(`http://localhost:8080/openMap/map2.3`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
});

// ALGORITHMS
dfsBtn.addEventListener('click', async ()=> {
    selectedAlg.innerHTML = "Algoritmo: DFS";

    // Request to the server
    const res = await fetch(`http://localhost:8080/dfs`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
})
bfsBtn.addEventListener('click', async ()=> {
    selectedAlg.innerHTML = "Algoritmo: BFS";

    // Request to the server
    const res = await fetch(`http://localhost:8080/bfs`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
})
bestFirstBtn.addEventListener('click', async ()=> {
    selectedAlg.innerHTML = "Algoritmo: Best-First";

    // Request to the server
    const res = await fetch(`http://localhost:8080/bestFirst`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
})
aStarBtn.addEventListener('click', async ()=> {
    selectedAlg.innerHTML = "Algoritmo: A*";

    // Request to the server
    const res = await fetch(`http://localhost:8080/aStar`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
})
hillClimbBtn.addEventListener('click', async ()=> {
    selectedAlg.innerHTML = "Algoritmo: Hill Climb";

    // Request to the server
    const res = await fetch(`http://localhost:8080/hillClimbing`, {
        method: 'GET',
    });

    // Get the response of the request
    let json = await res.json();
})


