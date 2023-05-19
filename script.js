const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equal = document.querySelector('.equal');
const percentage = document.querySelectorAll('.percentage');
const display = document.querySelector('.text');
const result = document.querySelector('.subtext');
const clearAll = document.querySelectorAll('.clear-all');
const cancel = document.querySelectorAll('.canc');

let arr = [];
let n;
let n1;
let n2;


// Display numbers 
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        function displayNumbers() {
            let value =  e.target.textContent;
            arr.push(value);
            n = arr.join('');
            display.textContent = n; 
            console.log(n);
            
            cancel.forEach(canc => {
                canc.addEventListener('click', (e) => {
                    function deleteDigit() {
                        let corrected;
                        arr = n.split('');
                        arr.pop();
                        corrected = arr.join('');
                        console.log(corrected);
                        display.textContent = corrected;
                    }
                    deleteDigit();
                });
            });
        }
        displayNumbers();
    });
});

// Operate 
operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        display.textContent = ' ';
        arr = [];
        operator = e.target.textContent;
        console.log(operator);
        
        percentage.forEach(percent => {
            percent.addEventListener('click', (e) => {
                n2 = parseFloat(n) / 100;
                result.textContent = n2;
            });
        });

        equal.addEventListener('click', (e) => {
                n2 = parseFloat(n);
                operate(operator, n1, n2)
        });
        n1 = parseFloat(n, 10);
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
    if (n2 == 0) result.textContent = 'ERROR';
    console.log('ERROR');
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

/* Clean display and reset values */
clearAll.forEach(clear => {
    clear.addEventListener('click', (e) => {
        display.textContent = ' ';
        result.textContent = ' ';
        operator = ' ';
        arr = [];
        n1 = 0;
        n2 = 0;
    });
});