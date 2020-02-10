const Block = require('./block');
const { GENESIS_DATA } = require('./config');

describe('Block', () => {
    const timestamp = 'a-date';
    const hash = 'foo-hash';
    const lasthash = 'foo-lasthash';
    const data = ['block', 'chain'];

    const block = new Block({ timestamp, hash, lasthash, data});

    it('should contain timestamp, hash, lasthash, data', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.hash).toEqual(hash);
        expect(block.lasthash).toEqual(lasthash);
        expect(block.data).toEqual(data);
    });

    describe('GENESIS()', () => {
        const genesisBlock = Block.genesis();

        it('should return instance of genesisBlock', () => {
            expect(genesisBlock instanceof Block).toBe(true)
        });

        it('should return genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });

    });

});