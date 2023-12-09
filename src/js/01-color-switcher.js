function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector("[data-start]");
  const stopButton = document.querySelector("[data-stop]");
  let colorChangeInterval;

  startButton.addEventListener("click", function () {
    startButton.disabled = true; // Desactiva el botón "Start"

    colorChangeInterval = setInterval(function () {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });

  stopButton.addEventListener("click", function () {
    startButton.disabled = false; // Habilita el botón "Start"
    clearInterval(colorChangeInterval);
  });
});
