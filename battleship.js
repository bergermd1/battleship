// const imports = require('./index');
// import {colorShipSquares} from "./index.js";

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

    function getAllRandomShipCoords() {
        // console.log(this);
        let direction = getRandomDirection();
        const allShipCoords = [];
        const allShipCoordArr = [];
        // let carrierCoords = [];
        // carrierCoords.push(getRandomCoords());
        let shipLengths = [5,4,3,3,2];
        shipLengths.forEach(length => {
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
        // while (carrierCoords.length < 5) {
        //     let newCoords = [];
        //     if (carrierCoords.length === 0) {
        //         newCoords = getRandomCoords();
        //     } else {
        //         let lastCoords = carrierCoords[carrierCoords.length - 1];
        //         newCoords[0] = lastCoords[0];
        //         newCoords[1] = lastCoords[1];
        //         newCoords[direction] = newCoords[direction] + 1;
        //     }
        //     if (validPosition.bind(this)(newCoords)) {
        //         carrierCoords.push(newCoords);
        //     } else {
        //         carrierCoords = [];
        //     }
        // }
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
        // console.log(this.missCoords);
        // console.log(allShipCoordsArr);
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

    // function disableBoard() {

    // }

    // function isValidLocation();

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
    }
}

// const b = Gameboard(0);
// console.log(b.allShipCoords);
// console.log(b.getAllRandomShipCoords());

function Player(myBoard, enemyBoard, myOpponent, myTurn, isHuman) {
    this.myBoard = myBoard;
    this.myOpponent = myOpponent;
    this.enemyBoard = enemyBoard;
    this.myTurn = myTurn;
    this.isHuman = isHuman;

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
            // console.log(this.myOpponent);
            turnOver.bind(this)();
            // return Promise.resolve();
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

    // function checkGameOver() {

    // }

    function randomAttack() {
        console.log(this);
        // let x = Math.floor(Math.random() * 10); 
        // let y = Math.floor(Math.random() * 10); 
        let coords = getRandomCoords();
        while (includesCoords(this.enemyBoard.missCoords.concat(this.enemyBoard.hitCoords), coords)) {
            // x = Math.floor(Math.random() * 10); 
            // y = Math.floor(Math.random() * 10); 
            // coords = [x,y];
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

    return {
        myBoard,
        myOpponent,
        enemyBoard,
        myTurn,
        isHuman,
        attack,
        randomAttack,
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

let board1 = Gameboard(1);
let board2 = Gameboard(2);
let coords1 = board1.getAllRandomShipCoords();
let coords2 = board2.getAllRandomShipCoords();
// console.log(coords);
board1.initializeShips(coords1)
board2.initializeShips(coords2)

// gameLoop();

function gameLoop() {
    let p1 = Player(board1, board2, null, true, true);
    let p2 = Player(board2, board1, p1, false, false);
    p1.myOpponent = p2;
    // console.log(p1);
    initializeHTML(p1, p2);
    // console.log('Player 1');
    // board1.displayFullBoard();
    // console.log('Player 2');
    // board2.displayFullBoard();
    colorShipSquares(board1.boardNumber, board1.allShipCoords);
    colorShipSquares(board2.boardNumber, board2.allShipCoords);
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

function repaintSquareHit(boardNumber, enemyBoardNumber, coord) {
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.remove('unhitShipSquare');
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.add('hitShipSquare');
    document.querySelector(`#gameBoardP${enemyBoardNumber}-${coord[0]}${coord[1]}`).classList.remove('unhitShipSquare');
    document.querySelector(`#gameBoardP${enemyBoardNumber}-${coord[0]}${coord[1]}`).classList.add('hitShipSquare');
}
function repaintSquareMiss(boardNumber, enemyBoardNumber, coord) {
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.remove('unhitShipSquare');
    document.querySelector(`#hitMissP${boardNumber}-${coord[0]}${coord[1]}`).classList.add('missShipSquare');
    document.querySelector(`#gameBoardP${enemyBoardNumber}-${coord[0]}${coord[1]}`).classList.remove('unhitShipSquare');
    document.querySelector(`#gameBoardP${enemyBoardNumber}-${coord[0]}${coord[1]}`).classList.add('missShipSquare');
}

module.exports = {
    Ship,
    Gameboard,
}