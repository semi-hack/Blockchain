const Blockchain = require('./index');
const Block = require('./block');
const cryptoHash = require('../util/crypto-hash');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();

        originalChain = blockchain.chain;
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

    describe('isValidChain()', () => {
        describe('When the chain does not start with a genesis Block', () => {
            it('it returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis'}

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

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

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });

            });

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'bad data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            // describe('and the chain contains a block with a jumped difficulty', () => {
            //     it('return false', () => {
            //         const lastBlock = blockchain.chain[blockchain.chain.length];
            //         const lasthash = lastBlock.hash;

            //         const timestamp = Date.now();
            //         const nonce = 0;
            //         const data = [];
            //         const difficulty = lastBlock.difficulty - 3;
            //         const hash = cryptoHash( timestamp, lasthash, difficulty, nonce, data);
            //         const badBlock = new Block({ 
            //             timestamp, lasthash, hash, nonce, difficulty, data 
            //         });

            //         blockchain.chain.push(badBlock);

            //         expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            //     });
            // });

            // describe('and the chain does not contain any invalid block', () => {
            //     it('returns true', () => {

            //         expect(Blockchain.isValidchain(blockchain.chain)).toBe(true);
            //     });

            // });
        });
    });

    describe('replaceChain()', () => {
        let errorMock, LogMock

        beforeEach(() => {
            errorMock = jest.fn();
            LogMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = LogMock;
        });
        
        describe('when the new chain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = { new: 'chain' };
        
                blockchain.replaceChain(newChain.chain);
            });

            it('does not replace the chain', () => {
                expect(blockchain.chain).toEqual(originalChain);
            });

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data : 'one' });
                newChain.addBlock({ data : 'two' });
                newChain.addBlock({ data: 'three'});
            });

            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'some-faske-hash';

                    blockchain.replaceChain(newChain.chain);
                });

                it('does not replace the chain', () => {
                    expect(blockchain.chain).toEqual(originalChain);
                });

                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            // describe('and the chain is valid', () => {
            //     it('replaces the chain', () => {
                    
            //         blockchain.replaceChain(newChain.chain);

            //         expect(blockchain.chain).toEqual(newChain.chain);
            //     });

            // });
        });

    });

});