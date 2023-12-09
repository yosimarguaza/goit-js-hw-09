import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      // window.alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);


let countdownInterval;

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = flatpickr('#datetime-picker').selectedDates[0];
  const currentDate = new Date();
  const timeDifference = selectedDate.getTime() - currentDate.getTime();

  updateTimer(timeDifference);

  countdownInterval = setInterval(() => {
    if (timeDifference > 0) {
      timeDifference -= 1000;
      updateTimer(timeDifference);
    } else {
      clearInterval(countdownInterval);
      // alert('Countdown completed!');
    }
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
