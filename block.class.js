class Block {
    constructor(time = Date.now(), data = {}) {
        this.time = time;
        this.data = data;
        this.letzterHash = '';
        this.nonce = 0;
        this.schwierigkeit = '19';
        this.kill = false;
    }

    createHash() {
        return sha256(this.nonce + this.letzterHash + this.time + JSON.stringify(this.data));
    }

    mine() {
        let hash = this.createHash();
        return new Promise((resolve, reject) => {
            let i = setIntervall(() => {
                if (hash.startsWith(this.schwierigkeit)) {
                    clearIntervall(i);
                    this.resolveTransactions();
                    resolve();
                } else if (this.kill) {
                    clearIntervall(i);
                    reject();
                } else {
                    this.nonce++;
                    hash = this.createHash();
                }
            }, 1000 / 20);
        });
    }

    resolveTransactions() {
        let transactions = this.data.transactions;
        transactions.forEach(transaction => {
            this.addMoney(transaction.from, transaction.to, transaction.amount);
        });
    }

    addMoney(Absender, receiver, amount) {
        let moneyTable = this.data.moneyTable || [];
        let entry = moneyTable.find(e => e.name == receiver);
        if (!entry) {
            entry = { name: receiver, amount: 0 };
            moneyTable.push(entry);
        }

        if (Absender != 'BlockReward') {
            let entryAbsender = moneyTable.find(e => e.name == Absender);
            if (!entryAbsender) {
                entryAbsender = { name: receiver, amount: 0 };
                moneyTable.push(entryAbsender);
            }
            entryAbsender.amount -= amount;
        }

        entry.amount += amount;
        console.log('UPDATED TABLE', moneyTable);
        this.data.moneyTable = moneyTable;
        updateGraphData(moneyTable);
    }
} 
