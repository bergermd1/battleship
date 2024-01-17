function Ship(coords) {
    this.coords = coords;
    const length = coords.length;
    let hits = 0;

    function hit() {
        this.hits += 1;
    }

    function isSunk() {
        return this.hits === this.length;
    }

    return {
        coords,
        length,
        hits,
        hit,
        isSunk,
    }
}

function Gameboard(boardNumber) {
    this.boardNumber = boardNumber;
    const ships = {};
    let allShipCoords = [];
    let missCoords = [];
    let hitCoords = [];

    function initializeShips(shipsCoords) {
        for (const ship in shipsCoords) {
            ships[ship] = Ship(shipsCoords[ship]);
            shipsCoords[ship].forEach(coord => {
                allShipCoords.push(coord);
            });
        }
    }

    function getUserShipCoords() {
        return {};
    }

    function getAllRandomShipCoords() {
        const allShipCoords = [];
        const allShipCoordArr = [];
        let shipLengths = [5,4,3,3,2];
        shipLengths.forEach(length => {
            let direction = getRandomDirection();
            let newShipCoords = [];
            while (newShipCoords.length < length) {
                let newCoords = [];
                if (newShipCoords.length === 0) {
                    newCoords = getRandomCoords();
                } else {
                    let lastCoords = newShipCoords[newShipCoords.length - 1];
                    newCoords[0] = lastCoords[0];
                    newCoords[1] = lastCoords[1];
                    newCoords[direction] = newCoords[direction] + 1;
                }
                if (validPosition.bind(this)(allShipCoordArr, newCoords)) {
                    newShipCoords.push(newCoords);
                } else {
                    newShipCoords = [];
                }
            }
            newShipCoords.forEach(coord => {
                allShipCoordArr.push(coord);
            })
            allShipCoords.push(newShipCoords);
        })

        let allShipCoordsObj = {
            'carrier': allShipCoords[0],
            'battleship': allShipCoords[1],
            'submarine': allShipCoords[2],
            'cruiser': allShipCoords[3],
            'destroyer': allShipCoords[4],
        }
        return allShipCoordsObj;
    }

    function validPosition(allShipCoordsArr, coords) {
        return (coords[0] >= 0 && coords[0] < 10 && coords[1] >= 0 && coords[1] < 10) && 
                !includesCoords(this.missCoords.concat(this.hitCoords.concat(this.allShipCoords.concat(allShipCoordsArr))), coords)
    }

    function receiveAttack(coords) {
        if (coords[0] >= 0 && coords[0] < 10 && coords[1] >= 0 && coords[1] < 10) {
            for (const ship in ships) {
                let shipCoords = ships[ship].coords;
                for (let i = 0; i < shipCoords.length; i++) {
                    if (coords[0] === shipCoords[i][0] && coords[1] === shipCoords[i][1]) {
                        ships[ship].hit();
                        hitCoords.push(coords);
                        // allShipsSunk();
                        return true;
                    }
                }
            }
            missCoords.push(coords);
            return false;
        }
    }

    function allShipsSunk() {
        let sunk = true;
        for (const ship in ships) {
            // console.log(ship);
            if (!ships[ship].isSunk()) {
                sunk = false;
            }
        }
        return sunk;
    }

    function displayFullBoard() {
        let str = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (includesCoords(this.hitCoords, [j,i])) {
                    str += 'H';//hit
                } else if (includesCoords(this.missCoords, [j,i])) {
                    str += 'M';//miss
                } else if (includesCoords(this.allShipCoords, [j,i])) {
                    str += 'O';//boat
                } else {
                    str += '-';//water (empty)
                }
            }
            str += '\n';
        }
        console.log(str);
    }

    function displayHitsMisses() {
        let str = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (includesCoords(this.hitCoords, [j,i])) {
                    str += 'H';//hit
                } else if (includesCoords(this.missCoords, [j,i])) {
                    str += 'M';//miss
                } else {
                    str += '-';//water (empty)
                }
            }
            str += '\n';
        }
        console.log(str);
    }

    return {
        boardNumber,
        ships,
        allShipCoords,
        missCoords,
        hitCoords,
        initializeShips,
        includesCoords,
        receiveAttack,
        allShipsSunk,
        displayFullBoard,
        displayHitsMisses,
        getAllRandomShipCoords,
        getUserShipCoords,
    }
}

function Player(myBoard, enemyBoard, myOpponent, myTurn, isHuman) {
    this.myBoard = myBoard;
    this.myOpponent = myOpponent;
    this.enemyBoard = enemyBoard;
    this.myTurn = myTurn;
    this.isHuman = isHuman;
    this.shipsPlaced = 0;
    this.shipLengths = [5,4,3,3,2];

    function attack(coords) {
        if (this.myTurn && !includesCoords(this.enemyBoard.missCoords.concat(this.enemyBoard.hitCoords), coords)) {
            let processedCoords = [];
            processedCoords.push(parseInt(coords[0]));
            processedCoords.push(parseInt(coords[1]));
            if (this.enemyBoard.receiveAttack(processedCoords)) {
                console.log('yeah');
                repaintSquareHit(this.myBoard.boardNumber, this.enemyBoard.boardNumber, processedCoords);
            } else {
                repaintSquareMiss(this.myBoard.boardNumber, this.enemyBoard.boardNumber, processedCoords);
            }
            turnOver.bind(this)();
        }
    }
    
    function turnOver() {
        if (this.enemyBoard.allShipsSunk()) {
            console.log('Game over');
            this.myTurn = false;
            return;
        }
        this.myTurn = false;
        this.myOpponent.myTurn = true;
        if (!this.myOpponent.isHuman) {
            this.myOpponent.randomAttack();
        }
    }

    function randomAttack() {
        let coords = getRandomCoords();
        while (includesCoords(this.enemyBoard.missCoords.concat(this.enemyBoard.hitCoords), coords)) {
            coords = getRandomCoords();
        }
        console.log(coords);
        if (this.enemyBoard.receiveAttack(coords)) {
            repaintSquareHit(this.myBoard.boardNumber, this.enemyBoard.boardNumber, coords);
        } else {
            repaintSquareMiss(this.myBoard.boardNumber, this.enemyBoard.boardNumber, coords);
        }
        turnOver.bind(this)();
    }

    function shipOn(coords) {
        if (shipsPlaced < shipLengths.length) {
            let direction = 0;
            let shipLength = shipLengths[shipsPlaced];
            let shipCoords = [];
            for (let i = 0; i < shipLength; i++) {
                shipCoords.push([coords[0] + (i * (direction === 0)), coords[1] + (i * (direction === 1))]);
            }
            repaintShipOn(this.myBoard.boardNumber, shipCoords);
        }
    }
    function shipOff(coords) {
        if (shipsPlaced < shipLengths.length) {
            let direction = 0;
            let shipLength = shipLengths[shipsPlaced];
            let shipCoords = [];
            for (let i = 0; i < shipLength; i++) {
                shipCoords.push([coords[0] + (i * (direction === 0)), coords[1] + (i * (direction === 1))]);
            }
            repaintShipOff(this.myBoard.boardNumber, shipCoords);
        }
    }

    function placeShip(coords) {
        if (shipsPlaced < shipLengths.length) {
            let direction = 0;
            let shipLength = shipLengths[shipsPlaced];
            let shipCoords = [];
            for (let i = 0; i < shipLength; i++) {
                shipCoords.push([coords[0] + (i * (direction === 0)), coords[1] + (i * (direction === 1))]);
            }
            // repaintShipOff(this.myBoard.boardNumber, shipCoords);
            colorShipSquares(this.myBoard.boardNumber, shipCoords);
            // removeBorders(this.myBoard.boardNumber, {'s': shipCoords})
        }
    }

    return {
        myBoard,
        myOpponent,
        enemyBoard,
        myTurn,
        isHuman,
        attack,
        randomAttack,
        shipOn,
        shipOff,
        placeShip,
    }
}

function includesCoords(arr, coords) {
    let includes = false;
    arr.forEach(element => {
        if (element[0] === coords[0] && element[1] === coords[1]) {
            includes = true;
        }
    })
    return includes;
}

function gameLoop() {
    let board1 = Gameboard(1);
    let board2 = Gameboard(2);
    let coords1 = board1.getUserShipCoords();
    let coords2 = board2.getAllRandomShipCoords();

    board1.initializeShips(coords1)
    board2.initializeShips(coords2)

    let p1 = Player(board1, board2, null, true, true);
    let p2 = Player(board2, board1, p1, false, false);
    p1.myOpponent = p2;

    initializeHTML(p1, p2);

    colorShipSquares(board1.boardNumber, board1.allShipCoords);
    colorShipSquares(board2.boardNumber, board2.allShipCoords);
    removeBorders(board2.boardNumber, board2.ships);
}

function getRandomCoords() {
    let x = Math.floor(Math.random() * 10); 
    let y = Math.floor(Math.random() * 10);
    return [x,y];
}

function getRandomDirection() {
    return Math.floor(Math.random() * 2);
}

function colorShipSquares(boardNumber, coords) {
    coords.forEach(coord => {
        document.querySelector(`#gameBoardP${boardNumber}-${coord[0]}${coord[1]}`).classList.add('unhitShipSquare');
    });
}
function removeBorders(boardNumber, ships) {
    for (const shipKey in ships) {
        let ship = ships[shipKey].coords;
        // console.log(ship);
        let direction = ship[1][0] - ship[0][0];
        for (let i = 0; i < ship.length; i++) {
            if (direction === 1) {
                if (i !== ship.length - 1) {
                    document.querySelector(`#gameBoardP${boardNumber}-${ship[i][0]}${ship[i][1]}`).style.borderRight = 'none';
                }
                if (i !== 0) {
                    document.querySelector(`#gameBoardP${boardNumber}-${ship[i][0]}${ship[i][1]}`).style.borderLeft = 'none';
                }
            } else {
                if (i !== ship.length - 1) {
                    document.querySelector(`#gameBoardP${boardNumber}-${ship[i][0]}${ship[i][1]}`).style.borderBottom = 'none';
                }
                if (i !== 0) {
                    document.querySelector(`#gameBoardP${boardNumber}-${ship[i][0]}${ship[i][1]}`).style.borderTop = 'none';
                }
            }
        }
    }
    coords.forEach(coord => {
        document.querySelector(`#gameBoardP${boardNumber}-${coord[0]}${coord[1]}`).classList.add('unhitShipSquare');
    });
}

function repaintSquareHit(boardNumber, enemyBoardNumber, coord) {
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.remove('unhitShipSquare');
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.add('hitShipSquare');
    document.querySelector(`#gameBoardP${enemyBoardNumber}-${coord[0]}${coord[1]}`).style.backgroundColor = 'red';
}
function repaintSquareMiss(boardNumber, enemyBoardNumber, coord) {
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.remove('unhitShipSquare');
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.add('missShipSquare');
    document.querySelector(`#gameBoardP${enemyBoardNumber}-${coord[0]}${coord[1]}`).classList.remove('unhitShipSquare');
    document.querySelector(`#gameBoardP${enemyBoardNumber}-${coord[0]}${coord[1]}`).classList.add('missShipSquare');
}
function repaintShipOn(boardNumber, coords) {
    coords.forEach(coord => {
        document.querySelector(`#gameBoardP${boardNumber}-${coord[0]}${coord[1]}`).classList.add('placeShipSquare');
        // document.querySelector(`#gameBoardP${boardNumber}-${coord[0]}${coord[1]}`).style.backgroundColor = 'gray';
        // document.querySelector(`#gameBoardP${boardNumber}-${coord[0]}${coord[1]}`).style.opacity = .3;
    })
}
function repaintShipOff(boardNumber, coords) {
    coords.forEach(coord => {
        document.querySelector(`#gameBoardP${boardNumber}-${coord[0]}${coord[1]}`).classList.remove('placeShipSquare');
    })
}

module.exports = {
    Ship,
    Gameboard,
}