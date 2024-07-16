let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyUnit = [
    ["PENNY", 0.01], 
    ["NICKEL", 0.05], 
    ["DIME", 0.1], 
    ["QUARTER", 0.25], 
    ["ONE", 1.00], 
    ["FIVE", 5.00], 
    ["TEN", 10.00], 
    ["TWENTY", 20.00], 
    ["ONE HUNDRED", 100.00]
];

function calculateChange(price, cash, cid) {
    let changeDue = cash - price;
    let changeArray = [];
    let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (changeDue === 0) {
        return { status: "EXACT_CASH", change: [] };
    } else if (totalCid < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
        let remainingCid = JSON.parse(JSON.stringify(cid));
        for (let i = currencyUnit.length - 1; i >= 0; i--) {
            let coinName = currencyUnit[i][0];
            let coinValue = currencyUnit[i][1];
            let coinTotal = remainingCid[i][1];
            let coinUsed = 0;

            while (changeDue >= coinValue && coinTotal > 0) {
                changeDue -= coinValue;
                changeDue = Math.round(changeDue * 100) / 100;
                coinTotal -= coinValue;
                coinUsed += coinValue;
            }

            if (coinUsed > 0) {
                changeArray.push([coinName, coinUsed]);
                remainingCid[i][1] = coinTotal;
            }
        }

        if (changeDue > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        } else if (remainingCid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2) == 0) {
            return { status: "CLOSED", change: changeArray };
        } else {
            return { status: "OPEN", change: changeArray };
        }
    }
}

document.getElementById('purchase-btn').addEventListener('click', function() {
    let cash = parseFloat(document.getElementById('cash').value);
    let result = calculateChange(price, cash, cid);
    let changeDueDiv = document.getElementById('change-due');

    changeDueDiv.innerHTML = ""; 

    if (result.status === "INSUFFICIENT_FUNDS") {
        changeDueDiv.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
        changeDueDiv.innerText = "Status: CLOSED";
        result.change.forEach(change => {
            changeDueDiv.innerHTML += ` ${change[0]}: $${change[1].toFixed(2)}`;
        });
    } else if (result.status === "EXACT_CASH") {
        changeDueDiv.innerText = "No change due - customer paid with exact cash";
    } else if (result.status === "OPEN") {
        changeDueDiv.innerText = "Status: OPEN";
        result.change.forEach(change => {
            changeDueDiv.innerHTML += ` ${change[0]}: $${change[1].toFixed(2)}`;
        });
    }
});
