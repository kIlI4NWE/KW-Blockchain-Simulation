class Blockchain {
    constructor() {
        this.kette = [];
    }

    async blockHinzufügen(block, nodeID) {
        let lb = this.getLetztenBlock();
        block.data.moneyTable = lb ? lb.data.moneyTable : [];
        block.letzterHash = lb ? lb.createHash() : '';
        try {
            await block.mine();
            broadcaster.notify(nodeID);
            this.kette.push(Object.freeze(block));
            log(`Node ${nodeID} hat den Block gefunden! (${this.kette.length} Blocks insgesamt)`);
            //log(JSON.stringify(blockchain.kette))
        } catch (e) {
            console.log(e);
        }
    }

    blockValidieren() {
        let invaliderBlock = this.kette.find((aktuellerBlock, i) => {
            let letzterBlock = this.kette[i - 1];
            return letzterBlock && letzterBlock.createHash() != aktuellerBlock.letzterHash;
        });
        if (invaliderBlock) {
            return true;
        } else {
            return false;
        }
    }

    getLetztenBlock() {
        return this.kette[this.kette.length - 1];
    }
}
