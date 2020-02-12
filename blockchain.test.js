const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain = new Blockchain();

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('contains a `chain` array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with a genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('should add new block to the chain', () => {
        const newData = 'test';
        blockchain.addBlock({ data: newData });

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });

    describe('isValid chain', () => {
        describe('When the chain does not start with a genesis Block', () => {
            it('it returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis'}

                expect(Blockchain.isValidchain(blockchain.chain)).toBe(false);

            });
        });

        describe('When the chain starts with a genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data : 'one' });
                blockchain.addBlock({ data : 'two' });
                blockchain.addBlock({ data: 'three'});
            });


            describe('and a last hash refrence has changed', () => {
                it('should return fasle', () => {


                    blockchain.chain[2].lasthash = 'broken-lastHash'

                    expect(Blockchain.isValidchain(blockchain.chain)).toBe(false);
                });

            });

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'bad data';

                    expect(Blockchain.isValidchain(blockchain.chain)).toBe(false);
                });
            })

            describe('and the chain is fine', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidchain(blockchain.chain)).toBe(true);
                });

            });
        });
    });

});