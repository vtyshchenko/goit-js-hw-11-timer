class CountdownTimer {
  constructor({ updateData, targetDate }) {
    this.targetDate = targetDate.getTime();
    this.updateData = updateData;
    this.countDown();
  }

  start() {
    setInterval(this.countDown.bind(this), 1000);
  }

  countDown() {
    const MSEC = 1000 * 60;
    const HOUR = MSEC * 60;
    const DAY = HOUR * 24;

    const deltaTime = this.targetDate - Date.now();
    const days = this.padInt(Math.floor(deltaTime / DAY));
    const hours = this.padInt(Math.floor((deltaTime % DAY) / HOUR));
    const mins = this.padInt(Math.floor((deltaTime % HOUR) / MSEC));
    const secs = this.padInt(Math.floor((deltaTime % MSEC) / 1000));
    this.updateData({ days, hours, mins, secs });
  }

  padInt(value) {
    return String(value).padStart(2, "0");
  }
}

const timerRef = document.querySelector("#timer-1");
const daysRef = timerRef.querySelector('[data-value="days"');
const hoursRef = timerRef.querySelector('[data-value="hours"');
const minsRef = timerRef.querySelector('[data-value="mins"');
const secsRef = timerRef.querySelector('[data-value="secs"');

timerRef.style.display = "flex";
timerRef.style.flexWrap = "wrap";
timerRef.style.justifyContent = "space-evenly";
timerRef.style.fontSize = "30px";

const timer = new CountdownTimer({
  updateData: updateData,
  targetDate: new Date("Dec 20, 2021"),
});

timer.start();

function updateData({ days, hours, mins, secs }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minsRef.textContent = mins;
  secsRef.textContent = secs;
}
