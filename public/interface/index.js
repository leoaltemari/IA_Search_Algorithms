/// BUTTONS
// Mapas
const map1Btn = document.querySelector('#map-one');
const map2Btn = document.querySelector('#map-two');
const map3Btn = document.querySelector('#map-three');

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
map1Btn.addEventListener('click', () => {
    selectedMap.innerHTML = "Mapa: MAPA 1";
});

map2Btn.addEventListener('click', () => {
    selectedMap.innerHTML = "Mapa: MAPA 2";
});

map3Btn.addEventListener('click', () => {
    selectedMap.innerHTML = "Mapa: MAPA 3";
});

// ALGORITHMS
dfsBtn.addEventListener('click', ()=> {
    selectedAlg.innerHTML = "Algoritmo: DFS"
})
bfsBtn.addEventListener('click', ()=> {
    selectedAlg.innerHTML = "Algoritmo: BFS"
})
bestFirstBtn.addEventListener('click', ()=> {
    selectedAlg.innerHTML = "Algoritmo: Best-First"
})
aStarBtn.addEventListener('click', ()=> {
    selectedAlg.innerHTML = "Algoritmo: A*"
})
hillClimbBtn.addEventListener('click', ()=> {
    selectedAlg.innerHTML = "Algoritmo: Hill Climb"
})


