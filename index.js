const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// Function to safely evaluate expressions
const evaluateExpression = (expression) => {
  try {
    // Replace '%' and evaluate
    return new Function(`return ${expression.replace("%", "/100")}`)();
  } catch {
    return "Error"; // Handle invalid expressions
  }
};

// Calculator logic
const calculate = (btnValue) => {
  if (btnValue === "=") {
    // Safely evaluate the expression
    output = evaluateExpression(output) || "";
  } else if (btnValue === "AC") {
    // Clear the display
    output = "";
  } else if (btnValue === "DEL") {
    // Remove last character
    output = output.slice(0, -1);
  } else {
    // Prevent starting with special characters
    if (output === "" && specialChars.includes(btnValue)) return;

    // Append the button value to output
    output += btnValue;
  }

  // Display the updated output
  display.value = output || "0";
};

// Attach event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
