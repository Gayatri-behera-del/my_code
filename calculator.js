// Get a reference to the calculator display input field
const display = document.getElementById('display');

// Function to append the clicked value (number or operator) to the display
function appendToDisplay(input) {
    display.value += input;
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
}

// Function to calculate the result
function calculate() {
    try {
        // The eval() function evaluates a string as a mathematical expression.
        // NOTE: While convenient for simple calculators, eval() can be dangerous
        // in more complex applications as it runs any code provided in the string.
        // For a simple project like this, it is acceptable.
        display.value = eval(display.value);
    } catch (error) {
        // Handle errors like dividing by zero or invalid input
        display.value = 'Error';
    }
}