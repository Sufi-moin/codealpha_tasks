const display = document.getElementById("display");
const previous = document.getElementById("previous");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

function number(value) {
    if (display.value === "0" || waitingForSecondNumber) {
        display.value = value;
        waitingForSecondNumber = false;
    } else {
        display.value += value;
    }
}

function decimal() {
    if (waitingForSecondNumber) {
        display.value = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

function chooseOperator(selectedOperator) {
    const currentNumber = parseFloat(display.value);

    if (operator && waitingForSecondNumber) {
        operator = selectedOperator;
        return;
    }

    if (firstNumber === "") {
        firstNumber = currentNumber;
    } else if (operator) {
        const result = calculateResult(
            firstNumber,
            currentNumber,
            operator
        );

        display.value = result;
        firstNumber = result;
    }

    operator = selectedOperator;
    waitingForSecondNumber = true;

    previous.textContent =
        firstNumber + " " + getOperatorSymbol(operator);
}

function calculate() {
    if (operator === "" || firstNumber === "") {
        return;
    }

    const secondNumber = parseFloat(display.value);

    const result = calculateResult(
        firstNumber,
        secondNumber,
        operator
    );

    previous.textContent =
        firstNumber +
        " " +
        getOperatorSymbol(operator) +
        " " +
        secondNumber +
        " =";

    display.value = result;

    firstNumber = "";
    operator = "";
    waitingForSecondNumber = true;
}

function calculateResult(first, second, operator) {
    let result;

    switch (operator) {
        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":
            if (second === 0) {
                return "Error";
            }
            result = first / second;
            break;

        default:
            return second;
    }

    return Number.isInteger(result)
        ? result
        : parseFloat(result.toFixed(10));
}

function getOperatorSymbol(operator) {
    if (operator === "*") return "×";
    if (operator === "/") return "÷";
    if (operator === "-") return "−";
    return "+";
}

function clearAll() {
    display.value = "0";
    previous.textContent = "";
    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
}

function deleteLast() {
    if (
        display.value === "Error" ||
        display.value.length === 1
    ) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function percentage() {
    const value = parseFloat(display.value);

    if (!isNaN(value)) {
        display.value = value / 100;
    }
}

/* Keyboard Support */

document.addEventListener("keydown", function(event) {

    if (event.key >= "0" && event.key <= "9") {
        number(event.key);
    }

    else if (event.key === ".") {
        decimal();
    }

    else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
    ) {
        chooseOperator(event.key);
    }

    else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (event.key === "Backspace") {
        deleteLast();
    }

    else if (event.key === "Escape") {
        clearAll();
    }

    else if (event.key === "%") {
        percentage();
    }
});
