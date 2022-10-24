class MiningNode {

  isMining = false;
  aktuellerBlock;

  constructor(id, name) {
      this.id = id;
      this.name = name;
      this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
      renderCurrentTransactions(this.blockData.transactions);
      broadcaster.subscribe((nodeID) => {
          console.log('Nachricht empfangen:', nodeID);
          if (nodeID !== this.id) {
              this.killAktuellenBlock();
          }
      });

      newTransaction.subscribe((transaction) => {
          this.blockData.transactions.push(transaction);
          renderCurrentTransactions(this.blockData.transactions);
      });
  }

  toggle() {
      this.isMining = !this.isMining;
      if (this.isMining) {
          this.mine();
      } else {
          this.killAktuellenBlock();
      }
  }

  killAktuellenBlock() {
      if (this.aktuellerBlock) {
          this.aktuellerBlock.kill = true;
      }
      this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
  }

  async mine() {
      renderCurrentTransactions(this.blockData.transactions);
      this.aktuellerBlock = new Block(Date.now(), this.blockData);
      await blockchain.blockHinzufügen(this.aktuellerBlock, this.id);
      if (this.isMining) {
          this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
          this.mine();
      }
  }
}
