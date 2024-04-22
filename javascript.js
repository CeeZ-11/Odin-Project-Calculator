const buttons = document.querySelectorAll('.buttons');
const opers  = document.querySelectorAll('button.numbers, button.orange-operator');
const keyBt  = document.querySelectorAll('#buttons button');

const clearDis = document.getElementById('clear');
const backSpace = document.getElementById('backspace');
const display = document.getElementById('disp');
const operatorCharacters = ['+', '-', '÷', '×', '%'];
const comp = document.getElementById('comp');
const equal  = document.getElementById('equal');
const decimal = document.getElementById('decimal');
const changeSign = document.getElementById('change-sign');
const lightMode = document.getElementById('sun');
const darkMode = document.getElementById('moon');
const container = document.getElementById('container');
const modes = document.getElementById('modes');
const screen = document.getElementById('display');
const numKeys = document.querySelectorAll('button.numbers, button#decimal');

let operand = '';
let operator = '';
let secOperand = '';
let operFlag = 0;
let result = 0;
let roundedNum = 0;
let floatResult = 0;

display.innerHTML = '';

function add(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
        return a + b; 
    } else {
        return (a + b).toFixed(2);
    }
};

function subtrack(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
        return a - b; 
    } else {
        return (a - b).toFixed(2);
    } 
};

function multiply(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
        return a * b; 
    } else {
        return (a * b).toFixed(2);
    } 
};

function divide(a, b){
    if (Number.isInteger(a) && Number.isInteger(b)) {
        floatResult = a / b; 
        if(Number.isInteger(floatResult)){
            return floatResult;
        }else{
            return floatResult.toFixed(2);
        }
    } else {
        return (a / b).toFixed(2);
    } 
}

function percentage(a, b){
    if (Number.isInteger(a) && Number.isInteger(b)) {
        floatResult = a % b; 
        if(Number.isInteger(floatResult)){
            return floatResult;
        }else{
            return floatResult.toFixed(2);
        }
    } else {
        return (a % b).toFixed(2);
    } 
}

function operate(o, a, b){
    if(o == '+') return add(a, b);
    if(o == '-') return subtrack(a, b);
    if(o == '×') return multiply(a, b);
    if(o == '÷') return divide(a, b);
    if(o == '%') return percentage(a, b);
}

lightMode.addEventListener('click', function(){
    lightMode.classList.add('active');
    darkMode.classList.remove('active');
    lightMode.style.color = 'white';
    container.style.color = 'black';
    container.style.backgroundColor = 'white';
    screen.style.backgroundColor = 'white';
    screen.style.boxShadow = "inset 1px 1px 2px 1px #888888";
    keyBt.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.boxShadow = 'inset 3px 0 6px lightgrey, inset -3px 0 6px gray';
    });
    numKeys.forEach(button => {
        button.style.color = 'black';
    });
    equal.style.backgroundColor = 'orangered';
})

darkMode.addEventListener('click', function(){
    lightMode.classList.remove('active');
    lightMode.style.color = 'black';
    darkMode.classList.add('active');
    container.style.backgroundColor = 'black';
    modes.style.backgroundColor = 'white';
    container.style.color = 'white';
    screen.style.backgroundColor = '#141414';
    screen.style.boxShadow = "none";
    keyBt.forEach(button => {
        button.style.backgroundColor = '#141414';
        button.style.boxShadow = 'none';
    });
    numKeys.forEach(button => {
        button.style.color = 'white';
    });

})

decimal.addEventListener('click', function(event){
    if (!operand.includes('.') && operFlag == 0) {
        display.innerHTML += ".";
        operand = display.innerHTML;
    }else if(!secOperand.includes('.') && operFlag == 1){
        if(display.innerHTML.split('.').length <= 2){
            display.innerHTML += ".";
            secOperand += '.';
        }
    }else {
        event.preventDefault();
    }
})

equal.addEventListener('click', function(){
    result = operate(operator, Number(operand), Number(secOperand));
    display.innerHTML = String(result);
    operand = display.innerHTML;
    secOperand = "";
    operFlag = 0;
    if(display.innerHTML.length >= 9) display.style.fontSize = "clamp(10px, 3vw, 40px)";
    if(display.innerHTML.length < 9) display.style.fontSize = "clamp(20px, 5vw, 70px)";
})

changeSign.addEventListener('click', function(){
    if(operFlag == 0 && operand.includes('-')){
        display.innerHTML = display.innerHTML.replace('-', '')
        operand = display.innerHTML;
    }else if(operFlag == 0 && !operand.includes('-')){
        display.innerHTML = '-' + display.innerHTML;
        operand = display.innerHTML;
    }else if(operFlag == 1 && secOperand.includes('-')){
        secOperand = secOperand.replace('-', '')
        display.innerHTML = operand + operator + secOperand;
    }else if(operFlag == 1 && !secOperand.includes('-')){
        secOperand = '-' + secOperand;
        display.innerHTML = operand + operator + secOperand;
    }
})

function backspace(){
    backSpace.addEventListener('click',  function(){
        let innerHTML = display.innerHTML;
        innerHTML = innerHTML.slice(0, -1);
        display.innerHTML = innerHTML;
        if(operFlag == 0){
            operand = display.innerHTML;
        }else if(operFlag == 1){
            if(String(secOperand).length == 1){
                secOperand = "";
            }else if(String(secOperand).length == 2){
                secOperand = secOperand.slice(0, -1);
            }else{
                operator = "";
                operFlag = 0;
            }
        }
        if(display.innerHTML.length >= 9) display.style.fontSize = "clamp(10px, 3vw, 40px)";
        if(display.innerHTML.length < 9) display.style.fontSize = "clamp(20px, 5vw, 70px)";
    })
}

backspace();

function clear(){
    clearDis.addEventListener('click', function(){
        display.innerHTML = '';
        operand = display.innerHTML;
        secOperand = display.innerHTML;
        operFlag = 0;
        if(display.innerHTML.length >= 9) display.style.fontSize = "clamp(10px, 3vw, 40px)";
        if(display.innerHTML.length < 9) display.style.fontSize = "clamp(20px, 5vw, 70px)";
    })
}

clear();

function populate(){
    opers.forEach(function(curr){
        curr.addEventListener('click', function(event){

            if (display.innerHTML === 'null' || display.innerHTML === 'undefined' || display.innerHTML === '') {
                if(!operatorCharacters.includes(curr.innerHTML)){
                    display.innerHTML = curr.innerHTML;
                    operand = display.innerHTML;
                }
            }else{
            if(!operatorCharacters.includes(curr.innerHTML)){
                if(String(operand).length < 18 && operFlag == 0){
                    display.innerHTML += curr.innerHTML;
                    operand = display.innerHTML;
                }else if(operFlag == 1){
                    if(String(secOperand).length < 18){
                    display.innerHTML += curr.innerHTML;
                    secOperand += curr.innerHTML;
                    }
                }
            }else if(String(operand).length <= 18){
                if(operFlag == 0){
                    display.innerHTML += curr.innerHTML;
                    operator = curr.innerHTML;
                    operFlag++;
                }
            }
        }

            if(display.innerHTML.length >= 9) display.style.fontSize = "clamp(10px, 3vw, 40px)";
            if(display.innerHTML.length < 9) display.style.fontSize = "clamp(20px, 5vw, 70px)";
        })
    })
}

populate();