const buttons = document.querySelectorAll('.grid div');
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
    if (resultDisplay.textContent === 'ERROR') clearAll();
    displayValue += num;
    resultDisplay.textContent = displayValue;
}

function appendPoint() {
    if (resultDisplay.textContent === 'ERROR') clearAll();
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
    if (resultDisplay.textContent === 'ERROR') clearAll();
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
    if (resultDisplay.textContent === 'ERROR') clearAll();
    displayValue = displayValue.toString().slice(0, -1);
    resultDisplay.textContent = displayValue;
}

function setOperation(operator) {
    if (resultDisplay.textContent === 'ERROR') clearAll();
    operationDisplay.textContent = '';
    if (resultDisplay.textContent.includes('-')) displayValue = negativeVal;
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
    if (resultDisplay.textContent === 'ERROR') clearAll();
    n2 = displayValue;
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

function calculatePercentage() {
    if (resultDisplay.textContent === 'ERROR') clearAll();
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
}

const roundResult = num => Math.round(num * 1000) / 1000;

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
    if (resultDisplay.textContent === 'ERROR') clearAll();
    if (e.key >= 0 && e.key <=9) appendNumber(e.key);
    if (e.key === '+' || e.key === '-') setOperation(e.key);
    if (e.key === '*' || e.key === '/') setOperation(convertOperator(e.key));
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearAll();
    if (e.key === '.') appendPoint();
    if (e.key === 'Backspace') deleteDigit();
    if (e.key === '%') calculatePercentage();
}