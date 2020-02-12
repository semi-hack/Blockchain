const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });

        this.chain.push(newBlock);
    }

    static isValidchain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) { 
            return false
        };
        
        return true;
    }
}



module.exports = Blockchain;