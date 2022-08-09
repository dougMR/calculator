
/*
Each keypress is somewhere in the sequence of First Number, Operation, Second Number.  
After that sequence, when another operation key or equals key is pressed, 
perform Operation on First Number and Second Number.  
*/

/*
keep a total of all operations
When a Key is pressed...
if it is a # key, add the digit to lastNumber string
if it is an operation key, store it in operation string
and move lastNumber to total.
*/
let operator = "",
    total = 0,
    lastNumber = "",
    lastKey = "";
"digit", "operator", "equals", "clear";
const keys = Array.from(document.querySelectorAll("#keys-container .button"));
const display = document.querySelector("#display");
// const tempOutput = document.querySelector("#output");

const print = (txt) => {
    txt = txt.toString();
    if (txt === "") txt = "&nbsp;";
    const length = Math.min(txt.length, 10);
    txt = txt.substring(0, length);
    display.innerHTML = txt;
};

for (let key of keys) {
    key.addEventListener("click", (event) => {
        const key = event.currentTarget.getAttribute("data-key");
        handleKey(key);
    });
}

const performOperation = (num1, oper, num2) => {
    num1 = typeof num1 === "number" ? num1 : Number(num1);
    num2 = typeof num2 === "number" ? num2 : Number(num2);
    /*console.log(
        "num1: ",
        typeof num1,
        num1,
        "num2: ",
        typeof num2,
        num2,
        "operator: ",
        operator
    );*/
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
    // console.log(`${num1} ${oper} ${num2} = ${result}`);
    return result;
};

/*
    I had a hard time commenting handleKey() to explain just what it's doing.  I don't have a good bird's eye view of how the function works, which made me wonder if the function could be more streamlined.  There are a lot of conditionals, each resulting in specific steps.  It feels like a very reactionary function rather than well-planned.
*/
const handleKey = (key) => {

    if ( !isNaN(Number(key)) || key === ".") {
        // Digit or .
        
        if (operator === "") total = 0;
        lastNumber += key.toString();
        print(lastNumber);
    } else if (key !== "=" && key !== "clear") {
        // Operator (+-*/)
        if (operator === "") {
            /*
            no operator currently stored
            so this is an operation following 
            the last number in anticipation of another number.
            */
            total = total === 0 ? lastNumber : total;
            lastNumber = "";
        } else {
            // there is an operator currently stored
            if (lastKey === "digit")
            // only operate if a digit was selected last
                total = performOperation(total, operator, lastNumber);
        }
        // change operation
        operator = key;
        print(total);
    } else if (key === "=") {
        // =
        total = performOperation(total, operator, lastNumber);
        print(total);
    } else if (key === "clear") {
        total = 0;
        operator = "";
        lastNumber = "";
        print("&nbsp;");
    }

    lastKey =
    !isNaN(Number(key)) || key === "." ? "digit" : key === "=" ? "equals" : key === "clear" ? "clear" : "operator";

    // tempOutput.innerHTML = `lastKey: ${lastKey}(${key})<br />total: ${total}(${typeof total})<br />operator: ${operator}<br/>lastNumber:  ${lastNumber}`;

};

// choose "theme"
const themeToggle = document.getElementById('dark-light-toggle');
themeToggle.addEventListener('click', (event) => {
    // toggle light/dark theme
    const keysContainer = document.getElementById('keys-container');
    keysContainer.classList.toggle('dark');
    themeToggle.innerHTML = keysContainer.classList.contains('dark') ? 'make light' : 'make dark';
});