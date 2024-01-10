const imports = require('./battleship');
const Ship = imports.Ship;
const Gameboard = imports.Gameboard;

describe('Ship works', () => {
    test('Length and hits are initialized well', () => {
        const ship = Ship([[0,0], [0,1], [0,2]]);
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
    });
    test('Hit works', () => {
        const ship = Ship([[0,0], [0,1], [0,2]]);
        ship.hit();
        ship.hit();
        expect(ship.hits).toBe(2);
    })
    test('isSunk works', () => {
        const ship = Ship([[0,0], [0,1], [0,2]]);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
});

describe('Basic gameboard works', () => {
    let gameboard;
    beforeEach(() => {
        gameboard = Gameboard();
        gameboard.initializeShips({
            'carrier': [[0,0], [1,0], [2,0], [3,0], [4,0]],
            'battleship': [[0,2], [1,2], [2,2], [3,2]],
            'submarine': [[0,4], [1,4], [2,4]],
            'cruiser': [[0,6], [1,6], [2,6]],
            'destroyer': [[0,8], [1,8]],
        })
    })
    // console.log(gameboard.ships['carrier']);
    
    test('Gameboard initialized well', () => {
        expect(Object.keys(gameboard.ships).length).toBe(5);
        expect(gameboard.ships['battleship'].length).toBe(4);
        expect(gameboard.ships['carrier'].hits).toBe(0);
    });
    test('Receive attack 1', () => {
        gameboard.receiveAttack([0,2]);
        expect(gameboard.ships['battleship'].hits).toBe(1);
        expect(gameboard.hitCoords.length).toBe(1);
        expect(gameboard.missCoords.length).toBe(0);
    });
    test('Receive attack 2', () => {
        gameboard.receiveAttack([0,2]);
        gameboard.receiveAttack([1,2]);
        gameboard.receiveAttack([0,4]);
        gameboard.receiveAttack([0,6]);
        gameboard.receiveAttack([0,7]);
        expect(gameboard.ships['carrier'].hits).toBe(0);
        expect(gameboard.ships['battleship'].hits).toBe(2);
        expect(gameboard.ships['submarine'].hits).toBe(1);
        expect(gameboard.ships['cruiser'].hits).toBe(1);
        expect(gameboard.hitCoords.length).toBe(4);
        expect(gameboard.missCoords.length).toBe(1);
    });
    test('Sink ship', () => {
        gameboard.receiveAttack([0,8])
        expect(gameboard.ships['destroyer'].isSunk()).toBe(false);
        gameboard.receiveAttack([1,8])
        expect(gameboard.ships['destroyer'].isSunk()).toBe(true);
        expect(gameboard.hitCoords.length).toBe(2);
        expect(gameboard.missCoords.length).toBe(0);
    })
})