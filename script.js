const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equal = document.querySelectorAll('.equal');
const percentage = document.querySelector('.percentage');
const display = document.querySelector('.text');
const result = document.querySelector('.subtext');
const clearAll = document.querySelectorAll('.clear-all');


let n;
let n1;
let n2;


// Display numbers 
numbers.forEach(number => {
    number.addEventListener('click', displayNumbers);
});

function displayNumbers(e) {
    n = e.target.textContent;
    display.textContent = n;
    /*
    let text = document.createTextNode(e.target.textContent);
    n = display.appendChild(text); */
    console.log(n);
}

/* Operate */
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        operator = e.target.textContent;
        console.log(operator);

        equal.forEach(eq => {
            eq.addEventListener('click', (e) => {
                n2 = parseInt(n, 10);
                console.log(n2);
                operate(operator, n1, n2)
            });
        });
        n1 = parseInt(n, 10);
    });
});


const add = (n1, n2) => {
    result.textContent = n1 + n2;
    console.log(n1+n2);
}
const subtract = (n1, n2) => {
    result.textContent = n1 - n2;
    console.log(n1-n2);
}
const multiply = (n1, n2) => {
    result.textContent = n1 * n2;
    console.log(n1*n2);
}
const divide = (n1, n2) => {
    result.textContent = n1 / n2;
    console.log(n1/n2);
}

function operate(operator, n1, n2) {
    switch (operator) {
        case '+':
            add(n1, n2);
            break;
        case '-':
            subtract(n1, n2);
            break;
        case '*':
            multiply(n1, n2);
            break;
        case '/':
            divide(n1, n2);
            break;
        }
}

/* Clean display */
clearAll.forEach(clear => {
    clear.addEventListener('click', (e) => {
        display.textContent = ' ';
        result.textContent = ' ';
    });
});