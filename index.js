function initializeHTML(p1, p2) {
    const hitMiss = document.createElement('div');
    hitMiss.className = 'hitMiss grid';
    const gameBoard = document.createElement('div');
    gameBoard.className = 'gameBoard grid';
    for (let i = 0; i < 10; i++) {
        const hitMissRow = document.createElement('div');
        hitMissRow.className = 'gridRow';
        hitMiss.appendChild(hitMissRow)
        
        const gameBoardRow = document.createElement('div');
        gameBoardRow.className = 'gridRow';
        gameBoard.appendChild(gameBoardRow);
        
        for (let j = 0; j < 10; j++) {
            const hitMissGridSquare = document.createElement('div');
            hitMissGridSquare.className = 'gridSquare';
            hitMissGridSquare.id = `hitMissP1-${i}${j}`;
            hitMissGridSquare.addEventListener('click', () => {
                p1.attack([i,j]);
            });
            hitMissRow.appendChild(hitMissGridSquare);
            
            const gameBoardGridSquare = document.createElement('div');
            gameBoardGridSquare.className = 'gridSquare';
            gameBoardGridSquare.id = `gameBoardP1-${i}${j}`;
            gameBoardRow.appendChild(gameBoardGridSquare);
        }
    }

    const hitMiss2 = document.createElement('div');
    hitMiss2.className = 'hitMiss grid';
    const gameBoard2 = document.createElement('div');
    gameBoard2.className = 'gameBoard grid';
    for (let i = 0; i < 10; i++) {
        const hitMissRow = document.createElement('div');
        hitMissRow.className = 'gridRow';
        hitMiss2.appendChild(hitMissRow)
        
        const gameBoardRow = document.createElement('div');
        gameBoardRow.className = 'gridRow';
        gameBoard2.appendChild(gameBoardRow);
        
        for (let j = 0; j < 10; j++) {
            const hitMissGridSquare = document.createElement('div');
            hitMissGridSquare.className = 'gridSquare';
            hitMissGridSquare.id = `hitMissP2-${i}${j}`;
            hitMissGridSquare.addEventListener('click', () => {
                p2.attack([i,j]);
            });
            hitMissRow.appendChild(hitMissGridSquare);
            
            const gameBoardGridSquare = document.createElement('div');
            gameBoardGridSquare.className = 'gridSquare';
            gameBoardGridSquare.id = `gameBoardP2-${i}${j}`;
            gameBoardRow.appendChild(gameBoardGridSquare);
        }
    }

    // console.log(document.querySelector('.playerScreen'));
    document.querySelector('.playerScreen').appendChild(hitMiss);
    document.querySelector('.playerScreen').appendChild(gameBoard);
    document.querySelector('.computerScreen').appendChild(hitMiss2);
    document.querySelector('.computerScreen').appendChild(gameBoard2);
    // return hitMiss;
}

// function colorShipSquares(coords) {
//     coords.forEach(coord => {
//         document.querySelector(`#gameBoardP1-${coord[0]}${coord[1]}`).classList.add('unhitShipSquare');
//     });
// }

// export {colorShipSquares};

// module.exports = {
//     colorShipSquares,
// }
// initializeHTML();