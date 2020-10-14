const numbers = document.querySelectorAll(".number");
const clears = document.querySelectorAll(".clear-btn");
const operators = document.querySelectorAll(".operator");
const display = document.getElementById("display");
const decimalbut = document.getElementById("decimal");
let CurrentNumber = 0;
let NewNumber = false;
let PendingOperation = "";
let minus = false;

for (let num1 of numbers) {
    num1.onclick = e => numPress(e.target.textContent);
}

for (let clear of clears) {
    clear.onclick = e => cleaning(e.target.textContent);
};

for (let operator of operators) {
    operator.onclick = e => operatPress(e.target.textContent);
}

decimalbut.onclick = e => decimal(e.target.textContent);

function numPress(num) {
    if (display.value === "-0") {
        display.value = "Error!!!";
        minus = false;
        NewNumber = true;
        return;
    }
    if (minus) {
        if (NewNumber) {
            display.value = "-" + num;
            NewNumber = false;
        } else if (display.value === "0") {
            display.value = "-" + num;
        } else {
            display.value += num;
        }
    } else if (NewNumber) {
        display.value = num;
        NewNumber = false;
    } else {
        if (display.value === "0") {
            display.value = num;
        } else {
            display.value += num;
        }
    }
}

function cleaning(arg) {
    if (arg === "ce") {
        display.value = "0";
        NewNumber = false;
        minus = false;
    } else {
        display.value = "0";
        CurrentNumber = 0;
        NewNumber = false;
        PendingOperation = "";
        minus = false;
    }
}

function operatPress(op) {
    let localOperation = display.value;

    if (minus && op === "-" && CurrentNumber === 0 && display.value === "-") {
        minus = false;
        display.value = "0";
        return
    }
    if ((NewNumber && PendingOperation !== "=" && PendingOperation !== "" && op === "-") || (localOperation === "0" && CurrentNumber === 0 && op === "-") || (localOperation === "Error!!!" && op === "-")) {
        minus = true;
        display.value = op;
        return;
    };

    if (localOperation[localOperation.length - 1] === ".") {
        display.value = "Error!!!";
        NewNumber = true;
        return;
    }
    if (localOperation === "Error!!!") return;
    if (display.value === "-") return;

    if (NewNumber && PendingOperation !== "=" && PendingOperation !== "" && !minus) {
        display.value = CurrentNumber;
    } else {
        if (PendingOperation === "+") {
            CurrentNumber += +localOperation;
        } else if (PendingOperation === "xy" || PendingOperation === "y") {
            CurrentNumber = CurrentNumber ** (+localOperation);
        } else if (PendingOperation === "-") {
            CurrentNumber -= +localOperation;
        } else if (PendingOperation === "/") {
            CurrentNumber /= +localOperation;
        } else if (PendingOperation === "*") {
            CurrentNumber *= +localOperation;
        } else {
            CurrentNumber = +localOperation;
        }
        if (op === "") {
            CurrentNumber = Math.sqrt(CurrentNumber);
        }

        if (/\./.test(CurrentNumber.toString())) {
            CurrentNumber = Math.round(CurrentNumber * 100000000000000) / 100000000000000;
        }

        if (display.value === "Error!!!" || isNaN(CurrentNumber)) {
            display.value = CurrentNumber = "Error!!!"
        }
        display.value = CurrentNumber;
        PendingOperation = op;
        NewNumber = true;
        minus = false;
    }

}

function decimal(point) {
    let localDecimal = display.value;
    if (minus) {
        localDecimal = "-0.";
        NewNumber = false;
        minus = false;
        display.value = localDecimal;
        return;
    }
    if (NewNumber) {
        localDecimal = "0.";
        NewNumber = false;
    } else {
        if (localDecimal.indexOf(".") === -1) {
            localDecimal += '.';
        }
    }
    display.value = localDecimal;
}
