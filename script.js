const inputBox = document.getElementById("input")
const numbers = document.querySelectorAll("button.number")
const operations = document.querySelectorAll("button.operation")
const equalsButton = document.getElementById("equals")
const clearButton = document.getElementById("clear")

var currentOperation;
var firstNum = "0";
var error = false;

// Add event listener for numbers
for(let number of numbers) {
    number.addEventListener("click", function(event) {numberClicked(event)})
}

// Add event listeners for operations
for(let operation of operations) {
    operation.addEventListener("click", function(event) {operationClicked(event)})
}

function numberClicked(event) {
    if(error) return

    // Clear input box if an operation is selected
    if(firstNum == inputBox.value) {
        inputBox.value = "";
    }
    inputBox.value += event.currentTarget.innerText;
}

function operationClicked(event) {
    if(error) return

    firstNum = inputBox.value
    currentOperation = event.currentTarget.id;
}

equalsButton.addEventListener("click", (event) => {
    if(error) return

    let secondNumber = parseFloat(inputBox.value)
    if(secondNumber == 0) {
        inputBox.value = "ERROR"
        error = true
        return
    }
    firstNum, inputBox.value = eval(parseFloat(firstNum) + currentOperation +  secondNumber);
})

clearButton.addEventListener("click", () => {
    clear()
})

function clear() {
    error = false
    firstNum = "0"
    inputBox.value = "0"
}
