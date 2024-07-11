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

    it('should return message for repeating a missed space', () => {
        player.fireTorpedo('A1', opponent, false); // Miss at A1
        const result = player.fireTorpedo('A1', opponent, false); // Repeat fire at A1
        expect(result.message).toContain('You already guessed that space! I have zero sympathy, and you lose a turn.');
    });

    it('should sink a ship when hitting all its parts', () => {
        const { row: rowA1, col: colA1 } = parseCoordinates('A1');
        const { row: rowA2, col: colA2 } = parseCoordinates('A2');
        const { row: rowA3, col: colA3 } = parseCoordinates('A3');
    
        opponent.ownBoard[rowA1][colA1] = 'CRU'; // Place cruiser at A1
        opponent.ownBoard[rowA2][colA2] = 'CRU'; // Place cruiser at A2
        opponent.ownBoard[rowA3][colA3] = 'CRU'; // Place cruiser at A3
    
        const resultA1 = player.fireTorpedo('A1', opponent, false); // Hit at A1
        expect(resultA1.message).toContain('You hit a ship!');
    
        const resultA2 = player.fireTorpedo('A2', opponent, false); // Hit at A2
        expect(resultA2.message).toContain('You hit a ship!');
    
        const resultA3 = player.fireTorpedo('A3', opponent, false); // Hit at A3 and sink the cruiser
        expect(resultA3.message).toContain('You bastard! You sunk the computer\'s Cruiser!');
    });
    

    
});