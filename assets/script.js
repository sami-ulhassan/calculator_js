let firstNumber, secondNumber = "";
let operatorValue = "";
let isOperator = false;
let firstNumberList = [];
let secondNumberList = [];
let isResult = false;
let isDecimal = false;

const numberElems = document.querySelectorAll(".number-btn");
const operatorElems = document.querySelectorAll(".operator-btn");
const displayEl = document.querySelector(".input-field");

const clearAllElem = document.querySelector("#clearAll");
const clearCurrentElem = document.querySelector("#clearCurrent");
const backspaceElem = document.querySelector("#backspace");

clearAllElem.addEventListener("click", () => {
    firstNumber, secondNumber = "";
    operatorValue = "";
    isOperator = false;
    firstNumberList = [];
    secondNumberList = [];
    isResult = false;
    isDecimal = false;
    const decimalEl = document.querySelector("#decimal")
    decimalEl.disabled = false;
    updateDisplay(0);
});

clearCurrentElem.addEventListener("click", () => {

    if (isOperator) {
        secondNumber = "";
        secondNumberList = [];
    }
    else {
        firstNumber = "";
        firstNumberList = [];
    }

    isDecimal = false;
    const decimalEl = document.querySelector("#decimal")
    decimalEl.disabled = false;

    updateDisplay(0);

});

backspaceElem.addEventListener("click", () => {
    if (!isOperator) {
        firstNumberList.pop();
        firstNumber = firstNumberList.join("");

        updateDisplay(firstNumber);
    }
    else {
        secondNumberList.pop();
        secondNumber = secondNumberList.join("");

        updateDisplay(secondNumber);
    }

})

displayEl.insertAdjacentText('afterbegin', 0);

numberElems.forEach(el => {
    el.addEventListener("click", function (e) {
        if (e.target.dataset.value == ".") {
            isDecimal = true;
            const decimalEl = document.querySelector("#decimal")
            decimalEl.disabled = true;
        }
        if (!isOperator) {
            if (isResult) {
                isResult = false;
                firstNumber = 0;
                firstNumberList = [];
            }

            let result = handleInputs(firstNumberList, e.target.dataset.value);
            firstNumber = result.number;
            firstNumberList = result.numberList;
            updateDisplay(firstNumber);
        }
        else {

            const activeOperatorEl = document.querySelector(".operator-btn.active");
            if (activeOperatorEl) activeOperatorEl.classList.toggle("active")

            let result = handleInputs(secondNumberList, e.target.dataset.value);
            secondNumber = result.number;
            secondNumberList = result.numberList;
            updateDisplay(secondNumber);
        }
    })
});

operatorElems.forEach(el => {
    el.addEventListener("click", function (e) {
        if (firstNumber) {
            isDecimal = false;
            const decimalEl = document.querySelector("#decimal")
            decimalEl.disabled = false;

            if (isOperator && (firstNumber && secondNumber) && e.target.dataset.value !== "=") {
                operateNumbers(operatorValue, firstNumber, secondNumber)
            }

            if (e.target.dataset.value !== "=") {
                isOperator = true;
                operatorValue = e.target.dataset.value;
                el.classList.add("active");
            }
            else if (e.target.dataset.value == "=") {
                operateNumbers(operatorValue, firstNumber, secondNumber)
            }
        }

    })
});

let addNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) + Number(secondNumber);
    appendResult(result);
}

let subtractNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) - Number(secondNumber);
    appendResult(result);
}

let multiplyNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) * Number(secondNumber);
    appendResult(result);
}

let divideNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) / Number(secondNumber);
    appendResult(result);
}

let operateNumbers = (operator, firstNumber, secondNumber) => {
    switch (operator) {
        case "/":
            divideNumbers(firstNumber, secondNumber);
            break;

        case "*":
            multiplyNumbers(firstNumber, secondNumber)
            break;

        case "+":
            addNumbers(firstNumber, secondNumber)
            break;

        case "-":
            subtractNumbers(firstNumber, secondNumber)
            break;
    }
}

let handleInputs = (numberList, inputValue) => {
    numberList.push(inputValue);
    numberList = formatZeros(numberList);
    let number = numberList.join("");

    return {number, numberList};
}

let formatResult = (rawResult) => {
    return (Math.round((Number(rawResult) + Number.EPSILON) * 1000000) / 1000000);
}

let formatZeros = (numberList) => {
    if (numberList && numberList[0] == "0" && numberList[1] == "0") {
        return ["0"];
    }
    return numberList;
}

let updateDisplay = (number) => {
    displayEl.textContent = "";
    displayEl.insertAdjacentText('afterbegin', number);
}

let appendResult = (result) => {
    isResult = true;
    firstNumber = result;
    let formattedResult = formatResult(result);
    secondNumberList = [];
    isOperator = false;
    updateDisplay(formattedResult);
}

