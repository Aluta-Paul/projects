const numbersContainer = document.querySelector('.numbers');

// Function to create and position clock numbers
function createClockNumbers() {
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement('div');
    number.classList.add('number');
    number.innerText = i;

    const angle = i * 30; // Each number is spaced 30 degrees apart
    const radians = (angle * Math.PI) / 180;

    const x = 50 * Math.sin(radians); // Calculate X position
    const y = -50 * Math.cos(radians); // Calculate Y position

    number.style.left = `calc(50% + ${x}%)`;
    number.style.top = `calc(50% + ${y}%)`;
    number.style.transform = `rotate(${radians}deg)`

    numbersContainer.appendChild(number);
  }
}

// Call the function to create clock numbers
createClockNumbers();
