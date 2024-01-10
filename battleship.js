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

//5: carrier
//4: battleship
//3: submarine
//3: cruiser
//2: destroyer

function Gameboard() {
    const ships = {};
    let missCoords = [];
    let hitCoords = [];

    function initializeShips(shipsCoords) {
        for (const ship in shipsCoords) {
            ships[ship] = Ship(shipsCoords[ship]);
        }
    }

    function receiveAttack(coords) {
        for (const ship in ships) {
            let shipCoords = ships[ship].coords;
            for (let i = 0; i < shipCoords.length; i++) {
                if (coords[0] === shipCoords[i][0] && coords[1] === shipCoords[i][1]) {
                    ships[ship].hit();
                    hitCoords.push(coords);
                    return;
                }
            }
        }
        missCoords.push(coords);
    }

    // function isValidLocation();

    return {
        ships,
        missCoords,
        hitCoords,
        initializeShips,
        receiveAttack,
    }
}

module.exports = {
    Ship,
    Gameboard,
}