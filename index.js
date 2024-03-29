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
            hitMissGridSquare.id = `hitMissP1-${j}${i}`;
            // hitMissGridSquare.addEventListener('click', () => {
            //     p1.attack([j,i]);
            // });
            hitMissRow.appendChild(hitMissGridSquare);
            
            const gameBoardGridSquare = document.createElement('div');
            gameBoardGridSquare.className = 'gridSquare';
            gameBoardGridSquare.id = `gameBoardP1-${j}${i}`;
            gameBoardRow.appendChild(gameBoardGridSquare);
            gameBoardGridSquare.addEventListener('mouseover', () => {
                p1.paintShips([j,i], repaintShipOn);
                // p1.painshipOn([j,i]);
            });
            gameBoardGridSquare.addEventListener('mouseout', () => {
                p1.paintShips([j,i], repaintShipOff);
                // p1.shipOff([j,i]);
            });
            gameBoardGridSquare.addEventListener('click', () => {
                let coords = p1.paintShips([j,i], colorShipSquares);
                if (coords) {
                    // alert(coords);
                    p1.shipsPlaced += 1;
                    // console.log(p1.shipsPlaced);
                    p1.myBoard.addShip(p1.myBoard.shipNames[p1.shipsPlaced], coords);
                    removeBorders(p1.myBoard.boardNumber, p1.myBoard.ships);
                    // p1.myBoard.addShip.bind(p1.myBoard)('carrier', coords);
                }
                // p1.placeShip([j,i]);
            });
        }

    }
    const flipDirectionButtonDiv = document.createElement('div');
    flipDirectionButtonDiv.className = 'flipDirectionButtonDiv';

    const flipDirectionButton = document.createElement('button');
    flipDirectionButton.type = 'button';
    flipDirectionButton.innerText = 'Flip Ship Direction';
    flipDirectionButton.addEventListener('click', () => {
        p1.flipShipPlacementDirection();
    })
    
    flipDirectionButtonDiv.appendChild(flipDirectionButton);
    gameBoard.appendChild(flipDirectionButtonDiv);

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
            hitMissGridSquare.id = `hitMissP2-${j}${i}`;
            hitMissGridSquare.addEventListener('click', () => {
                p2.attack([j,i]);
            });
            hitMissRow.appendChild(hitMissGridSquare);
            
            const gameBoardGridSquare = document.createElement('div');
            gameBoardGridSquare.className = 'gridSquare';
            gameBoardGridSquare.id = `gameBoardP2-${j}${i}`;
            gameBoardRow.appendChild(gameBoardGridSquare);
        }
    }

    // console.log(document.querySelector('.playerScreen'));
    document.querySelector('.playerScreen').appendChild(hitMiss);
    document.querySelector('.playerScreen').appendChild(gameBoard);
    document.querySelector('.computerScreen').appendChild(hitMiss2);
    document.querySelector('.computerScreen').appendChild(gameBoard2);
    document.querySelector('.computerScreen').style.display = 'none';
    // return hitMiss;
}

function activateHitMissBoard(p1) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            document.querySelector(`#hitMissP1-${j}${i}`).addEventListener('click', () => {
                p1.attack([j,i]);
            })
        }
    }
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