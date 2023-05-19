const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equal = document.querySelectorAll('.equal');
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
operators.forEach(op => {
    op.addEventListener('click', (e) => {
        op = ' ';
        display.textContent = ' ';
        arr = [];
        op = e.target.textContent;
        console.log(op);
        
        percentage.forEach(percent => {
            percent.addEventListener('click', (e) => {
                n2 = parseFloat(n) / 100;
                result.textContent = n2;
            });
        });

        equal.forEach(eq => {
            eq.addEventListener('click', (e) => {
                n2 = parseFloat(n);
                operate(op, n1, n2)
            ;});
        })

        n1 = parseFloat(n);
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
    if (n2 == 0) {
        result.textContent = 'ERROR';
        console.log('ERROR');
    } else {
        result.textContent = n1 / n2;
        console.log(n1/n2);
    }
}

function operate(operator, n1, n2) {
    switch (operator) {
        case ':':
            divide(n1, n2);
            break;
        case 'x':
            multiply(n1, n2);
            break;
        case '+':
            add(n1, n2);
            break;
        case '-':
            subtract(n1, n2);
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