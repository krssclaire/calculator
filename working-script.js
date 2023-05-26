// Working Script from 'Add functions' commit

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




/*
const numberBtns = document.querySelectorAll('.numbers');
const operatorBtns = document.querySelectorAll('.operators');
const equalsBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear-all');
const deleteBtn = document.querySelector('.canc');
const pointBtn = document.querySelector('.point');
const operationDisplay = document.querySelector('.operation');
const currentValueDisplay = document.querySelector('.current-value');

let n1 = '';
let n2 = '';
let currentOperation = null;
let cleanCurrentValueDisplay = false;

equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
pointBtn.addEventListener('click', appendPoint);

numberBtns.forEach((btn) =>
  btn.addEventListener('click', () => appendNumber(btn.textContent))
);

operatorBtns.forEach((btn) =>
  btn.addEventListener('click', () => setOperation(btn.textContent))
);

function appendNumber(number) {
    if (currentValueDisplay.textContent === '0' || cleanCurrentValueDisplay) {    
        resetScreen();
    }
    currentValueDisplay.textContent += number;
}

function resetScreen() {
  currentValueDisplay.textContent = '';
 cleanCurrentValueDisplay = false;
}

function clear() {
  currentValueDisplay.textContent = '0';
  operationDisplay.textContent = '';
  n1 = '';
  n2 = '';
  currentOperation = null;
}

function appendPoint() {
  if  (cleanCurrentValueDisplay) resetScreen();
  if (currentValueDisplay.textContent === '') {
    currentValueDisplay.textContent = '0';
  }
  if (currentValueDisplay.textContent.includes('.')) {
    currentValueDisplay.textContent += '.';
  }
}

function deleteNumber() {
    currentValueDisplay.textContent = currentValueDisplay.textContent
        .toString()
        .slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    n1 = currentValueDisplay.textContent;
    currentOperation = operator;
    operationDisplay.textContent = `${n1} ${currentOperation}`;
    cleanCurrentValueDisplay = true;
}

function evaluate() {
  if (currentOperation === null || cleanCurrentValueDisplay) return
  if (currentOperation === ':' && currentValueDisplay.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  n2 = currentValueDisplay.textContent
  currentValueDisplay.textContent = roundResult(
    operate(currentOperation, n1, n2)
  )
  operationDisplay.textContent = `${n1} ${currentOperation} ${n2} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return subtract(a, b)
    case '×':
      return multiply(a, b)
    case ':':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}

// Use keyboard input
window.addEventListener('keydown', useKeyboardInput);

function useKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }

  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return ':'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
  }
*/
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

let val1 = '';
let val2 = '';
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
    if (currentValueDisplay.textContent === '') {
        currentValueDisplay.textContent = '0';
    }
    if (!currentValueDisplay.textContent.includes('.')) {
        currentValueDisplay.textContent += '.';
    }
}
//??
function getOperation(operator) {
    if (currentOperator !== null) execute();
    n1 = operationDisplay.textContent;
    currentOperator = operator;
    currentValueDisplay.textContent = `${n1} ${currentOperator}`;
    cleanOperationDisplay = true;
}
//??
function execute() {
    n2 = operationDisplay.textContent;
    operationDisplay.textContent = Math.round(operate(currentOperator, n1, n2) * 1000) / 1000
    currentValueDisplay.textContent = `${n1} ${currentOperator} ${n2} =`;
    currentOperator = null;
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
    val1 = '';
    val2 = '';
    n1 = '';
    n2 = '';
    currentValueDisplay.textContent = '';
    operationDisplay.textContent = '';
    console.clear();
}

function deleteDigit() {
    currentValueDisplay.textContent = currentValueDisplay.textContent.toString().slice(0, -1);
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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