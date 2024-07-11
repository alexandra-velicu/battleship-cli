const Player = require('../Player');
const Ship = require('../Ship');
const { SHIP_KEY } = require('../../utils/keys');
const { parseCoordinates } = require('../../utils/validateCoords');

describe('Player.configureShip', () => {
    let player;
    let opponent;

    beforeEach(() => {
        player = new Player();
        opponent = new Player();
        player.ownBoard = Array(10).fill().map(() => Array(10).fill('   '));
        opponent.ownBoard = Array(10).fill().map(() => Array(10).fill('   '));
        player.opponentBoard = Array(10).fill().map(() => Array(10).fill('   '));
        opponent.opponentBoard = Array(10).fill().map(() => Array(10).fill('   '));
        player.threshold = 10;
        opponent.threshold = 10;
        player.populateShips();
        opponent.populateShips();
    });

    it('should place a ship correctly in the right direction', () => {
        const result = player.configureShip('cruiser', 'A1', 'right', false);
        const { row, col } = parseCoordinates('A1');
        expect(result).toBeUndefined();
        expect(player.ownBoard[row][col]).toBe('CRU');
        expect(player.ownBoard[row][col + 1]).toBe('CRU');
        expect(player.ownBoard[row][col + 2]).toBe('CRU');
    });

    it('should place a ship correctly in the left direction', () => {
        const result = player.configureShip('cruiser', 'A3', 'left', false);
        const { row, col } = parseCoordinates('A3');
        expect(result).toBeUndefined();
        expect(player.ownBoard[row][col]).toBe('CRU');
        expect(player.ownBoard[row][col - 1]).toBe('CRU');
        expect(player.ownBoard[row][col - 2]).toBe('CRU');
    });

    it('should place a ship correctly in the up direction', () => {
        const result = player.configureShip('cruiser', 'C1', 'up', false);
        const { row, col } = parseCoordinates('C1');
        expect(result).toBeUndefined();
        expect(player.ownBoard[row][col]).toBe('CRU');
        expect(player.ownBoard[row - 1][col]).toBe('CRU');
        expect(player.ownBoard[row - 2][col]).toBe('CRU');
    });

    it('should place a ship correctly in the down direction', () => {
        const result = player.configureShip('cruiser', 'A1', 'down', false);
        const { row, col } = parseCoordinates('A1');
        expect(result).toBeUndefined();
        expect(player.ownBoard[row][col]).toBe('CRU');
        expect(player.ownBoard[row + 1][col]).toBe('CRU');
        expect(player.ownBoard[row + 2][col]).toBe('CRU');
    });


    it('should place a ship correctly for the CPU', () => {
        const result = player.configureShip('cruiser', 'A1', 'right', true);
        const { row, col } = parseCoordinates('A1');
        expect(result).toBe(true);
        expect(player.ownBoard[row][col]).toBe('CRU');
        expect(player.ownBoard[row][col + 1]).toBe('CRU');
        expect(player.ownBoard[row][col + 2]).toBe('CRU');
    });

    it('should fail to place a ship out of bounds for the CPU', () => {
        const result = player.configureShip('cruiser', 'A8', 'right', true);
        expect(result).toBe(false);
    });
});
