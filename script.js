let n1;
let n2;
let operator;

function add(n1, n2) {
    return n1 + n2;
}
function subtract(n1, n2) {
    return n1 - n2;
}
function multiply(n1, n2) {
    return n1 * n2;
}
function divide(n1, n2) {
    return n1 / n2;
}

function operate(operator, n1, n2) {
    
    switch (operator) {
        case '+':
            return add(n1, n2);
            break;
        case '-':
            return subtract(n1, n2);
            break;
        case '*':
            return multiply(n1, n2);
            break;
        case '/':
            return divide(n1, n2);
            break;
    }
/*
    if (operator == '+') {
        return add(n1, n2);
    } else if (operator == '-') {
        return subtract(n1, n2);
    } else if (operator == ' *') {
        return multiply(n1, n2);
    } else {
        return divide(n1, n2);
    }*/
}

