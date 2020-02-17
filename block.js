const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
    constructor({ timestamp, hash, lasthash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.hash = hash;
        this.lasthash = lasthash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data}) {
        let hash, timestamp;
        const lasthash = lastBlock.hash;
        const { difficulty } = lastBlock;
        let nonce = 0; 

        do {
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, lasthash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({ timestamp, lasthash, data, difficulty, nonce, hash });
    }
}

module.exports = Block;

// Genesis Block