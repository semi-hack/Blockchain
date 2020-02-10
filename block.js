const { GENESIS_DATA } = require('./config');

class Block {
    constructor({ timestamp, hash, lasthash, data }) {
        this.timestamp = timestamp;
        this.hash = hash;
        this.lasthash = lasthash;
        this.data = data;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }
}

module.exports = Block;

// Genesis Block