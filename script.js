const inputBox = document.getElementById("input")
const numbers = document.querySelectorAll("button.number")
const operations = document.querySelectorAll("button.operation")
const equalsButton = document.getElementById("equals")
const clearButton = document.getElementById("clear")

var validOperation = true;
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
    if(inputBox.value == '0') {
        inputBox.value = "";
    }
    validOperation = true;
    inputBox.value += event.currentTarget.innerText;
}

function operationClicked(event) {
    if(error || !validOperation) return

    validOperation = false;
    inputBox.value += event.currentTarget.innerText;
}

equalsButton.addEventListener("click", (event) => {
    if(error) return

    if(isNaN(parseInt(inputBox.value.charAt(inputBox.value.length-1)))) {
        inputBox.value = "ERROR"
        error = true
        return
    }
    let answer = computeInput(inputBox.value.split(/(?=[+\*/-])|(?<=[+\*/-])/g))

    inputBox.value = answer

    if(answer == "ERROR") {
        error = true
    }
})

clearButton.addEventListener("click", () => {
    clear()
})

function computeInput(input) {
    console.log(input)
    if(input.length == 1) {
        return input[0]
    }
    if(input[0] == '-') {
        input.splice(0, 2, `-${input[1]}`)
    }
    let operation = 0, operationIndex = 0
    for(let i = 0; i < input.length; i++) {
        switch(input[i]) {
            case '+':
                if(operation == 0) {
                    operation = 1
                    operationIndex = i
                }

                break
            case '-':
                if(operation == 0) {
                    operation = 2
                    operationIndex = i
                }

                break
            case '*':
                input.splice(i - 1, 3, multiply(parseInt(input[i-1]), parseInt(input[i+1])))

                return computeInput(input)
            case '/':
                input.splice(i - 1, 3, divide(parseInt(input[i-1]), parseInt(input[i+1])))

                return computeInput(input)
            default:

        }
    }
    if(operation == 1) {
        input.splice(operationIndex - 1, 3, add(parseInt(input[operationIndex-1]), parseInt(input[operationIndex+1])))
        return computeInput(input)
    }
    else if(operation == 2){
        input.splice(operationIndex - 1, 3, subtract(parseInt(input[operationIndex-1]), parseInt(input[operationIndex+1])))
        return computeInput(input)
    }

    // Uh oh
    return -1
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function clear() {
    error = false
    inputBox.value = "0"
    validOperation = true;
}