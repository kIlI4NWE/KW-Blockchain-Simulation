let node1 = new MiningNode(1, 'User 1');
let node2 = new MiningNode(2 , 'User 2');
let blockchain = new Blockchain();
let CHART_DATA = {
    amounts: [0, 0, 0],
    labels: ['', '', '']
};

function startNode1() {
    log('Toggle Node 1');
    n1.classList.toggle('pause-btn');
    node1.toggle();
}

function startNode2() {
    log('Toggle Node 2');
    n2.classList.toggle('pause-btn');
    node2.toggle();
}

function sendMoney() {
    console.log(from.value, to.value, amount.value);
    newTransaction.notify({
        from: from.value,
        to: to.value,
        amount: +amount.value
    });
}

function blockInfos() {
    var number = "123";
}

function log(text) {
    let hours = ('0' + new Date().getHours()).slice(-2);
    let minutes = ('0' + new Date().getMinutes()).slice(-2);
    logs.innerHTML += `<div class="mb-16">
    <code>
    <i>${hours}:${minutes}</i> ${text}
    </code></div>`;
}

function updateGraphData(moneyTable) {
    moneyTable.forEach((entry, index) => {
        CHART_DATA.amounts[index] = entry.amount;
        CHART_DATA.labels[index] = entry.name;
    });
    myChart.update();
}

function renderCurrentTransactions(transactions) {
    transactionContainer.innerHTML = '<h2>Transaktionen</h2>';
    transactions.forEach(ta => {
        transactionContainer.innerHTML +=
            `<div class="card mb-16">${ta.from} ➔ ${ta.to} $${ta.amount}</div>`;
    });

}
