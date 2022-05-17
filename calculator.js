/*
Each keypress is somewhere in the sequence of First Number, Operation, Second Number.  
After that sequence, when another operation key or equals key is pressed, 
perform Operation on First Number and Second Number.  The result is Total.
If the key just pressed is an Operation Key, store it in Operation.  Put Total in First Number.
*/

/*
keep a total of all operations
When a Key is pressed...
if it is a # key, add the digit to lastNumber string
if it is an operation key, store it in operation string
if it is a number following 
*/
let operator = "",
    total = 0,
    lastNumber = "",
    lastKey = "";
"digit", "operator", "equals";
const keys = Array.from(document.querySelectorAll("#keys-container .button"));
const display = document.querySelector("#display");
const tempOutput = document.querySelector("#output");

const print = (txt) => {
    txt = txt.toString();
    if (txt === "") txt = "&nbsp;";
    const length = Math.min(txt.length, 10);
    txt = txt.substring(0, length);
    display.innerHTML = txt;
};

for (let key of keys) {
    // console.log('key: ',key);
    //  console.log(key.getAttribute('data-key'));
    key.addEventListener("click", (event) => {
        const key = event.currentTarget.getAttribute("data-key");
        handleKey(key);
    });
}
const performOperation = (num1, oper, num2) => {
    num1 = typeof num1 === "number" ? num1 : Number(num1);
    num2 = typeof num2 === "number" ? num2 : Number(num2);
    console.log(
        "num1: ",
        typeof num1,
        num1,
        "num2: ",
        typeof num2,
        num2,
        "operator: ",
        operator
    );
    let result = 0;
    switch (oper) {
        case "":
            // treat as add
            // to handle eg. 'clear' '3' '=' becomes 0+3=
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        default:
            console.log(`I don't know what to do with operator ${oper}`);
    }
    // reset operator
    operator = lastNumber = "";
    console.log("operation: ", result);
    return result;
};

const handleKey = (key) => {
    if (!isNaN(Number(key))) {
        // Convert number string to number
        key = Number(key);
    }

    console.log("handleKey(" + typeof key + ") ", key);

    if (typeof key === "number" || key === ".") {
        // Number
        if (operator === "") total = 0;
        lastNumber += key.toString();
        print(lastNumber);
    } else if (key !== "=" && key !== "clear") {
        // Operator
        if (operator === "") {
            operator = key;
            total = total === 0 ? lastNumber : total;
            lastNumber = "";
        } else {
            // operate
            if (lastKey === "digit")
                total = performOperation(total, operator, lastNumber);
            lastNumber = "";
            operator = key;
        }
        print(total);
    } else if (key === "=") {
        // =, operate
        total = performOperation(total, operator, lastNumber);
        print(total);
    } else if (key === "clear") {
        total = 0;
        operator = "";
        lastNumber = "";
        print("&nbsp;");
    }

    lastKey =
        typeof key === "number" ? "digit" : key === "=" ? "equals" : "operator";

    tempOutput.innerHTML = `lastKey: ${lastKey}(${key})<br />total: ${total}(${typeof total})<br />operator: ${operator}<br/>lastNumber:  ${lastNumber}`;
};
// console.log("total ", total);
// handleKey(5);
// handleKey(".");
// handleKey(5);
// // handleKey("+");
// // handleKey(5);
// handleKey('*');
// handleKey('-');
// handleKey(3);
// handleKey('=');
// console.log("total: ", total);
