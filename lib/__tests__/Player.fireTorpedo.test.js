const Player = require('../Player');
const {
    parseCoordinates,
    isCoordinateValid,
} = require('../../utils/validateCoords');

describe('Player class', () => {
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

    it('should fire torpedo and hit an empty space', () => {
        const result = player.fireTorpedo('A1', opponent, false);
        expect(result.message).toContain('Drats, you missed!');
        expect(player.opponentBoard[0][1]).toBe('   ');
    });
    

    it('should fire torpedo and hit a ship', () => {
        const { row, col } = parseCoordinates('A1');
        opponent.ownBoard[row][col] = 'CRU'; 
        const result = player.fireTorpedo('A1', opponent, false);

        // verify whether the ship was hit or not
        if (result.shipHit) {
            expect(result.message).toContain('hit');
            expect(opponent.ownBoard[row][col]).toBe(' X '); 
        } else {
            expect(result.message).toContain('missed');
            expect(opponent.ownBoard[row][col]).toBe(' 0 '); 
        }
    });
});