function initializeHTML() {
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
            // gridSquare.addEventListener('click', )
            hitMissRow.appendChild(hitMissGridSquare);
            
            const gameBoardGridSquare = document.createElement('div');
            gameBoardGridSquare.className = 'gridSquare';
            gameBoardGridSquare.id = `gameBoardP1-${i}${j}`;
            gameBoardRow.appendChild(gameBoardGridSquare);
        }
    }
    // console.log(document.querySelector('.playerScreen'));
    document.querySelector('.playerScreen').appendChild(hitMiss);
    document.querySelector('.playerScreen').appendChild(gameBoard);
    // return hitMiss;
}

function colorShipSquares(coords) {
    coords.forEach(coord => {
        document.querySelector(`#gameBoardP1-${coord[0]}${coord[1]}`).classList.add('unhitShipSquare');
    });
}

// export {colorShipSquares};

// module.exports = {
//     colorShipSquares,
// }
// initializeHTML();