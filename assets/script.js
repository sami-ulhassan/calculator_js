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
    displayEl.innerHTML = "";
    displayEl.insertAdjacentText('afterbegin', 0);

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

    displayEl.innerHTML = "";
    displayEl.insertAdjacentText('afterbegin', 0);

});

backspaceElem.addEventListener("click", () => {
    if (!isOperator) {
        firstNumberList.pop();
        console.log("first Number list", firstNumberList);
        firstNumber = firstNumberList.join("");
        console.log("first number", firstNumber);

        displayEl.innerHTML = "";
        displayEl.insertAdjacentText('afterbegin', firstNumber);
    }
    else {
        secondNumberList.pop();
        console.log("second Number list", secondNumberList);

        secondNumber = secondNumberList.join("");
        console.log("second number", secondNumber);

        displayEl.innerHTML = "";
        displayEl.insertAdjacentText('afterbegin', secondNumber);
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
            firstNumberList.push(e.target.dataset.value);
            console.log("first Number list", firstNumberList);
            firstNumber = firstNumberList.join("");
            console.log("first number", firstNumber);

            displayEl.innerHTML = "";
            displayEl.insertAdjacentText('afterbegin', firstNumber);
        }
        else {

            const activeOperatorEl = document.querySelector(".operator-btn.active");
            if (activeOperatorEl) activeOperatorEl.classList.toggle("active")

            secondNumberList.push(e.target.dataset.value);
            console.log("second Number list", secondNumberList);

            secondNumber = secondNumberList.join("");
            console.log("second number", secondNumber);

            displayEl.innerHTML = "";
            displayEl.insertAdjacentText('afterbegin', secondNumber);
        }
    })
});

operatorElems.forEach(el => {
    el.addEventListener("click", function (e) {
        isDecimal = false;
        const decimalEl = document.querySelector("#decimal")
        decimalEl.disabled = false;

        if (e.target.dataset.value !== "=") {
            isOperator = true;
            operatorValue = e.target.dataset.value;
            el.classList.add("active");
        }
        else {
            operateNumbers(operatorValue, firstNumber, secondNumber)
        }
    })
});

let addNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) + Number(secondNumber);
    appendResult(result);
    console.log("result ==", result);
}

let subtractNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) - Number(secondNumber);
    appendResult(result);
    console.log("result ==", result);
}

let multiplyNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) * Number(secondNumber);
    appendResult(result);
    console.log("result ==", result);
}

let divideNumbers = (firstNumber, secondNumber) => {
    let result = Number(firstNumber) / Number(secondNumber);
    appendResult(result);
    console.log("result ==", result);
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

let appendResult = (result) => {
    isResult = true;
    firstNumber = result;
    secondNumberList = [];
    isOperator = false;
    displayEl.innerHTML = "";
    displayEl.insertAdjacentText('afterbegin', result);

}