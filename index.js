const displayResult = document.querySelector("#result");
const buttons = document.querySelectorAll(".buttons button[type='button']");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.value;
    const dataAction = button.getAttribute("data-action");

    if (dataAction === "calculate") {
      calculate();
    } else if (dataAction === "clear") {
      clearFunction();
      // displayResult.value = '';
    } else if (dataAction == "C") {
      displayResult.value = "";
    } else if (dataAction === "decimal") {
      if (!displayResult.value.includes(".")) {
        displayResult.value += buttonValue;
      }
    } else if (buttonValue == "CE") {
      clearFunction();
    }else {
      displayResult.value += buttonValue;
    }
  });
});

function clearFunction() {
  let split = displayResult.value.split("");
  let lastElement = split.slice(0, split.length - 1);
  let expression = lastElement.join("");
  displayResult.value = expression;
}

function calculate() {
  try {
    const result = evaluateExpression(displayResult.value);
    displayResult.value = result;
  } catch (error) {
    displayResult.value = "Error";
  }
}

function evaluateExpression(expression) {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  const tokens = expression.split(" ");
  const values = [];
  const operatorsStack = [];

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      values.push(parseFloat(token));
    } else if (operators[token]) {
      while (
        operatorsStack.length > 0) {
        const operator = operatorsStack.pop();
        const b = values.pop();
        const a = values.pop();
        values.push(operators[operator](a, b));
      }
      operatorsStack.push(token);
    } else {
        return false
    }
  });

  while (operatorsStack.length > 0) {
    const operator = operatorsStack.pop();
    const b = values.pop();
    const a = values.pop();
    values.push(operators[operator](a, b));
  }
  localStorage.setItem("calculatedHistory", JSON.stringify(values));
  console.log(values);
  return values[0];
}

const hamburgerButton = document.getElementById("hamburger");
const calculatorContainer = document.querySelector(".container");
const historyPanel = document.getElementById('history-panel')
historyPanel.style.display = 'none'
hamburgerButton.addEventListener("click", () => {
    // alert('button clicked')
  historyPanel.style.display = 'block'
  if(displayResult.value == 0) {
    return
  } else {
      const historyLi = document.createElement("li")
      historyLi.textContent = displayResult.value
      historyPanel.appendChild(historyLi)
  }
});
