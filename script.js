const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const equalButton = document.querySelector('.equal');

const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result'); // input / output

let n1 = '';
let n2 = '';
let currentOperator = '';
let displayValue = '';

equalButton.addEventListener('click', calculate);

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});
operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => setOperation(btn.textContent));
})

function appendNumber(num) {
    displayValue += num;
    resultDisplay.textContent = displayValue;
    //operationDisplay.textContent += displayValue;
}

function setOperation(operator) {
    n1 = displayValue;
    currentOperator = operator;
    operationDisplay.textContent += `${n1} ${currentOperator} `;
    displayValue = '';

    //if (currentOperator === '=') operate();
    
}

function calculate() {
    n2 = displayValue;
    operationDisplay.textContent += `${n2} =`
    resultDisplay.textContent = operate(currentOperator, n1, n2);
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
            return divide(a, b);
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
    if (e.key >= 0 && e.key <=9) appendNumber(e.key);
    if (e.key === '+' || e.key === '-') setOperation(e.key);
    if (e.key === '*' || e.key === '/') setOperation(convertOperator(e.key));
    if (e.key === 'Enter') calculate();
}

/*
const numbersBtn = document.querySelectorAll('.numbers');
const pointBtn = document.querySelector('.point');
const operatorsBtn = document.querySelectorAll('.operators');
const equalBtn = document.querySelectorAll('.equal');
const percentageBtn = document.querySelectorAll('.percentage');
const clearBtn = document.querySelector('.clear-all');
const deleteBtn = document.querySelector('.canc');
const operationDisplay = document.querySelector('.operation');
const currentValueDisplay = document.querySelector('.current-value');

let val = '';
let currentOperator = null;
let n1 = '';
let n2 = '';
let cleanOperationDisplay = false;

numbersBtn.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});
pointBtn.addEventListener('click', appendPoint);
operatorsBtn.forEach(btn => {
    btn.addEventListener('click', () => getOperation(btn.textContent));
});
equalBtn.forEach(btn => {
    btn.addEventListener('click', execute);
});
percentageBtn.forEach(btn => {
    btn.addEventListener('click', calculatePercent);
});
clearBtn.addEventListener('click', clearEverything);
deleteBtn.addEventListener('click', deleteDigit);


function appendNumber(num) {
    if (cleanOperationDisplay) resetOperationDisplay();
    currentValueDisplay.textContent += num;
}

function appendPoint() {
    if (cleanOperationDisplay) resetOperationDisplay();
    if (currentValueDisplay.textContent === '') currentValueDisplay.textContent = '0';;
    if (currentValueDisplay.textContent.includes('.')) 
        currentValueDisplay.textContent += '.';

}
//??
function getOperation(operator) {
    n1 = Number(val);
    val = '';
    if (currentOperator !== '') {
        n1 += val;
        execute();
    }
    currentOperator = operator;
    operationDisplay.textContent = `${n1} ${operator}`;
}
//??
function execute() {
    n2 = currentValueDisplay.textContent;
    operationDisplay.textContent += ` ${n2} =`;
    operate(currentOperator, n1, n2);
}
//??
function calculatePercent() {
    n2 = (n) / 100;
    currentValueDisplay.textContent = n2;
}

function resetOperationDisplay() {
    operationDisplay.textContent = '';
    cleanOperationDisplay = false;
}

function clearEverything() {
    currentOperator = null;
    n1 = '';
    n2 = '';
    console.clear();
    currentValueDisplay.textContent = '';
    resetOperationDisplay();
}

function deleteDigit() {
    currentValueDisplay.textContent = currentValueDisplay.textContent.toString().slice(0, -1);
}

const add = (a, b) => currentValueDisplay.textContent = a + b;
const subtract = (a, b) => currentValueDisplay.textContent = a - b;
const multiply = (a, b) => currentValueDisplay.textContent = a * b;
const divide = (a, b) => currentValueDisplay.textContent = a / b;

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case ':':
            if (b == 0) {
                currentValueDisplay.textContent = 'ERROR';
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

// Keyboard input
window.addEventListener('keydown', useKeyboard);

function useKeyboard(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === 'Backspace') deleteDigit();
    if (e.key === '.') appendPoint();
    if (e.key === 'Escape') clearEverything();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (e.key === '*') e.key = 'x';
        if (e.key === '/') e.key = ':';
        getOperation(e.key);
    }
    if (e.key === 'Enter') execute();
}
*/