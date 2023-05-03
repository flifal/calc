const input = document.getElementById("input");
const output = document.getElementById("output");
const clr = document.querySelector("[data-clear]");
const dlt = document.querySelector("[data-delete]");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const equal = document.querySelector("[data-equal]");
const dot = document.querySelector("[data-dot]");
let all;
let out = false;

function clear() {
    clr.onclick = function () {
        input.innerText = "0";
        output.innerText = "";
    };
}

function dltLastCharacter() {
    dlt.onclick = function (event) {
        if (input.innerText == "0") event.preventDefault();
        else if (input.innerText != "0" && input.innerText.length == 1) {
            input.innerText = "0";
        } else {
            input.innerText = input.innerText.slice(0, -1);
        }
    };
}

function result() {
    equal.onclick = function () {
        all = input.innerText;
        let newOperation = all.replace(/÷/g, "/").replace(/x/g, "*");
        out = Number(eval(newOperation));
        if (out != "Infinity") {
            if (Number.isInteger(out) && input.innerText != 0) {
                output.innerText = out;
                input.innerText = "0";
            } else if (!Number.isInteger(out)) {
                output.innerText = out.toFixed(3);
                input.innerText = "0";
            }
            out = Number(output.innerText);
        }
    };
}

function addNumber() {
    numbers.forEach(function (num) {
        num.onclick = function (numBtn) {
            if (input.innerText == "0") {
                input.innerText = numBtn.target.innerText;
            } else if (input.innerText != "0") {
                input.innerText += numBtn.target.innerText;
            }
        };
    });
}

function floatNumber() {
    dot.onclick = function () {
        const currentNumber = input.innerText;
        const parts = currentNumber.split(/[-+x÷]/);
        const lastPart = parts[parts.length - 1];
        if (
            !lastPart.includes(".") &&
            !input.innerText.slice(-1).match(/[-+x÷]/)
        ) {
            input.innerText += ".";
        }
    };
}

function addOperators() {
    operators.forEach(function (op) {
        op.onclick = function () {
            if (
                input.innerText == "0" &&
                !input.innerText.includes(op.innerText)
            ) {
                if (out) {
                    if (Number.isInteger(out)) {
                        input.innerText = out + op.innerText;
                    } else {
                        input.innerText = out.toFixed(3) + op.innerText;
                    }
                } else {
                    input.innerText += op.innerText;
                }
            }
            if (
                input.innerText != "0" &&
                !input.innerText.slice(-1).match(/[+x÷-]/)
            ) {
                input.innerText += op.innerText;
            } else if (
                input.innerText != "0" &&
                input.innerText.slice(-1).match(/[+x÷-]/)
            ) {
                input.innerText = input.innerText.slice(0, -1) + op.innerText;
            }
        };
    });
}

export {
    addOperators,
    floatNumber,
    addNumber,
    result,
    dltLastCharacter,
    clear,
};
