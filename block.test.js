const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
    const timestamp = 'a-date';
    const hash = 'foo-hash';
    const lasthash = 'foo-lasthash';
    const data = ['block', 'chain'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({ timestamp, hash, lasthash, data, nonce, difficulty });

    it('should contain timestamp, hash, lasthash, data', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.hash).toEqual(hash);
        expect(block.lasthash).toEqual(lasthash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
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

    describe('mineBlock()', ()=> {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data});

        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true)
        });

        it('sets the `lastHash` to be the `hash` of the last block', () => {
            expect(minedBlock.lasthash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash)
             .toEqual(
                 cryptoHash(
                     minedBlock.timestamp,
                     minedBlock.nonce,
                     minedBlock.difficulty,
                     lastBlock.hash,
                     data
                    )
                );
        })

        it('sets a `hash` that matches the difficulty criteria', () => {
            expect(minedBlock.hash.substring(0, minedBlock.difficulty))
            .toEqual('0'.repeat(minedBlock.difficulty));
        })
    });

});