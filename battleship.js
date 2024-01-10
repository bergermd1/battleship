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

function Gameboard() {
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

    function receiveAttack(coords) {
        if (coords[0] >= 0 && coords[0] <= 10 && coords[1] >= 0 && coords[1] <= 10) {
            for (const ship in ships) {
                let shipCoords = ships[ship].coords;
                for (let i = 0; i < shipCoords.length; i++) {
                    if (coords[0] === shipCoords[i][0] && coords[1] === shipCoords[i][1]) {
                        ships[ship].hit();
                        hitCoords.push(coords);
                        // allShipsSunk();
                        return;
                    }
                }
            }
            missCoords.push(coords);
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

    function includesCoords(arr, coords) {
        // console.log(arr[0][0] === coords[0] && arr[0][1] === coords[1]);
        // console.log(arr[0][1] === coords[1]);
        let includes = false;
        arr.forEach(element => {
            // console.log(element);
            if (element[0] === coords[0] && element[1] === coords[1]) {
                // console.log('yeah');
                includes = true;
            }
        })
        return includes;
    }

    // function isValidLocation();

    function displayInConsole() {
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

    return {
        ships,
        allShipCoords,
        missCoords,
        hitCoords,
        initializeShips,
        includesCoords,
        receiveAttack,
        allShipsSunk,
        displayInConsole,
    }
}

function Player(board) {
    function attack(coords) {
        let processedCoords = [];
        processedCoords.push(parseInt(coords[0]));
        processedCoords.push(parseInt(coords[1]));
        board.receiveAttack(processedCoords);
    }

    return {
        attack,
    }
}

let board1 = Gameboard();
let board2 = Gameboard();
board1.initializeShips({
    'carrier': [[0,0], [1,0], [2,0], [3,0], [4,0]],
    'battleship': [[0,2], [1,2], [2,2], [3,2]],
    'submarine': [[0,4], [1,4], [2,4]],
    'cruiser': [[0,6], [1,6], [2,6]],
    'destroyer': [[0,8], [1,8]],
})
board2.initializeShips({
    'carrier': [[5,1], [6,1], [7,1], [8,1], [9,1]],
    'battleship': [[6,3], [7,3], [8,3], [9,3]],
    'submarine': [[7,5], [8,5], [9,5]],
    'cruiser': [[7,7], [8,7], [9,7]],
    'destroyer': [[8,9], [9,9]],
})

gameLoop();

function gameLoop() {
    let p1 = Player(board1);
    let p2 = Player(board2);
    console.log('Player 1');
    board1.displayInConsole();
    console.log('Player 2');
    board2.displayInConsole();

    for (let i = 0; i < 10; i ++) {
        let move1 = prompt("Enter move for player 1");
        console.log(move1[0]);
        p1.attack(move1);
        let move2 = prompt("Enter move for player 2");
        p2.attack(move2);
        board1.displayInConsole();
        board2.displayInConsole();
    }
}

module.exports = {
    Ship,
    Gameboard,
}