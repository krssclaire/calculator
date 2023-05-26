const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const pointButton = document.querySelector('.point');
const equalButton = document.querySelector('.equal');
const clearAllButton = document.querySelector('.clear-all');
const cancelButton = document.querySelector('.canc');
const signButton = document.querySelector('.sign');
const percentageButton = document.querySelector('.percentage');
const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');
let n1 = '';
let n2 = '';
let currentOperator = null;
let displayValue = '';
let negative = false;
let negativeVal;

equalButton.addEventListener('click', calculate);
clearAllButton.addEventListener('click', clearAll);
pointButton.addEventListener('click', appendPoint);
cancelButton.addEventListener('click', deleteDigit);
percentageButton.addEventListener('click', calculatePercentage);
signButton.addEventListener('click', changeSign);

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});

operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => setOperation(btn.textContent));
});

function appendNumber(num) {
    cleanFromDivisionByZero();
    if (resultDisplay.textContent.includes(negativeVal)) {
        displayValue = negativeVal;
    }
    displayValue += num;
    resultDisplay.textContent = displayValue;
}

function appendPoint() {
    cleanFromDivisionByZero();
    if (resultDisplay.textContent === '0' || resultDisplay.textContent === '' ) {
        displayValue = '0';
    }
    if (!resultDisplay.textContent.includes('.')) {
        displayValue += '.';
        resultDisplay.textContent = displayValue;
    } else {
        return null;
    }
}

function changeSign() {
    cleanFromDivisionByZero();
    if (negative) {
        resultDisplay.textContent = displayValue;
        negative = false;
    } else  {
        negativeVal = `-${displayValue}`;
        resultDisplay.textContent = negativeVal;
        negative = true;
    }
}

function deleteDigit() {
    cleanFromDivisionByZero();
    displayValue = displayValue.toString().slice(0, -1);
    resultDisplay.textContent = displayValue;
}

function setOperation(operator) {
    cleanFromDivisionByZero();
    operationDisplay.textContent = '';
    if (    (resultDisplay.textContent.includes(negativeVal)) || 
            (operationDisplay.textContent === '' && resultDisplay.textContent === '0') 
        ) {
        displayValue = resultDisplay.textContent;
    }
    if (currentOperator !== null) {
        calculate();
        currentOperator = operator;
        displayValue = resultDisplay.textContent;
        operationDisplay.textContent = `${displayValue} ${currentOperator}` ;
    } else {
        n1 = displayValue;
        currentOperator = operator;
        operationDisplay.textContent += `${n1} ${currentOperator} `;
    }
    displayValue = '';
}

function calculate() {
    cleanFromDivisionByZero();
    n2 = displayValue;
    if  (
            (!operationDisplay.textContent.includes(n1)) ||
            (!operationDisplay.textContent.includes(currentOperator)) 
        ) {
            displayValue = resultDisplay.textContent;
            operationDisplay.textContent = `= ${displayValue}`;
            n1 = displayValue;
    } else {
        operationDisplay.textContent = `${n1} ${currentOperator} ${n2} =`;
        if (currentOperator === ':' && n2 === '0') {
            resultDisplay.textContent = 'ERROR';
        } else {
            resultDisplay.textContent = roundResult(operate(currentOperator, n1, n2));
            displayValue = resultDisplay.textContent;
            n1 = displayValue;
            currentOperator = null;
        }
    }
}

function calculatePercentage() {
    cleanFromDivisionByZero();
    if (operationDisplay.textContent === '') {
        displayValue = n1 / 100;
        resultDisplay.textContent =  displayValue;
    }
    if (currentOperator !== null) {
        n2 = displayValue
        let percent = n1 * n2 / 100;
        resultDisplay.textContent = roundResult(operate(currentOperator, n1, percent));
        displayValue = resultDisplay.textContent;
    } 
}

function clearAll() {
    displayValue = '';
    currentOperator = null;
    n1 = '';
    n2 = '';
    operationDisplay.textContent = '';
    resultDisplay.textContent = '0';
    negative = false;
}

const roundResult = num => Math.round(num * 1000) / 1000;

const cleanFromDivisionByZero = () => {
    if (resultDisplay.textContent === 'ERROR') clearAll();
}

// Operate
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case ':':
            if (b === 0) {
                return null;
            } else {
                return divide(a, b);
            }
        case 'x':
            return multiply(a, b);
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
    }
}

//Keyboard input
window.addEventListener('keydown', useKeyboardInput);

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return ':';
    if (keyboardOperator === '*') return 'x';
}

function useKeyboardInput(e) {
    cleanFromDivisionByZero();
    if (e.key >= 0 && e.key <=9) appendNumber(e.key);
    if (e.key === '+' || e.key === '-') setOperation(e.key);
    if (e.key === '*' || e.key === '/') setOperation(convertOperator(e.key));
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearAll();
    if (e.key === '.') appendPoint();
    if (e.key === 'Backspace') deleteDigit();
    if (e.key === '%') calculatePercentage();
}