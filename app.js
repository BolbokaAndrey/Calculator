function calculate(a, b, op) {
    let countFrac = 0
    try {
        countFrac += a.split('.')[1].length;
    } catch (error) {}
    try {
        countFrac += b.split('.')[1].length;
    } catch (error) {}
    
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+':
            return (a + b).toFixed(countFrac);
        case '-':
            return (a - b).toFixed(countFrac);
        case '*':
            return (a * b).toFixed(countFrac);
        case '/':
            return (a / b).toFixed(countFrac);
        default:
            break;
    }
}

function clearWindow() {
    document.querySelector(".main-window__first-operand").innerText = '';
    document.querySelector(".main-window__second-operand").innerText = '';
    document.querySelector(".main-window__operator").innerText = '';
    document.querySelector(".main-window__first-operand").classList.add("active");
    document.querySelector(".main-window__second-operand").classList.remove("active");
    document.querySelector(".main-window__operator").classList.remove("full");
    document.querySelector(".main-window__result").innerText = '';
}

document.querySelector(".control-panel").addEventListener('click', (event) => {
    if (event.target.classList.contains("backspace")) {
        let activeLine = document.querySelector(".active");
        let curText = activeLine.innerText;
        activeLine.innerText = `${curText.slice(0, -1)}`;
    } 
    else if (event.target.classList.contains("control-panel__number")) {
        if (document.querySelector(".main-window__result").innerText !== '')
            clearWindow();
        let activeLine = document.querySelector(".active");
        let curText = activeLine.innerText;
        if (event.target.classList.contains("dot") && curText === '')
                activeLine.innerText = '0.';
        else activeLine.innerText = `${curText}${event.target.innerText}`;
    } 
    else if (event.target.classList.contains("equal")) {
        let first = document.querySelector(".main-window__first-operand").innerText;
        let second = document.querySelector(".main-window__second-operand").innerText;
        let operator = document.querySelector(".main-window__operator").innerText;
        first = first.replace(/\.$/, '');
        second = second.replace(/\.$/, '');
        document.querySelector(".main-window__first-operand").innerText = first;
        document.querySelector(".main-window__second-operand").innerText = second;
        let res = calculate(first, second, operator);
        document.querySelector(".main-window__result").innerText = res;
    } 
    else if (event.target.classList.contains("control-panel__operator")) {
        document.querySelector(".main-window__first-operand").classList.remove("active");
        document.querySelector(".main-window__second-operand").classList.add("active");
        document.querySelector(".main-window__operator").classList.add("full");
        document.querySelector(".main-window__operator").innerText = event.target.innerText;
    } 
    else if (event.target.classList.contains("control-panel__special_move")) {
        document.querySelector(".main-window__first-operand").classList.toggle("active");
        document.querySelector(".main-window__second-operand").classList.toggle("active");
    } 
    else if (event.target.classList.contains("control-panel__special_sign")) {
        let activeLine = document.querySelector(".active");
        let curText = activeLine.innerText;
        if (curText[0] === '-') 
            activeLine.innerText = `${curText.slice(1, curText.length)}`;
        else activeLine.innerText = `-${curText}`;
    } 
    else if (event.target.classList.contains("control-panel__special_clear")) {
        document.querySelector(".active").innerText = '';
    } 
    else if (event.target.classList.contains("control-panel__special_clear-all")) {
        clearWindow();
    } 
})