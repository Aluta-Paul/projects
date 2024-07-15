// Select the HTML element with class 'display' and store it in the constant variable 'display'
const display = document.querySelector('.display');

// Select all HTML button elements and store them in the constant variable 'buttons'
const buttons = document.querySelectorAll('button');

// Define an array of special characters
const specialChars = ["%", "*", "/", "-", "+", "="];

// Initialize an empty string variable 'output'
let output = "";

// Define a function named 'calculate' that takes a button value as an argument
//is a ARROW FUNCTION ...
const calculate = (btnValue) => {
  // Check if the button value is "=" and the output is not empty
  if (btnValue === "=" && output !== "") {
    // If the output contains "%", replace it with '/100' before evaluating using the eval() function
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    // If the button value is "AC", reset the output to an empty string
    output = "";
  } else if (btnValue === "DEL") {
    // If the button value is "DEL", remove the last character from the output string
    output = output.toString().slice(0, -1);
  } else {
    // If the output is empty and the button value is a special character, return
    if (output === "" && specialChars.includes(btnValue)) return;

    // Append the button value to the output string
    output += btnValue;
  }

  // Update the value of the 'display' element with the current output string
  display.value = output;
};

// Add an event listener to each button element
buttons.forEach((button) => {
  // Add a click event listener to the button, calling the 'calculate' function with the dataset value as an argument
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
/* . When a button is clicked, the specified function is executed.

>>>button.addEventListener("click", ...): This part sets up an event listener for the "click" event on the current button in the iteration.

>>>(e) => calculate(e.target.dataset.value): This is the callback function that is executed when the button is clicked. It takes an event (e) as a parameter.

>>>- e.target: This refers to the HTML element that triggered the event, in this case, the clicked button.

>>>-e.target.dataset.value: The dataset property allows you to access custom data attributes of an HTML element. In this case, it retrieves the value of the data-value attribute from the clicked button. This value corresponds to the button value (e.g., "1", "+", "AC").

calculate(e.target.dataset.value): This calls the calculate function and passes the button value as an argument. The calculate function then processes this value to update the output and display. */
