const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equal = document.querySelectorAll('.equal');
const percentage = document.querySelectorAll('.percentage');
const display = document.querySelector('.text');
const result = document.querySelector('.subtext');
const clearAll = document.querySelector('.clear-all');
const cancel = document.querySelector('.canc');
const point = document.querySelector('.point');

let n = '';
let n1;
let n2;

// Clean display and reset values
clearAll.addEventListener('click', clearEverything);

function clearEverything() {
    display.textContent = ' ';
    result.textContent = ' ';
    operator = ' ';
    n = '';
    n1 = 0;
    n2 = 0;
}

// Display numbers 
numbers.forEach(number => {
    number.addEventListener('click', () => displayNumbers(number.textContent));
});

function displayNumbers(num) {
    n += num;
    display.textContent = n; 
    console.log(n);
}

//Add point
point.addEventListener('click', addPoint);

function addPoint() {
    if (display.textContent === '') {
        n = '0.';
        display.textContent = n;
    } else if (!display.textContent.includes('.')) {
        n += '.'
        display.textContent += n;
    }
}

// Cancel digits
cancel.addEventListener('click', deleteDigit);

function deleteDigit() {
    let newVal = n.slice(0, -1);
    n = newVal;
    console.log(n);
    display.textContent = n;
}

// Operate 
operators.forEach(op => {
    op.addEventListener('click', (e) => {
        op = ' ';
        display.textContent = ' ';
        op = e.target.textContent;
        console.log(op);
        
        percentage.forEach(percent => {
            percent.addEventListener('click', (e) => {
                n2 = (n) / 100;
                result.textContent = n2;
            });
        });

        equal.forEach(eq => {
            eq.addEventListener('click', (e) => {
                n2 = (n);
                operate(op, n1, n2)
            ;});
        })

        n1 = (n);
    });
});

const add = (n1, n2) => result.textContent = n1 + n2;
const subtract = (n1, n2) => result.textContent = n1 - n2;
const multiply = (n1, n2) => result.textContent = n1 * n2;
const divide = (n1, n2) => {
    if (n2 == 0) {
        result.textContent = 'ERROR';
    } else {
        result.textContent = n1 / n2;
   }
}

function operate(operator, n1, n2) {
    n1 = Number(n1);
    n2 = Number(n2);
    switch (operator) {
        case ':':
            return divide(n1, n2);
        case 'x':
            return multiply(n1, n2);
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
    }
}

// Keyboard input
window.addEventListener('keydown', useKeyboard);

function useKeyboard(e) {
    if (e.key >= 0 && e.key <= 9) displayNumbers(e.key);
    if (e.key === 'Backspace') deleteDigit();
    if (e.key === '.') addPoint();
    if (e.key === 'Escape') clearEverything();
}