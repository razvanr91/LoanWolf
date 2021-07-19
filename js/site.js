// values for end results

let monthlyPayment = 0;
let totalPrincipal = 0;
let totalInterest = 0;
let totalCost = 0;

// get other elements

let button = document.getElementById("wolfBtn");
let monthlyPaymentElement = document.getElementById("monthlyPayment");
let totalPrincipalElement = document.getElementById("totalPrincipal");
let totalInterestElement = document.getElementById("totalInterest");
let totalCostElement = document.getElementById("totalCost");
let tableBody = document.getElementById("tableBody");


function start() {
    // get values
    let loanAmount = document.getElementById("loanAmount").value;
    let payments = document.getElementById("payments").value;
    let rate = document.getElementById("rate").value;

    // convert values to integers
    loanAmount = Number.parseInt(loanAmount);
    payments = Number.parseInt(payments);
    rate = Number.parseInt(rate);

    // check if conversion was successfull

    let success = Number.isInteger(loanAmount) && Number.isInteger(payments) && Number.isInteger(rate) ? true : false;

    if (!success) {
        console.log(`${loanAmount} ${payments} ${rate}`)
        alert("You need to enter integer values in order to continue...");
    } else {
        getNumbers(loanAmount, payments, rate);
        emptyElements();
        printResults(payments, rate, loanAmount);
    }
}

function getNumbers(loanAmount, payments, rate) {
    // calculate rates
    monthlyPayment = ((loanAmount) * (rate / 1200) / (1 - (Math.pow(1 + rate / 1200, -payments))));
    totalPrincipal = loanAmount;
    totalCost = (monthlyPayment * payments);
    totalInterest = (totalCost - totalPrincipal);
}

// empty all elements for next use
function emptyElements() {
    monthlyPaymentElement.innerHTML = "";
    totalPrincipalElement.innerHTML = "";
    totalInterestElement.innerHTML = "";
    totalCostElement.innerHTML = "";
    tableBody.innerHTML = "";
}

function printResults(payments, rate, loanAmount) {
    // return values to top elements
    monthlyPaymentElement.innerHTML += `$${monthlyPayment.toFixed(2)}`;
    totalPrincipalElement.innerHTML += `$${loanAmount}`;
    totalInterestElement.innerHTML += `$${totalInterest.toFixed(2)}`;
    totalCostElement.innerHTML += `$${totalCost.toFixed(2)}`

    // create variables to keep up with payments
    let balance = loanAmount;
    let currentInterest = balance * (rate / 1200);
    let principal = monthlyPayment - currentInterest;
    let totalInterestPaid = currentInterest;
    balance -= principal;

    // insert values in table
    for (let i = 1; i <= payments; i++) {
        tableBody.innerHTML += `
            <tr>
                <th scope="row">${i}</th> 
                <td>$${monthlyPayment.toFixed(2)}</td> 
                <td>$${principal.toFixed(2)}</td> 
                <td>$${currentInterest.toFixed(2)}</td>
                <td>$${totalInterestPaid.toFixed(2)}</td>
                <td>$${balance.toFixed(2)}</td>
            </tr>
        `;

        // update values
        currentInterest = balance * (rate / 1200);
        principal = monthlyPayment - currentInterest;
        totalInterestPaid += currentInterest;
        balance -= principal;
    }
}

button.addEventListener('click', start);