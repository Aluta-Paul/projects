
function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourRotation = 360 / 12 * (hours + minutes / 60);
  const minuteRotation = 360 / 60 * minutes;
  const secondRotation = 360 / 60 * seconds;

  document.querySelector('.hour-hand').style.transform = `rotate(${hourRotation}deg)`;
  document.querySelector('.minute-hand').style.transform = `rotate(${minuteRotation}deg)`;
  document.querySelector('.second-hand').style.transform = `rotate(${secondRotation}deg)`;
}

setInterval(updateClock, 1000);
