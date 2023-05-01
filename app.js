let screen = document.querySelectorAll("#screen div");
let input = document.getElementById("input");
let output = document.getElementById("output");
let more = document.querySelectorAll("#more button");
let numbers = document.querySelectorAll(".numbers button");
let operators = document.querySelectorAll("[data-op]");
let equal = document.querySelector("[data-eq]");
let all = "";
let x = 1;
let a = 0;
function clear() {
    more.forEach(function (el) {
        el.addEventListener("click", function () {
            if (el.dataset.more == "ac") {
                input.innerText = "0";
                output.innerText = "";
                x = 1;
                a = 0;
            }
            if (el.dataset.more == "del") {
                ////////

                ////////
                if (input.innerText.length > 1) {
                    if (input.innerText.slice(-1) == ".") {
                        a--;
                    } else if (
                        input.innerText.slice(-1) == "+" ||
                        input.innerText.slice(-1) == "x" ||
                        input.innerText.slice(-1) == "-" ||
                        input.innerText.slice(-1) == "÷"
                    ) {
                        if (a < x) {
                            a++;
                        }
                    }
                    input.innerText = input.innerText.substring(
                        0,
                        input.innerText.length - 1
                    );
                } else {
                    input.innerText = "0";
                }
            }
        });
    });
}
clear();

function addNum() {
    numbers.forEach(function (num) {
        num.addEventListener("click", function () {
            if (!num.dataset.eq) {
                let matches = input.innerText.match(/\./g);
                //////
                if (input.innerText == "0") {
                    if (num.dataset.num != "0") {
                        input.innerText = num.dataset.num;
                    }
                    if (
                        num.dataset.num == "." &&
                        a < x &&
                        input.innerText.slice(-1) != "+" &&
                        input.innerText.slice(-1) != "x" &&
                        input.innerText.slice(-1) != "÷" &&
                        input.innerText.slice(-1) != "-"
                    ) {
                        input.innerText = "0.";
                        a++;
                    }
                }
                ///////////
                else if (input.innerText != "0") {
                    //////////////////////////////////
                    if (num.dataset.num != ".") {
                        input.innerText += num.dataset.num;
                    }
                    /////////////
                    else if (
                        num.dataset.num == "." &&
                        a < x &&
                        input.innerText.slice(-1) != "+" &&
                        input.innerText.slice(-1) != "x" &&
                        input.innerText.slice(-1) != "÷" &&
                        input.innerText.slice(-1) != "-"
                    ) {
                        input.innerText += num.dataset.num;
                        a++;
                    }
                }
            }
        });
    });
}

addNum();

function op() {
    operators.forEach(function (op) {
        op.addEventListener("click", function () {
            if (
                input.innerText == "0" &&
                !input.innerText.includes(op.innerText)
            ) {
                input.innerText += `${op.innerText}`;
            }
            if (input.innerText != "0") {
                if (
                    input.innerText.slice(-1) != "+" &&
                    input.innerText.slice(-1) != "x" &&
                    input.innerText.slice(-1) != "÷" &&
                    input.innerText.slice(-1) != "-" &&
                    input.innerText.slice(-1) != "."
                ) {
                    input.innerText += `${op.innerText}`;
                    if (x == a) {
                        x++;
                    }
                }
            }
        });
    });
}
op();

function equals() {
    equal.addEventListener("click", function () {
        x = 1;
        a = 0;
        all = input.innerText;
        let newStr = all.replace(/÷/g, "/").replace(/x/g, "*");
        let out = Number(eval(newStr));
        if (Number.isInteger(out)) {
            output.innerText = out;
        } else {
            output.innerText = out.toFixed(3);
        }
        input.innerText = "0";
    });
}
equals();
