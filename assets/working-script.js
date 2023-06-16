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